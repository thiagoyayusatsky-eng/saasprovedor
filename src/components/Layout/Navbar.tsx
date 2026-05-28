import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Settings, Bell, Menu } from 'lucide-react';
import { useState } from 'react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white border-b border-secondary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl text-secondary-900 hidden sm:inline">RefSaaS</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button className="relative p-2 hover:bg-secondary-50 rounded-lg transition">
              <Bell className="h-5 w-5 text-secondary-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 hover:bg-secondary-50 rounded-lg transition">
              <Settings className="h-5 w-5 text-secondary-600" />
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-6 border-l border-secondary-200">
              <div>
                <p className="text-sm font-medium text-secondary-900">{user?.full_name}</p>
                <p className="text-xs text-secondary-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 rounded-lg transition"
                title="Sair"
              >
                <LogOut className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary-50 rounded-lg"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Menu className="h-5 w-5 text-secondary-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {openMenu && (
          <div className="md:hidden pb-4 space-y-2">
            <button className="w-full text-left px-4 py-2 hover:bg-secondary-50 rounded-lg transition flex items-center gap-2">
              <Bell className="h-5 w-5 text-secondary-600" />
              <span className="text-secondary-700">Notificações</span>
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-secondary-50 rounded-lg transition flex items-center gap-2">
              <Settings className="h-5 w-5 text-secondary-600" />
              <span className="text-secondary-700">Configurações</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="text-red-600">Sair</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};