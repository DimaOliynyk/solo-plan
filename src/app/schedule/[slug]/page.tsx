"use client"

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, act } from "react";

import { useUser } from '../../../hooks/useUser';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

interface DayDetail {
  dayNumber: number;
  dayName: string;
  fullDate: Date;
}


export default function Schedule(){
    const [active, setActive] = useState(new Date().getDate());
    const [activetasks, setActivetasks] = useState(Number);
    const [activetasksPersonal, setActivetasksPersonal] = useState(0)
    const [activetasksWork, setActivetasksWork] = useState(0)


  const queryClient = useQueryClient()

  function getMonthDayDetails() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      // Get total days in current month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Formatter for the day name
      const dayNameFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

      const monthDetails: DayDetail[] = [];

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        
        monthDetails.push({
          dayNumber: i,
          dayName: dayNameFormatter.format(date),
          fullDate: date
        });
      }

      return monthDetails;
  }

    async function deleteTask(id: string){
      const response = await fetch(`https://solo-plan-server-production.up.railway.app/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      })

      if(response.ok){
        const data = await response.json();
        
        // setUser(user => ({
        //   ...(user ?? {}),
        //   tasks: user.tasks.filter(task => task.id !== id),
        // }));
        if(data.task.type === "personal"){
          setActivetasksPersonal(activetasksPersonal - 1)
        } 
        else if(data.task.type === "work"){
          setActivetasksWork(activetasksWork - 1)
        } 
      }

  }

    async function makeTaskUnComplete(id: string){
      const response = await fetch(`https://solo-plan-server-production.up.railway.app/api/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      })

      if(response.ok){
        const data = await response.json();
        
        // setUser(user => ({
        //   ...(user ?? {}),
        //   tasks: user.tasks.filter(task => task.id !== id),
        // }));

      }

  }

    function formatTimeNumber(time: number): string {
        const str = time.toString().padStart(4, '0'); // ensure it's 4 digits
        const hours = str.slice(0, 2);
        const minutes = str.slice(2);
        return `${hours}:${minutes}`;
    }


  function getWeekdayFromDateNumber(dayNumber: number, month = new Date().getMonth(), year = new Date().getFullYear()): string {
    const date = new Date(year, month, dayNumber);
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
  }

  const completeTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `https://solo-plan-server-production.up.railway.app/api/tasks/${id}/complete`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to complete task');

      const data = await response.json();
      return data; // ✅ return parsed JSON once
    },
    onSuccess: () => {
      // ✅ Invalidate the user query to refetch tasks
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const { data, isLoading, isError, error } = useUser();

  if (isLoading) return <div>Loading user...</div>;

  if (isError) {
    localStorage.removeItem("token"); // runs immediately
    return <div>Error: {error?.message}</div>;
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const weekDates = getMonthDayDetails()

  const calculateTop = (timeString) => {
    // Разделяем строку "10:00" на часы и минуты
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const hourHeight = 64; // Высота одного часа h-16
    const minuteHeight = 64 / 60;
    
    // Считаем отступ от самого верха
    return (hours * hourHeight) + (minutes * minuteHeight);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (data as any)?.user;

        return(
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow ml-[20px] mt-[38px] mr-[20px]">
                      <div className="flex flex-row justify-between">
                        <Swiper
                          spaceBetween={5}
                          slidesPerView={5}
                          onSlideChange={() => console.log('slide change')}
                          onSwiper={(swiper) => console.log()}
                        >
                            {weekDates.map((date, idx) => (
                              <SwiperSlide key={idx} className="mr-[0px]">
                              <button 
                                      onClick={() => setActive(date.dayNumber)}
                                      type="button"
                                      className={`mt-[12px] w-[65px] h-[70px] bg-[#2879E4] rounded-lg text-center transition-colors 
                                          ${active === date.dayNumber ? "bg-[#2879E4] text-white" : "bg-gray-100 text-black"}`}
                                      >
                                      <p className="pt-[5px] font-light uppercase">{date.dayName.slice(0,3)}</p>
                                      <p className="pt-[0] text-[24px]">{date.dayNumber}</p>
                              </button>

                            </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>

                      <div className="flex flex-col rounded-xl mt-[20px]">
                        {/* Заголовок с датой из твоего макета */}
                      <div className="mb-6">
                        <h2 className="text-[22px] font-medium">Day</h2>
                        <p className="text-gray-500">Sunday, {active}</p>
                      </div>

                      <div className="relative">
                        <div>
                          {hours.map((hour) => (
                            <div key={hour} className="flex h-16 group border-t border-gray-100">
                              <div className="w-16 text-right pr-4 text-xs text-gray-400 pt-[-6px]">
                                {`${hour.toString().padStart(2, '0')}:00`}
                              </div>
                              <div className="flex-1 relative group-hover:bg-gray-50/50 transition-colors" />
                            </div>
                          ))}
                        </div>

                        <div className="absolute inset-0 ml-16 pointer-events-none">
                          {/* Контейнер-обертка, чтобы задачи позиционировались относительно всего списка часов */}
                          <div className="relative h-full">
                            {user.tasks
                              .filter(e => !e.isCompleted && Number(new Date(e.date).getDate()) === active)
                              .map((e) => (
                                <div 
                                  key={e.id}
                                  style={{ 
                                    top: `${calculateTop(e.time)}px`, 
                                    height: `${e.duration * (64/60)}px` 
                                  }}
                                  className="absolute left-2 right-4 bg-white border-l-4 border-blue-500 shadow-sm p-2 pointer-events-auto rounded-md flex flex-col"
                                >
                                  <div className="flex flex-row w-[240px] justify-between left-2 right-4">
                                    <p className="text-xs font-bold truncate">{e.name}</p>

                                    <img src="/icons8-done.svg" className="w-[15px] h-[15px] mt-[0]" onClick={() => completeTaskMutation.mutate(e.id)}/>
                                  </div>
                                  <p className={`mt-2 ${e.duration >= 80 ? "flex" : "hidden"} text-xs font-leight truncate`}>{e.details}</p>
                                </div>
                              ))
                            }
                          </div>
                        </div>

                        {/* Индикатор текущего времени (для примера) */}
                        {/* top должен рассчитываться динамически в зависимости от времени */}
                        <div 
                          className="absolute left-16 right-0 border-t-2 border-blue-500 z-10 flex items-center"
                          style={{ top: `${calculateTop(new Date().toLocaleTimeString('en-GB', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            hour12: false 
                          }))}px` }} // Пример статического позиционирования
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full -ml-1" />
                        </div>
                      </div>
                    </div>
                </main>
                <footer className="w-[390px] h-[70px] bg-white rounded-t-xl justify-between fixed bottom-0 flex flex-row m-auto pt-[15px] pb-[10px]">
                    <Link href="/home/user" className="ml-[20px]">
                        <img src="/house.png" className="w-[30px] h-[30px]"/>
                        <div className="w-[5px] h-[5px] rounded-[50%] bg-black ml-[12px] mt-[10px]"></div>
                    </Link>
                    <Link href="/schedule/user" className="">
                        <img src="/calendar.png" className="w-[30px] h-[30px]"/>
                    </Link>
                    <Link href="#" className="">
                        <img src="/chat.png" className="w-[30px] h-[30px]"/>
                    </Link>
                    <Link href="/profile/user" className="mr-[20px]">
                        <img src="/user.png" className="w-[30px] h-[30px]"/>
                    </Link>
                </footer>
            </div>
        )
    }
