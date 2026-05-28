import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth Service
export const authService = {
  async register(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });
    if (error) throw error;
    return data;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  }
};

// Referral Service
export const referralService = {
  async getReferrals(userId: string) {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createReferral(referrerId: string, referredEmail: string, referredName: string) {
    const { data, error } = await supabase
      .from('referrals')
      .insert([
        {
          referrer_id: referrerId,
          referred_email: referredEmail,
          referred_name: referredName,
          status: 'pending',
          commission_rate: 15,
          total_earnings: 0,
        }
      ])
      .select();
    if (error) throw error;
    return data;
  },

  async updateReferralStatus(referralId: string, status: string) {
    const { data, error } = await supabase
      .from('referrals')
      .update({ status, updated_at: new Date() })
      .eq('id', referralId)
      .select();
    if (error) throw error;
    return data;
  },

  async getReferralStats(userId: string) {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId);
    
    if (error) throw error;

    return {
      total_referrals: data.length,
      active_referrals: data.filter((r: any) => r.status === 'active').length,
      pending_referrals: data.filter((r: any) => r.status === 'pending').length,
      total_earnings: data.reduce((sum: number, r: any) => sum + r.total_earnings, 0),
      average_commission: data.length > 0 ? 15 : 0,
    };
  }
};