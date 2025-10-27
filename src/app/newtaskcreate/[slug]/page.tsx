"use client"; 

import Link from 'next/link';

import { useState } from "react";
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Newtaskcreate(){
    const [active, setActive] = useState("");
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [projectname, setProjectname] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter()
    
    async function handleNewTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(222)
        const formData = new FormData(event.currentTarget)
        const name = (formData.get('name') ?? '') as string;
        const details = (formData.get('details') ?? '') as string;
        const type = active;
        const projectname = (formData.get('projectname') ?? '') as string;

        const dateValue = formData.get("date") as string | null;
        const date = dateValue ? Number(dateValue.replaceAll("-", "").slice(6, 8)) : 0; 

        const timeValue = formData.get("time") as string | null;
        const time = timeValue ? timeValue.replace(":", "") : "";

        const durationValue = formData.get("duration") as string | null;
        const duration = durationValue ? Number(durationValue) : 0;

          if (
            typeof name !== "string" ||
            typeof details !== "string" ||
            typeof projectname !== "string" ||
            typeof date !== "number" ||
            typeof time !== "number" ||
            typeof duration !== "number"
        ) {
            alert("Form contains invalid values! Please check all fields.");
            return; 
        }

        console.log(time)
        try {
            const response = await fetch('https://solo-plan-server-9hl58r2nj-dmytros-projects-32c8df75.vercel.app/api/tasks/', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
              body: JSON.stringify({ name, details, type, projectname, date, time, duration }),
            })
        
            if (response.ok) {
              const data = await response.json();
    
              router.push(`/home/${data.author.username}`)
            } else if(response.status === 402){
              alert("You can't add task to previous date!")
            } else {
                alert("Something went wrong while adding the task.");
            }   
        } catch (error) {
            console.error("Error submitting task:", error);
            alert("Network error. Please try again later.");
        }
    } 

    
    
    return(
        <>  
            <div className="mt-[30px] flex flex-row justify-between w-[100%]">
                <Link href="/home/user">back</Link>
                <h3 className="m-auto text-center font-medium text-[22px]">Add task</h3>
            </div>

            <form className="flex flex-col m-auto w-[340px]" onSubmit={handleNewTask}>
                <input type="text" onChange={(e) => setName(e.target.value)} name="name" placeholder="Task Name" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[28px] pl-[10px] rounded-xl border-gray-400"/>
                <textarea onChange={(e) => setDetails(e.target.value)} name="details" placeholder="Task Details (Optional)" className="focus:outline-none w-[340px] h-[70px] border-1 active:border-gray-400 m-auto mt-[15px] pt-[10px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[20px] text-[18px] font-medium">Task Type</p>
                <div className="flex justify-between">
                    <button
                        onClick={() => setActive("personal")}
                        type="button"
                        className={`w-[160px] h-[40px] mt-[15px] px-4 py-2 rounded-3xl font-medium transition-colors duration-200 
                            ${active === "personal" ? "bg-[#2879E4] text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                        Personal    
                    </button>
                    <button
                        onClick={() => setActive("work")}
                        type="button"
                        className={`w-[160px] h-[40px] mt-[15px] px-4 py-2 rounded-3xl font-medium transition-colors duration-200 
                            ${active === "work" ? "bg-[#2879E4] text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                        Work    
                    </button>
                    {/* <button
                        onClick={() => setActive("break")}
                        type="button"
                        className={`w-[100px] h-[40px] mt-[15px] px-4 py-2 rounded-3xl font-medium transition-colors duration-200 
                            ${active === "break" ? "bg-[#2879E4] text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                        Break    
                    </button> */}
                </div>

                <input type="text" onChange={(e) => setProjectname(e.target.value)} name="projectname" placeholder="Project Name" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[20px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[15px] text-[18px] font-medium">Date</p>
                <input type="date" min={new Date().getDate()} onChange={(e) => setDate(e.target.value)} name="date" placeholder="5 April, 2025" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[15px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[15px] text-[18px] font-medium">Time</p>
                <input type="time" onChange={(e) => setTime(e.target.value)} name="time" placeholder="5 April, 2025" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[15px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[15px] text-[18px] font-medium">Duration</p>
                <input type="text" onChange={(e) => setDuration(e.target.value)} name="duration" placeholder="30 (Minutes)" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[15px] pl-[10px] rounded-xl border-gray-400"/>
                
                <button className="focus:outline-none w-[340px] h-[50px] m-auto mb-[30px] mt-[40px] pl-[10px] rounded-xl border-gray-400 bg-[#2879E4] text-white">
                    {loading ? "Adding this Task..." : "Add Task"}
                </button>
            </form>
        </>
    )
}