export default function Profile(){
    return(
        <>
            <header className="flex flex-row w-[390px] pt-[40px] pb-[40px]">
                <img src="/user-pr-pc-default.png" className="ml-[15px] mr-[10px]"/>
                <div className="flex flex-col ml-[10px]">
                    <p>Aria Malik</p>
                    <p>Illustrator Freelancer</p>
                </div>
                <div className="w-[80px] h-[40px] bg-gray-100 ml-[55px] rounded-3xl">
                    <p className="text-[#2879E4] ml-[25px] mt-[7px] m-auto">Edit</p>
                </div>
            </header>

            <main className="mb-[30px]">
                <div className="w-[360px] h-[70px] bg-gray-100 rounded-xl m-auto flex flex-row">
                    <img src="/bar-chart.png" className="w-[35px] h-[37px] ml-[20px] mt-[17px]"/>
                    <div className="flex flex-col mt-[13px] ml-[10px] text-[#2879E4]">
                        <p className="pt-15px text-[17px] font-medium">Task Statistic Report</p>
                        <p className="text-[14px] font-light">205 Tasks</p>
                    </div>
                    <img src="/chevron.png"  className="w-[25px] h-[25px] opacity-50 ml-[92px] mt-[22px]"/>
                </div> 

                <p className="mt-[25px] ml-[15px] font-light">General</p>

                <div className="w-[360px] h-[70px] rounded-xl justify-between m-auto mt-[20px] mb-[25px] flex flex-row">
                    <img src="/bar-chart.png" className="w-[35px] h-[37px] ml-[20px] mt-[17px]"/>
                    <div className="flex flex-col mt-[23px] ml-[15px] text-black font-light ">
                        <p className="pt-15px text-[17px] w-[150px] ">Notifications</p>
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
                <div className="w-[360px] h-[70px] rounded-xl justify-between m-auto mt-[20px] mb-[25px] flex flex-row">
                    <img src="/bar-chart.png" className="w-[35px] h-[37px] ml-[20px] mt-[17px]"/>
                    <div className="flex flex-col mt-[23px] ml-[15px] text-black font-light ">
                        <p className="pt-15px text-[17px] w-[150px]">Get Help</p>
                    </div>
                    <img src="/chevron.png"  className="w-[25px] h-[25px] opacity-50 ml-[100px] mr-[20px] mt-[22px]"/>
                </div>
                <div className="w-[360px] h-[70px] rounded-x justify-between m-auto mt-[20px] mb-[25px] flex flex-row">
                    <img src="/bar-chart.png" className="w-[35px] h-[37px] ml-[20px] mt-[17px]"/>
                    <div className="flex flex-col mt-[23px] ml-[15px] text-black font-light ">
                        <p className="pt-15px text-[17px] w-[150px]">Privacy Policy</p>
                    </div>
                    <img src="/chevron.png"  className="w-[25px] h-[25px] opacity-50 ml-[100px] mr-[20px] mt-[22px]"/>
                </div>

                <button className="w-[360px] h-[70px] bg-[#2879E4] rounded-xl ml-[15px] flex flex-row">
                    <img src="/logout.png" className="w-[30px] h-[30px] m-auto mr-[10px]" />
                    <p className="m-auto ml-[0px] text-[20px] text-white font-medium">Logout</p>
                </button>
            </main>

            <footer className="w-[390px] h-[100px] bg-white rounded-t-xl justify-between flex flex-row m-auto pt-[20px] pb-[10px]">
                <a href="/home/user" className="ml-[20px]">
                    <img src="/house.png" className="w-[30px] h-[30px]"/>
                    <div className="w-[5px] h-[5px] rounded-[50%] bg-black ml-[12px] mt-[10px]"></div>
                </a>
                <a href="/schedule/user" className="">
                    <img src="/calendar.png" className="w-[30px] h-[30px]"/>
                </a>
                <a className="">
                    <img src="/chat.png" className="w-[30px] h-[30px]"/>
                </a>
                <a href="/profile/user" className="mr-[20px]">
                    <img src="/user.png" className="w-[30px] h-[30px]"/>
                </a>
            </footer>
        </>

    )
}