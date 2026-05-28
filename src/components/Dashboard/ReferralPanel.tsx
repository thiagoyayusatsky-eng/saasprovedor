import React, { useState } from 'react';
import { Users, DollarSign, TrendingUp, Share2, Loader2 } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ReferralsList } from './ReferralsList';
import { ReferralStats, Referral } from '../../types';
import { referralService } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export const ReferralPanel: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReferral, setNewReferral] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [statsData, referralsData] = await Promise.all([
        referralService.getReferralStats(user.id),
        referralService.getReferrals(user.id),
      ]);
      setStats(statsData);
      setReferrals(referralsData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newReferral.name || !newReferral.email) {
      setError('Preencha todos os campos');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await referralService.createReferral(
        user.id,
        newReferral.email,
        newReferral.name
      );

      if (result) {
        setSuccess('Indicação criada com sucesso!');
        setNewReferral({ name: '', email: '' });
        await loadData();
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar indicação');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Painel de Indicações</h1>
          <p className="text-secondary-600 mt-2">Gerencie suas indicações e ganhe comissões</p>
        </div>
        <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Compartilhar
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total de Indicações"
            value={stats.total_referrals}
            icon={Users}
            trend={12}
            color="blue"
          />
          <StatsCard
            title="Indicações Ativas"
            value={stats.active_referrals}
            icon={TrendingUp}
            trend={8}
            color="green"
          />
          <StatsCard
            title="Pendentes"
            value={stats.pending_referrals}
            icon={Users}
            color="orange"
          />
          <StatsCard
            title="Ganhos Totais"
            value={`R$ ${stats.total_earnings.toFixed(2)}`}
            icon={DollarSign}
            trend={25}
            color="purple"
          />
        </div>
      )}

      {/* New Referral Form */}
      <div className="bg-white rounded-2xl shadow-card p-6 border border-secondary-100">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Nova Indicação</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleAddReferral} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={newReferral.name}
                onChange={(e) => setNewReferral({ ...newReferral, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-secondary-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                placeholder="João Silva"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={newReferral.email}
                onChange={(e) => setNewReferral({ ...newReferral, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-secondary-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                placeholder="joao@email.com"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Adicionando...
              </>
            ) : (
              <>
                <Share2 className="h-5 w-5" />
                Indicar Pessoa
              </>
            )}
          </button>
        </form>
      </div>

      {/* Referrals List */}
      <div>
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Minhas Indicações</h2>
        <ReferralsList referrals={referrals} loading={loading} />
      </div>
    </div>
  );
};