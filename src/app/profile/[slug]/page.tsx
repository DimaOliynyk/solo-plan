"use client"

import Link from 'next/link';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


import { useUser } from '../../../hooks/useUser';

import { 
  Bell, 
  Palette, 
  User, 
  ShieldCheck, 
  Database, 
  LogOut, 
  ChevronRight,
  BarChart3
} from 'lucide-react';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed m-auto flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2.5 right-2.5 cursor-pointer text-lg font-bold"
        >
          X
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
}


export default function Profile(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(String);
    const [modalType, setModalType] = useState(String);

    const queryClient = useQueryClient()
    const router = useRouter();
    
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        router.push("/login");             
    };

    const handleClick = (type) => {
        console.log(type)
        setModalContent("You clicked the text! This content can change.");
        setIsModalOpen(true);
        setModalType(type)
        console.log(222)
    };

    const { data, isLoading, isError, error } = useUser();

    if (isLoading) return <div>Loading user...</div>;
    if (isError) {
        localStorage.removeItem("token"); // runs immediately
        return <div>Error: {error?.message}</div>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (data as any)?.user;

    const tasksCount = user.tasks.length;

    const settingsOptions = [
        {
            id: 'notifications',
            title: 'Notifications',
            icon: <Bell size={20} className="text-blue-500" />,
            link: '#',
        },
        {
            id: 'appearance',
            title: 'Appearance',
            icon: <Palette size={20} className="text-purple-500" />,
            link: '#',
        },
        {
            id: 'storage',
            title: 'Storage & Data',
            icon: <Database size={20} className="text-amber-500" />,
            link: '#',
        }
    ];

    if(Object.keys(user).length !== 0){
        return(
            <>
                <header className="flex flex-row w-[370px] pt-[40px] pb-[40px] ml-[20px] justify-between">
                    <div className='flex flex-row'>
                        <img src="/user-avatar.png"
                        className="w-[60px] h-[60px] mr-[20px] mt-[5px] rounded-4xl"alt="user-profile-picture"/>
                        <div className="flex flex-col ml-[5px]">
                            <h2 className="font-medium text-[17px] font-medium mt-[5px]">Morning, {user.username} 👋</h2>
                            <p className='font-light text-[15px] mt-[5px]'><span className='text-[#2879E4]'>Edit</span> your information</p>
                            <p onClick={() => {handleClick('work')}}></p>
                        </div>
                    </div>
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            content={modalContent}
                        />
                </header>
    
                <main className="px-[20px] pt-[10px] pb-[100px] flex flex-col gap-[20px]">
  
  {/* Статистика */}
  <section>
    <p className="text-[11px] font-bold text-gray-400 mb-[10px] ml-[5px] uppercase tracking-[1px]">Activity</p>
    <Link href="/statistics">
      <div className="w-full p-[16px] bg-white rounded-3xl shadow-sm flex items-center border border-gray-50 active:scale-[0.98] transition-all">
        <div className="w-[40px] h-[40px] bg-blue-50 rounded-2xl flex items-center justify-center">
          <BarChart3 size={20} className="text-[#2879E4]" />
        </div>
        <div className="ml-[15px]">
          <h3 className="text-[15px] font-bold text-gray-800">Statistic</h3>
          <p className="text-[12px] text-gray-400">{tasksCount} tasks completed</p>
        </div>
        <ChevronRight size={18} className="ml-auto text-gray-300" />
      </div>
    </Link>
  </section>

  {/* Настройки */}
  <section>
    <p className="text-[11px] font-bold text-gray-400 mb-[10px] ml-[5px] uppercase tracking-[1px]">Settings</p>
    <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
      {settingsOptions.map((option, index) => (
        <div 
          key={option.id}
          className={`flex items-center px-[20px] py-[16px] cursor-pointer active:bg-gray-50 transition-colors ${
            index !== settingsOptions.length - 1 ? 'border-b border-gray-50' : ''
          }`}
        >
          <div className="w-[32px] h-[32px] flex items-center justify-center">
            {option.icon}
          </div>
          <span className="ml-[12px] text-[15px] font-semibold text-gray-700">{option.title}</span>
          <ChevronRight size={16} className="ml-auto text-gray-300" />
        </div>
      ))}
    </div>
  </section>

  {/* Logout */}
  <button 
    onClick={handleLogout}
    className="w-full py-[18px] flex items-center justify-center text-red-500 font-bold bg-white rounded-3xl border border-red-50 shadow-sm active:bg-red-50 transition-all"
  >
    <LogOut size={20} className="mr-2" />
    Logout
  </button>
</main>
    
                <footer className="w-[390px] h-[70px] bg-white rounded-t-xl justify-between flex flex-row fixed bottom-0 m-auto pt-[15px] pb-[10px]">
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
            </>
    
        )
    }
}