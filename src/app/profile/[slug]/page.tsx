"use client"

import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useUser } from '../../../hooks/useUser';
import { 
  Bell, 
  Palette, 
  Database, 
  LogOut, 
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query'
import Footer from '@/components/Footer';

export default function Profile() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, isError, error } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (isError) {
    localStorage.removeItem("token");
    return <div className="p-10 text-red-500">Error: {error?.message}</div>;
  }

  const user = (data as any)?.user;
  const tasksCount = user?.tasks?.length || 0;

  const settingsOptions = [
    { id: 'notifications', title: 'Notifications', icon: <Bell size={20} className="text-blue-500" /> },
    { id: 'appearance', title: 'Appearance', icon: <Palette size={20} className="text-purple-500" /> },
    { id: 'storage', title: 'Storage & Data', icon: <Database size={20} className="text-amber-500" /> }
  ];

  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex flex-col overflow-hidden font-sans">
      
      {/* --- HEADER --- */}
      <header className="px-6 pt-12 pb-6 shrink-0">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img 
              src="/user-avatar.png" 
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" 
              alt="profile" 
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Morning, {user?.username} 👋</h2>
            <button className="text-sm font-bold text-blue-600 mt-1">Edit your information</button>
          </div>
        </div>
      </header>

      {/* --- SCROLLABLE CONTENT --- */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-8">
        
        {/* Activity Section */}
        <section>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Activity</p>
          <Link href="/statistics">
            <div className="w-full p-5 bg-white rounded-[2rem] shadow-sm border border-slate-50 flex items-center group active:scale-[0.98] transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <BarChart3 size={22} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-black text-slate-800">Statistic</h3>
                <p className="text-xs font-bold text-slate-400">{tasksCount} tasks completed</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-slate-300" />
            </div>
          </Link>
        </section>

        {/* Settings Section */}
        <section>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Settings</p>
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-50 overflow-hidden">
            {settingsOptions.map((option, index) => (
              <div 
                key={option.id}
                className={`flex items-center px-6 py-5 cursor-pointer active:bg-slate-50 transition-colors ${
                  index !== settingsOptions.length - 1 ? 'border-b border-slate-50' : ''
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl">
                  {option.icon}
                </div>
                <span className="ml-4 text-[15px] font-bold text-slate-700">{option.title}</span>
                <ChevronRight size={18} className="ml-auto text-slate-200" />
              </div>
            ))}
          </div>
        </section>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full py-5 flex items-center justify-center text-red-500 font-black bg-white rounded-[2rem] border border-red-50 shadow-sm active:bg-red-50 transition-all"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>

        {/* Spacer for Floating Footer */}
        <div className="h-32 w-full" />
      </main>

      {/* --- FIXED FLOATING FOOTER --- */}
      <Footer />
    </div>
  );
}

function NavIcon({ href, icon, active }: any) {
  return (
    <Link href={href} className={`p-4 transition-all ${active ? 'opacity-100 scale-110' : 'opacity-30'}`}>
      <img src={icon} className="w-6 h-6 invert" alt="" />
    </Link>
  );
}