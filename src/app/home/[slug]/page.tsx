"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useUser } from '../../../hooks/useUser';
import Footer from "@/components/Footer";

export default function Home() {
  const pathname = usePathname();
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const { data, isLoading } = useUser();

  const monthTimeline = useMemo(() => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => ({
      number: i + 1,
      label: new Date(today.getFullYear(), today.getMonth(), i + 1).toLocaleDateString('en-US', { weekday: 'short' }),
    }));
  }, []);

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-white font-black text-slate-300 uppercase tracking-widest text-xs">Syncing...</div>;

  const user = (data as any)?.user;
  const tasks = user?.tasks || [];
  const activeTasks = tasks.filter((t: any) => new Date(t.date).getDate() === activeDay && !t.isCompleted);

  return (
    // Global h-screen + overflow-hidden locks the entire page
    <div className="h-screen w-full bg-[#F8FAFC] flex justify-center overflow-hidden font-sans">
      
      <div className="w-full max-w-6xl flex flex-col h-full relative">
        
        {/* --- HEADER --- */}
        <header className="px-6 md:px-10 pt-8 pb-4 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Morning, {user.username} 👋
            </h2>
            <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              {activeTasks.length} TASKS ARE WAITING FOR YOU!
            </p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-blue-100 shadow-sm overflow-hidden p-0.5">
             <img src='/user-avatar.png' alt="Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
        </header>

        {/* --- MAIN LAYOUT (Locked) --- */}
        <main className="flex-1 overflow-hidden px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-5 flex flex-col gap-8 shrink-0">
            
            {/* ONLY SCROLLABLE PART: TIMELINE */}
            <section className="relative">
              <h3 className="text-lg font-black text-slate-800 mb-4 tracking-tight">Activities</h3>
              <div className="cursor-grab active:cursor-grabbing">
                <Swiper 
                  spaceBetween={10} 
                  slidesPerView={4.2}
                  breakpoints={{ 768: { slidesPerView: 5.2 } }}
                  // Ensures the swiper doesn't bleed out of layout
                  className="w-full"
                >
                  {monthTimeline.map((date) => (
                    <SwiperSlide key={date.number}>
                      <button
                        onClick={() => setActiveDay(date.number)}
                        className={`w-full py-4 rounded-2xl flex flex-col items-center transition-all border-2 ${
                          activeDay === date.number 
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
                          : "bg-white border-slate-50 text-slate-400"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase mb-1">{date.label}</span>
                        <span className="text-xl font-black">{date.number}</span>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* CATEGORIES (Static) */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Category</h3>
              <div className="grid grid-cols-2 gap-4">
                <CategoryCard title="Personal" count={tasks.filter((t:any)=>t.type==='personal').length} icon="/coffeecup.png" color="blue" />
                <CategoryCard title="Work" count={tasks.filter((t:any)=>t.type==='work').length} icon="/suitcase.png" color="rose" />
              </div>
            </section>
          </div>

          {/* RIGHT SIDE (Task View - Now Non-Scrollable) */}
          <div className="lg:col-span-7 flex flex-col h-[75%] lg:h-[80%] bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 relative overflow-hidden">
            <h3 className="text-lg font-black text-slate-800 mb-6 tracking-tight">Daily task View</h3>
            
            {/* Tasks are now in a fixed block. If they exceed height, they hide (overflow-hidden) */}
            <div className="flex-1 overflow-hidden space-y-4 pr-1">
              {activeTasks.slice(0, 4).map((task: any) => ( // Sliced to fit without scrolling
                <div key={task.id} className="bg-slate-50/50 p-5 rounded-3xl flex items-center justify-between border border-transparent">
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-10 rounded-full ${task.type === 'personal' ? 'bg-blue-500' : 'bg-rose-500'}`} />
                    <div>
                        <h4 className="font-bold text-slate-800 text-base">{task.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.time} • {task.duration}m</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center opacity-40">
                    <img src="/icons8-done.svg" className="w-5 h-5" alt="done" />
                  </div>
                </div>
              ))}
              {activeTasks.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 border-2 border-dashed border-slate-200 rounded-[2rem]">
                    <p className="text-xs font-black uppercase tracking-[0.4em]">No Tasks</p>
                </div>
              )}
            </div>

          </div>
        </main>

        {/* --- FOOTER --- */}
      <Footer />
      </div>
    </div>
  );
}

// Helpers
function CategoryCard({ title, count, icon, color }: any) {
  const colors: any = { blue: "bg-blue-50 text-blue-600", rose: "bg-rose-50 text-rose-600" };
  return (
    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex flex-col gap-3">
       <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-slate-800 leading-tight">{title}</h4>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">{count} Tasks</p>
          </div>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${colors[color]}`}>
             <img src={icon} className="w-4 h-4 opacity-80" alt="" />
          </div>
       </div>
    </div>
  );
}

function NavIcon({ href, icon, active }: any) {
  return (
    <Link href={href} className={`p-4 transition-all ${active ? 'opacity-100 scale-110' : 'opacity-40'}`}>
      <img src={icon} className="w-7 h-7 invert" alt="" />
    </Link>
  );
}