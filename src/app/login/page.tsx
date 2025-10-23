"use client"

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { redirect,  RedirectType} from "next/navigation";

export default function Login() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
 
    const response = await fetch('http://192.168.1.136:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); 
      router.push(`/home/${username}`)
    } else {
      // Handle errors
    }
  }
  if(localStorage.getItem('token') !== null){
    redirect(`/home/user`)
  } else{
    return (
      <div className="mt-[20px] bg-gray-50 flex flex-col items-center justify-center">
          <header className="justify-items-center">
              <img src="./main-logo.png" alt="main logo" className='m-auto mb-[40px]'/>
              <div className="mt-[0]">
                <h2 className="text-center text-[22px] text-black font-medium">Hello Welcome back!</h2>
                <p className="text-center text-[gray] text-[16px]">Sign in to continue</p>
              </div>
          </header>
  
          <main className="justify-items-center mt-[50px] h-[100%] bg-white rounded-xl">
            <form className="w-[330px] flex flex-col w-4\5 p-6" onSubmit={handleSubmit}>
              <p className="mb-[10px]">Username</p>
              <input type="name" name="username" placeholder="username" className="mb-[20px] w-[100%] h-[40px] rounded-xl border-1 border-gray-300 border-gray-50 p-2" required/>
              <p className="mb-[10px]">Password</p>
              <input type="password" name="password" placeholder="password" className="mb-[20px] w-[100%] h-[40px] rounded-xl border-1 border-gray-300 border-gray-50 p-2" required/>
  
              <button className="h-[48px] bg-[#2879E4] w-[100%] text-white mx-auto rounded-4xl mt-[30px]">Login</button>
            </form>
          </main>
  
          <footer className="m-auto bottom-4 w-full">
            <div className='mb-[30px]'>
              <p className='text-center mt-[30px] text-[18px] font-medium'>Or Login with</p>
              <div className='flex flex-row mt-[20px]'>
                <div className='w-[80px] h-[60px] border-1 m-auto mr-[10px] border-gray-300 rounded-xl'>
                  <img src="./google-icon-logo-svgrepo-com.svg"  className='w-[30px] m-auto mt-[13px]'/>
                </div>
                <div className='w-[80px] h-[60px] border-1 m-auto ml-[10px] border-gray-300 rounded-xl'>
                  <img src="./icons8-facebook-48.png"  className='w-[40px] m-auto mt-[8px]'/>
                </div>
              </div>
            </div>
  
            <p className="text-sm text-center mb-[20px]">Dont have account? <a href="#">Sign Up</a></p>
          </footer>
      </div>
    );
  }
}
