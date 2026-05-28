export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_email: string;
  referred_name: string;
  status: 'pending' | 'active' | 'inactive';
  commission_rate: number;
  total_earnings: number;
  created_at: string;
  updated_at: string;
}

export interface ReferralStats {
  total_referrals: number;
  active_referrals: number;
  pending_referrals: number;
  total_earnings: number;
  average_commission: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
}