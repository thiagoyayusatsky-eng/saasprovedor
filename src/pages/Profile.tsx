import React from 'react';
import { Navbar } from '../components/Layout/Navbar';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-secondary-900 mb-8">Perfil</h1>

          <div className="bg-white rounded-2xl shadow-card p-8 border border-secondary-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">{user?.full_name}</h2>
                <p className="text-secondary-600">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-secondary-600 text-sm font-medium mb-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <p className="text-secondary-900">{user?.email}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-secondary-600 text-sm font-medium mb-2">
                  <User className="h-4 w-4" />
                  Nome Completo
                </label>
                <p className="text-secondary-900">{user?.full_name}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-secondary-600 text-sm font-medium mb-2">
                  <Calendar className="h-4 w-4" />
                  Membro desde
                </label>
                <p className="text-secondary-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}
                </p>
              </div>
            </div>

            <button className="mt-8 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-2.5 rounded-xl hover:shadow-lg transition">
              Editar Perfil
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};