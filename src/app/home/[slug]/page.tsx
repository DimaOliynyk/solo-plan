"use client"; 

import Image from "next/image";
import Link from 'next/link'

import { useState, useEffect } from "react";

export default function Home() {
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  function getThisWeekDates(): Date[] {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday, 1 = Monday, ...
  
  // Shift to Monday (change +6 % 7 if your week starts on Monday)
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((day + 6) % 7));

  // Generate array of 7 dates
  const weekDates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }

  return weekDates;
}



  useEffect(() => {
    setWeekDates(getThisWeekDates());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row ml-[20px] pt-[40px] justify-between">
        <div className="">
          <h2 className="font-medium text-[22px] font-medium">Morning, Aria Malik 👋</h2>
          <p className="font-light text-[15px]">0 tasks are waiting for you today</p>
        </div>
        <Image src="/user-pr-pc-default.png" width={50} height={50} className="w-[50px] h-[50px] mr-[20px]"alt="user-profile-picture"/>
      </header>

      <main className="ml-[20px] mt-[28px] mr-[20px]">
        <div>
          <h3 className="font-medium text-[22px]">Activities</h3>


          <div className="flex flex-row justify-between">
            {weekDates.map((date, idx) => (
              <div key={idx} className="mt-[12px] w-[65px] h-[80px] bg-[#2879E4] text-white rounded-lg text-center">
                <p className="pt-[12px] font-extralight uppercase">{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
                <p className="text-[24px]">{date.getDate()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[28px]">
          <h3 className="font-medium text-[22px]">Category</h3>
          
          <div className="flex flex-row justify-between mt-[20px]">
            <div className="w-[160px] h-[140px] bg-white rounded-md ml-[15px] flex flex-row justify-between">
              <div className="ml-[15px]">
                <p className="text-[19px] w-[80px]">Personal To-do</p>
                <p className="text-[12px] text-black opacity-60 mb-[30px]">12 Tasks remaining</p>

                {/* <a href="#" className="text-[#2879E4]">Go to Tasks</a> */}
              </div>
              <Image src="/coffeecup.png" width={28} height={28} className="mr-[10px] w-[28px] h-[28px]" alt=""/>
            </div>

            <div className="w-[160px] h-[140px] bg-white rounded-md mr-[15px] flex flex-row justify-between ml-[10px]" >
              <div className="ml-[15px]">
                <p className="text-[19px] w-[70px]">Work To-do</p>
                <p className="text-[12px] text-black opacity-60 mb-[30px]">0 Tasks remaining</p>

                {/* <a href="#" className="text-[#2879E4]">Go to Tasks</a> */}
              </div>
              <Image src="/suitcase.png" width={28} height={28} className="mr-[10px] w-[28px] h-[28px]" alt=""/>
            </div>
          </div>
        </div>

        <div className="mt-[25px]">
          <div className="flex flex-row justify-between">
            <h3 className="font-medium text-[22px]">Daily task View</h3>
            {/* <a href="#" className="text-[#2879E4] mt-[6px]">See all</a> */}
          </div>

          <Link href="/newtaskcreate/user" className="block w-[210px] h-[55px] bg-[#0076FF] mt-[40px] rounded-[50px] m-auto text-center pt-[15px] text-white font-medium">Add New Task</Link>
        </div>
      </main>

      <footer className="w-[100%] fixed bottom-0 left-0 w-full pb-[25px] flex flex-row justify-between mt-auto">
        {/* <a href="/home/userid" className="mt-[20px]">
          <Image width={24} height={25} src="/homepage-active-icon.png" className="ml-[35px]" alt=""/>
        </a>
        <a href={`/schedule/userid`} className=" mt-[20px]">
           <Image width={24} height={25} src="/calendar.png" className="" alt=""/>
        </a> */}

        <button className="w-[60px] h-[60px] rounded-[50%] bg-[#2879E4] text-[35px] text-white">+</button>

        {/* <a href="#" className="mt-[20px]">
           <Image width={24} height={25} src="/profile.png" className="" alt=""/>
        </a>
        <a href="#" className="mr-[35px] mt-[20px]">
           <Image width={24} height={25} src="/messages.png" className="" alt=""/>
        </a> */}
      </footer>
    </div>
  );
}
