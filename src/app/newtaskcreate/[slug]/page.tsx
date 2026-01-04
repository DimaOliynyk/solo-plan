"use client";

import Link from 'next/link';

import { useState } from "react";
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Task {
  id?: number;          // optional for new tasks
  name: string;
  details?: string;
  type: string;         // e.g., active tab or category
  projectname?: string;
  date?: string;
  time?: string;
  duration?: string;
  completed?: boolean;
}
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    const queryClient = useQueryClient();
    
    const addTaskMutation = useMutation({
      mutationFn: async (newTask: Task) => {
        const response = await fetch("http://192.168.0.90:3001/api/tasks/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) throw new Error("Failed to add task");

        return response.json() as Promise<Task>;
      },

      onMutate: async (newTask: Task) => {
        await queryClient.cancelQueries({ queryKey: ["user"] });

        const previousData = queryClient.getQueryData<{ user: { tasks: Task[] } }>(["user"]);

        queryClient.setQueryData<{ user: { tasks: Task[] } }>(["user"], (old) => ({
          ...old,
          user: {
            ...old!.user,
            tasks: [...(old?.user?.tasks || []), { ...newTask, id: Date.now() }],
          },
        }));

        return { previousData };
      },

      onError: (_err: unknown, _newTask: Task, context: { previousData?: { user: { tasks: Task[] } } } | undefined) => {
        if (context?.previousData) {
          queryClient.setQueryData(["user"], context.previousData);
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });


    const handleNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const newTask : Task = {
            name,
            details,
            type: active,
            projectname,
            date,
            time,
            duration,
        };

        try {
            await addTaskMutation.mutateAsync(newTask);
            router.push("/home/user"); // go back immediately
        } catch (error) {
            console.error(error);
            alert("Error adding task!");
        } finally {
            setLoading(false);
        }
    };

    console.log(date)
    
    
    return(
        <>  
            <div className="mt-[30px] flex flex-row w-[100%] pl-[20px] pr-[70px]">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mt-[5px]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Back</span>
                </button>
                <h3 className="text-center m-auto font-medium text-[22px]">Add task</h3>
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