"use client"

import Link from 'next/link';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


import { useUser } from '../../../hooks/useUser';


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

    const user = data?.user;

    const tasksCount = user.tasks.length;

    if(Object.keys(user).length !== 0){
        return(
            <>
                <header className="flex flex-row w-[370px] pt-[40px] pb-[40px] ml-[20px] justify-between">
                    <div className='flex flex-row'>
                        <img src={'https://scontent-ham3-1.cdninstagram.com/v/t51.82787-19/681313361_18355499287238847_5328308778329421688_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=104&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=4sYmR3KhSt4Q7kNvwF4RAYr&_nc_oc=AdrJITA83MEbGGqsu-24wepoahl6mSFhQyu0RlNm41yHaJj__uR8iOa9xWHHwYDJ6LmFeqo0hzmafU67VI1DMBu8&_nc_zt=24&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_gid=wmTxLkCCSgpjhNt13uDE_g&_nc_ss=7b689&oh=00_Af0j5Hb3aLjweZNFRWpMiuFJ5gPR7Rk7L02eRVkuRN2c0Q&oe=69F98563'} 
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
    
                <main className="mb-[30px]">
                    <Link href="/statistics">
                        <div className="w-[360px] h-[70px] bg-gray-100 rounded-xl m-auto flex flex-row">
                            <img src="/bar-chart.png" className="w-[35px] h-[37px] ml-[20px] mt-[17px]"/>
                            <div className="flex flex-col mt-[13px] ml-[10px] text-[#2879E4]">
                                <p className="pt-15px text-[17px] font-medium">Task Statistic Report</p>
                                <p className="text-[14px] font-light">{tasksCount} Tasks</p>
                            </div>
                            <img src="/chevron.png"  className="w-[25px] h-[25px] opacity-50 ml-[92px] mt-[22px]"/>
                        </div> 
                    </Link>
    
                    <p className="mt-[25px] ml-[15px] font-light">General</p>
    
                    <div className="w-[360px] h-[70px] rounded-xl justify-between m-auto mt-[20px] mb-[25px] flex flex-row">
                        <img src="/bar-chart.png" className="w-[35px] h-[37px] ml-[20px] mt-[17px]"/>
                        <div className="flex flex-col mt-[23px] ml-[15px] text-black font-light ">
                            <p className="pt-15px text-[17px] w-[150px] ">NotificationsTODO</p>
                        </div>
                        <img src="/chevron.png"  className="w-[25px] h-[25px] opacity-50 ml-[100px] mr-[20px] mt-[22px]"/>
                    </div>
                    <div className="w-[360px] h-[70px] rounded-xl justify-between m-auto mb-[25px] flex flex-row">
                        <img src="/bar-chart.png" className="w-[35px] h-[37px] ml-[20px] mt-[17px]"/>
                        <div className="flex flex-col mt-[23px] ml-[15px] text-black font-light ">
                            <p className="pt-15px text-[17px] w-[150px]">Storage & Data</p>
                        </div>
                        <img src="/chevron.png"  className="w-[25px] h-[25px] opacity-50 ml-[100px] mr-[20px] mt-[22px]"/>
                    </div>
    
                    <button onClick={handleLogout}className="w-[360px] h-[70px] bg-[#2879E4] rounded-xl ml-[15px] flex flex-row">
                        <img src="/logout.png" className="w-[30px] h-[30px] m-auto mr-[10px]" />
                        <p className="m-auto ml-[0px] text-[20px] text-white font-medium">Logout</p>
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