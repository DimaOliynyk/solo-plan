"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useUser } from '../../../hooks/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import 'swiper/css';
import Footer from "@/components/Footer";

export default function SchedulePage() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [activeDay, setActiveDay] = useState(new Date().getDate());

  const { data, isLoading } = useUser();

  const monthTimeline = useMemo(() => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
      return {
        number: i + 1,
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullLabel: date.toLocaleDateString('en-US', { weekday: 'long' }),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      };
    });
  }, []);

  const calculateTop = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const hourHeight = 80; 
    return (hours * hourHeight) + (minutes * (hourHeight / 60));
  };

  if (isLoading) return <div className="h-screen bg-[#F8FAFC]" />;

  const user = (data as any)?.user;
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const activeDateInfo = monthTimeline.find(d => d.number === activeDay);

  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex flex-col overflow-hidden font-sans">
      
      {/* --- HEADER (Matching Home Style) --- */}
      <header className="px-6 pt-10 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Schedule</h1>
            <p className="text-sm font-bold text-slate-400">
              {activeDateInfo?.month} {activeDay}, 2026
            </p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-blue-100 p-0.5">
             <img src="/user-avatar.png" className="w-full h-full rounded-full object-cover" alt="profile" />
          </div>
        </div>

        {/* --- ACTIVITIES / DATE PICKER --- */}
        <div className="mb-6">
          <h3 className="text-lg font-black text-slate-800 mb-4">Activities</h3>
          <Swiper spaceBetween={12} slidesPerView={5.2} initialSlide={activeDay - 1}>
            {monthTimeline.map((date) => (
              <SwiperSlide key={date.number}>
                <button
                  onClick={() => setActiveDay(date.number)}
                  className={`w-full py-4 rounded-2xl flex flex-col items-center transition-all ${
                    activeDay === date.number 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                    : "bg-white text-slate-400"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase mb-1">{date.label}</span>
                  <span className="text-lg font-black">{date.number}</span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      {/* --- DAILY TASK VIEW (Matching Home Style) --- */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-slate-800">Daily task View</h3>
        </div>

        {/* Card Container inspired by Home Page */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-6 relative min-h-full">
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="flex h-[80px] border-t border-slate-50/50">
                <div className="w-12 -mt-2 text-[10px] font-bold text-slate-300">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
                <div className="flex-1 border-l border-slate-50/50 ml-2" />
              </div>
            ))}

            {/* TASK CARDS */}
            <div className="absolute inset-0 ml-14">
              {user?.tasks
                ?.filter((t: any) => !t.isCompleted && new Date(t.date).getDate() === activeDay)
                .map((task: any) => (
                  <div 
                    key={task.id}
                    style={{ 
                      top: `${calculateTop(task.time)}px`, 
                      height: `${Math.max(task.duration * (80/60), 60)}px` 
                    }}
                    className="absolute left-2 right-2 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-start gap-3 transition-transform active:scale-95"
                  >
                    <div className="w-1 h-full bg-blue-600 rounded-full shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-[13px] font-black text-slate-800 leading-tight">{task.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">{task.time} • {task.duration}M</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full opacity-20" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Spacer to clear the fixed footer */}
          <div className="h-40 w-full" />
        </div>
      </main>

      {/* --- FOOTER --- */}
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