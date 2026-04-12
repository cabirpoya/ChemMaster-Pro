import React from 'react';
import { Beaker, FlaskConical, Atom, TestTube, Settings, User, Search, Bell, Mail } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-16 h-screen bg-[#1a1c2c] flex flex-col items-center py-6 gap-8 fixed left-0 top-0 z-50">
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
        <Atom className="text-white w-6 h-6" />
      </div>
      
      <div className="flex flex-col gap-6 mt-4">
        <div className="sidebar-icon bg-blue-600/20 text-blue-400">
          <Beaker className="w-5 h-5" />
        </div>
        <div className="sidebar-icon bg-pink-600/20 text-pink-400">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div className="sidebar-icon bg-blue-400/20 text-blue-300">
          <TestTube className="w-5 h-5" />
        </div>
        <div className="sidebar-icon bg-purple-600/20 text-purple-400">
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
