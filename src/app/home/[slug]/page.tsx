"use client"; 

import Image from "next/image";
import Link from 'next/link'

import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(Object); 
  const [active, setActive] = useState(new Date().getDate());
  const [activetasks, setActivetasks] = useState(Number);
  const [activetasksPersonal, setActivetasksPersonal] = useState(0)
  const [activetasksWork, setActivetasksWork] = useState(0)
  const [activetaskstoday, setActivetaskstoday] = useState(Number);
  async function getUser(){
      const response = await fetch('https://solo-plan-server-9hl58r2nj-dmytros-projects-32c8df75.vercel.app/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      })

      if(response.ok){
        const data = await response.json();
          
        let actP = 0
        let actW = 0
        data.user.tasks.map((e) => {
          console.log(222)
          if(e.type === "personal"){
            actP = actP + 1
          } 

          else if(e.type === "work"){
            actW = actW + 1
          } 
        })
        setActivetasksWork(actW)
        setActivetasksPersonal(actP)
        setUser(data.user)
        console.log(data)
      }
  }

  useEffect(() => {
    getUser()
  }, []);


  const [weekDates, setWeekDates] = useState<Date[]>([]);

  function getThisWeekDates(): Date[] {
    const today = new Date();
    setActivetasks(today.getDate())
    console.log(today.getDate())
    console.log(activetasks)
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

  async function deleteTask(id: string){
      const response = await fetch(`https://solo-plan-server-9hl58r2nj-dmytros-projects-32c8df75.vercel.app/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      })

      if(response.ok){
        const data = await response.json();
        
        setUser(user => ({
          ...(user ?? {}),
          tasks: user.tasks.filter(task => task.id !== id),
        }));
        if(data.task.type === "personal"){
          setActivetasksPersonal(activetasksPersonal - 1)
        } 
        else if(data.task.type === "work"){
          setActivetasksWork(activetasksWork - 1)
        } 
      }

  }


  useEffect(() => {
    setWeekDates(getThisWeekDates());
  }, []);



  function formatTimeNumber(time: number): string {
    const str = time.toString().padStart(4, '0'); // ensure it's 4 digits
    const hours = str.slice(0, 2);
    const minutes = str.slice(2);
    return `${hours}:${minutes}`;
  }

  if(user){
    return (
      <div className=" flex flex-col">
        <header className="flex flex-row ml-[20px] pt-[40px] justify-between">
          <div className="">
            <h2 className="font-medium text-[22px] font-medium">Morning, {user.username} 👋</h2>
            <p className="font-light text-[15px]"><span className="text-red-700">{activetasksPersonal + activetasksWork} tasks </span> are waiting for you!</p>
          </div>
          <Link href="/profile/user">
            <Image src="/user-pr-pc-default.png" width={50} height={50} className="w-[50px] h-[50px] mr-[20px]"alt="user-profile-picture"/>
          </Link>
        </header>
  
        <main className="ml-[20px] mb-[20px] mt-[28px] mr-[20px]">
          <div>
            <h3 className="font-medium text-[22px]">Activities</h3>
  
  
            <div className="flex flex-row justify-between">
              {weekDates.map((date, idx) => (
                <button
                        key={idx}
                        onClick={() => setActive(date.getDate())}
                        type="button"
                        className={`mt-[12px] w-[65px] h-[70px] bg-[#2879E4] rounded-lg text-center transition-colors 
                            ${active === date.getDate() ? "bg-[#2879E4] text-white" : "bg-gray-100 text-black"}`}
                        >
                        <p className="pt-[5px] font-light uppercase">{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
                        <p className="pt-[0] text-[24px]">{date.getDate()}</p>
                </button>

              ))}
            </div>
          </div>
  
          <div className="mt-[28px]">
            <h3 className="font-medium text-[22px]">Category</h3>
            
            <div className="flex flex-row justify-between mt-[20px]">
              <div className="w-[175px] h-[110px] bg-white rounded-md ml-[0] flex flex-row justify-between">
                <div className="ml-[15px] mt-[15px]">
                  <p className="text-[19px] w-[80px]">Personal To-do</p>
                  <p className="text-[12px] text-black opacity-60 mb-[30px]">{activetasksPersonal} Tasks remaining</p>
  
                  {/* <a href="#" className="text-[#2879E4]">Go to Tasks</a> */}
                </div>
                <Image src="/coffeecup.png" width={28} height={28} className="mr-[10px] w-[28px] h-[28px] mt-[15px]" alt=""/>
              </div>
  
              <div className="w-[175px] h-[110px] bg-white rounded-md mr-[0] flex flex-row justify-between ml-[10px]" >
                <div className="ml-[15px] mt-[15px]">
                  <p className="text-[19px] w-[70px]">Work To-do</p>
                  <p className="text-[12px] text-black opacity-60 mb-[30px]">{activetasksWork} Tasks remaining</p>
  
                  {/* <a href="#" className="text-[#2879E4]">Go to Tasks</a> */}
                </div>
                <Image src="/suitcase.png" width={28} height={28} className="mr-[10px] w-[28px] h-[28px] mt-[15px]" alt=""/>
              </div>
            </div>
          </div>
  
          <div className="mt-[25px]">
            <div className="flex flex-col justify-between">
              <h3 className="font-medium text-[22px]">Daily task View</h3>

              <div className="m-auto flex flex-col mt-[25px]">
                {user.tasks.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()).map((e) => {
                  const date = String(e.date)[0] + String(e.date)[1]
                  if(Number(date) === active){
                    return(
                      <div key={e.id} className="w-[360px] h-[140px] bg-white rounded-md mb-[20px] pt-[10px] flex flex-row">
                        <div className={`w-[4px] h-[50px] rounded-r-2xl ${e.type === "personal" ? "bg-[#2879E4]" : "bg-red-700"}`}>

                        </div>
                        <div className="pl-[20px] w-[100%]">

                          <div className="flex flex-row justify-between">
                            <p className="text-xl font-semibold capitalize mb-[0px]">{e.name}</p>
                            <button onClick={() => deleteTask(e.id)} className="mr-[20px]">x</button>
                          </div>
                          <p className="text-gray-500 mt-[5px]">{e.type} To-do</p>
    
                          <div className="flex flex-row mt-[10px]">
                            <div>
                              <p>Start Time</p>
                              <p className="text-gray-500">{formatTimeNumber(e.time)}</p>
                            </div>
                            <div className="ml-[40px]">
                              <p>Duration</p>
                              <p className="text-gray-500">{e.duration} Minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
              {/* <a href="#" className="text-[#2879E4] mt-[6px]">See all</a> */}
            </div>
  
            <Link href="/newtaskcreate/user" className="block w-[210px] h-[55px] bg-[#0076FF] mt-[20px] rounded-[50px] m-auto text-center pt-[15px] text-white font-medium mb-[50px]">Add New Task</Link>
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
    );
  }
}
