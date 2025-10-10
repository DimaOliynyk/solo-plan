import Image from "next/image";
import Link from "next/link";

export default function Schedule(){
    return(
        <>
            <main className="ml-[20px] mt-[28px] mr-[20px]">
                <div>
                    <h3 className="font-medium text-[22px]">Activities</h3>

                    <div className="flex flex-row justify-between">
                        <div className="mt-[12px] w-[65px] h-[80px] bg-[#2879E4] text-white rounded-lg text-center">
                        <p className="pt-[12px] font-extralight uppercase">Mon</p>
                        <p className="text-[24px]">4</p>
                        </div>
                        <div className="mt-[12px] w-[65px] h-[80px] bg-gray-300 text-white rounded-lg text-center">
                        <p className="pt-[12px] font-extralight uppercase text-black opacity-50">Tue</p>
                        <p className="text-[24px] text-black">5</p>
                        </div>
                        <div className="mt-[12px] w-[65px] h-[80px] bg-gray-300 text-white rounded-lg text-center">
                        <p className="pt-[12px] font-extralight uppercase text-black opacity-50">Wed</p>
                        <p className="text-[24px] text-black">6</p>
                        </div>
                        <div className="mt-[12px] w-[65px] h-[80px] bg-gray-300 text-white rounded-lg text-center">
                        <p className="pt-[12px] font-extralight uppercase text-black opacity-50">Thu</p>
                        <p className="text-[24px] text-black">7</p>
                        </div>
                        <div className="mt-[12px] w-[65px] h-[80px] bg-gray-300 text-white rounded-lg text-center">
                        <p className="pt-[12px] font-extralight uppercase text-black opacity-50">Fri</p>
                        <p className="text-[24px] text-black">8</p>
                        </div>
                    </div>
                </div>

                <div className="mt-[40px]">
                    <h3 className="font-medium text-[22px]">Today</h3>
                    <p className="font-light text-[16px]">Monday, April 20</p>


                    <div className="flex flex-col">
                        <div className="w-[370px] h-[140px] mx-auto mt-[25px] p-[15px] bg-zinc-50 rounded-md">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="font-medium text-[19px]">Dribble Shot</p>
                                    <p className="font-light text-[16px]">Personal To-do</p>
                                </div>

                                <div>
                                    {/* <a href="#">. . .</a> */}
                                </div>
                            </div>

                            <div className="flex flex-row justify-between mt-[10px]">
                                <div>
                                    <p>Start Time</p>
                                    <div className="flex flex-row">
                                        <img src="./clock.png" className="mr-[5px] mt-[4px] w-[16px] h-[16px]"/>
                                        <p className="font-light text-[15px]">9.00 AM</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Duration</p>
                                    <p className="font-light text-[15px]">2 Hours</p>
                                </div>

                                <img src="./progressbar.png" alt="progress-bar"/>
                            </div>
                        </div>

                        <div className="w-[370px] h-[140px] mx-auto mt-[20px] p-[15px] bg-zinc-50 rounded-md">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="font-medium text-[19px]">Dribble Shot</p>
                                    <p className="font-light text-[16px]">Personal To-do</p>
                                </div>

                                <div>
                                    {/* <a href="#">. . .</a> */}
                                </div>
                            </div>

                            <div className="flex flex-row justify-between mt-[10px]">
                                <div>
                                    <p>Start Time</p>
                                    <div className="flex flex-row">
                                        <img src="./clock.png" className="mr-[5px] mt-[4px] w-[16px] h-[16px]"/>
                                        <p className="font-light text-[15px]">9.00 AM</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Duration</p>
                                    <p className="font-light text-[15px]">2 Hours</p>
                                </div>

                                <img src="./progressbar.png" alt="progress-bar"/>
                            </div>
                        </div>


                        <div className="w-[370px] h-[140px] mx-auto mt-[20px] p-[15px] bg-zinc-50 rounded-md">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="font-medium text-[19px]">Dribble Shot</p>
                                    <p className="font-light text-[16px]">Personal To-do</p>
                                </div>

                                <div>
                                    {/* <a href="#">. . .</a> */}
                                </div>
                            </div>

                            <div className="flex flex-row justify-between mt-[10px]">
                                <div>
                                    <p>Start Time</p>
                                    <div className="flex flex-row">
                                        <img src="./clock.png" className="mr-[5px] mt-[4px] w-[16px] h-[16px]"/>
                                        <p className="font-light text-[15px]">9.00 AM</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Duration</p>
                                    <p className="font-light text-[15px]">2 Hours</p>
                                </div>

                                <img src="./progressbar.png" alt="progress-bar"/>
                            </div>
                        </div>
                    </div>
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
        </>
    )
}