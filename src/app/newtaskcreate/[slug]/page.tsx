"use client"; 

import { useState } from "react";

export default function newtaskcreate(){
    const [active, setActive] = useState("");
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [projectname, setProjectname] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");
    const [loading, setLoading] = useState(false);

    return(
        <>  
            <div className="mt-[30px] flex flex-row justify-between w-[100%]">
                <h3 className="m-auto text-center font-medium text-[22px]">Add task</h3>
            </div>

            <form className="flex flex-col m-auto w-[340px]">
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Task Name" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[28px] pl-[10px] rounded-xl border-gray-400"/>
                <input type="text" onChange={(e) => setDetails(e.target.value)} placeholder="Task Details (Optional)" className="focus:outline-none w-[340px] h-[70px] border-1 active:border-gray-400 m-auto mt-[15px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[20px] text-[18px] font-medium">Task Type</p>
                <div className="flex justify-between">
                    <button
                        onClick={() => setActive("personal")}
                        type="button"
                        className={`w-[100px] h-[40px] mt-[15px] px-4 py-2 rounded-3xl font-medium transition-colors duration-200 
                            ${active === "personal" ? "bg-[#2879E4] text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                        Personal    
                    </button>
                    <button
                        onClick={() => setActive("work")}
                        type="button"
                        className={`w-[100px] h-[40px] mt-[15px] px-4 py-2 rounded-3xl font-medium transition-colors duration-200 
                            ${active === "work" ? "bg-[#2879E4] text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                        Work    
                    </button>
                    <button
                        onClick={() => setActive("break")}
                        type="button"
                        className={`w-[100px] h-[40px] mt-[15px] px-4 py-2 rounded-3xl font-medium transition-colors duration-200 
                            ${active === "break" ? "bg-[#2879E4] text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                        Break    
                    </button>
                </div>

                <input type="text" onChange={(e) => setProjectname(e.target.value)} placeholder="Project Name" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[20px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[15px] text-[18px] font-medium">Date</p>
                <input type="text" onChange={(e) => setDate(e.target.value)} placeholder="5 April, 2025" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[15px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[15px] text-[18px] font-medium">Time</p>
                <input type="text" onChange={(e) => setTime(e.target.value)} placeholder="5 April, 2025" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[15px] pl-[10px] rounded-xl border-gray-400"/>

                <p className="mt-[15px] text-[18px] font-medium">Duration</p>
                <input type="text" onChange={(e) => setDuration(e.target.value)} placeholder="5 April, 2025" className="focus:outline-none w-[340px] h-[40px] border-1 active:border-gray-400 m-auto mt-[15px] pl-[10px] rounded-xl border-gray-400"/>
                
                <button type="button" className="focus:outline-none w-[340px] h-[50px] m-auto mb-[30px] mt-[40px] pl-[10px] rounded-xl border-gray-400 bg-[#2879E4] text-white">
                    {loading ? "Adding this Task..." : "Add Task"}
                </button>
            </form>
        </>
    )
}