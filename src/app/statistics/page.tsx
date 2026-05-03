"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

interface DayDetail {
  dayNumber: number;
  dayName: string;
  fullDate: Date;
}

export default function Statisticreport() {
  const [active, setActive] = useState(new Date().getDate());

  function getMonthDayDetails(): DayDetail[] {
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

  const days = getMonthDayDetails()

  return (
    <>
      <div className="m-auto">
        {days.map((date, idx) => (
          <button
            key={idx}
            onClick={() => setActive(date.dayNumber)}
            type="button"
            className={`mt-[12px] w-[65px] h-[70px] bg-[#2879E4] rounded-lg text-center transition-colors m-[10px] 
                        ${active === date.dayNumber ? "bg-[#2879E4] text-white" : "bg-gray-100 text-black"}`}
            >
              <p className="pt-[5px] font-light uppercase">{date.dayName.slice(0, 3)}</p>
              <p className="pt-[0] text-[24px]">{date.dayNumber}</p>
          </button>
        ))}
      </div>
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
    </>
    
  );
}
