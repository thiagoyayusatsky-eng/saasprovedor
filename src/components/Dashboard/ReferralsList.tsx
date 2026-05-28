import React from 'react';
import { Referral } from '../../types';
import { CheckCircle2, Clock, XCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ReferralsListProps {
  referrals: Referral[];
  loading?: boolean;
}

export const ReferralsList: React.FC<ReferralsListProps> = ({ referrals, loading }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'inactive':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Ativo', color: 'bg-green-50 text-green-700' };
      case 'pending':
        return { label: 'Pendente', color: 'bg-orange-50 text-orange-700' };
      case 'inactive':
        return { label: 'Inativo', color: 'bg-red-50 text-red-700' };
      default:
        return { label: 'Desconhecido', color: 'bg-secondary-50 text-secondary-700' };
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-secondary-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!referrals || referrals.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-card text-center">
        <div className="w-16 h-16 bg-secondary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <ExternalLink className="h-8 w-8 text-secondary-400" />
        </div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">Nenhuma indicação ainda</h3>
        <p className="text-secondary-600">Comece a indicar pessoas para ganhar comissões!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-secondary-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Nome</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-900">Comissão</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-900">Ganhos</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {referrals.map((referral) => {
              const statusLabel = getStatusLabel(referral.status);
              return (
                <tr key={referral.id} className="hover:bg-secondary-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-secondary-900">{referral.referred_name}</p>
                    <p className="text-sm text-secondary-500">{new Date(referral.created_at).toLocaleDateString('pt-BR')}</p>
                  </td>
                  <td className="px-6 py-4 text-secondary-600">{referral.referred_email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(referral.status)}
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusLabel.color}`}>
                        {statusLabel.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-secondary-900">{referral.commission_rate}%</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-green-600">R$ {referral.total_earnings.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCopy(referral.id, referral.id)}
                      className="p-2 hover:bg-primary-50 rounded-lg transition text-primary-600"
                      title="Copiar ID"
                    >
                      {copiedId === referral.id ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};