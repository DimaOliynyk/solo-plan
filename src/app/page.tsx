import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row ml-[20px] pt-[40px] justify-between">
        <div className="">
          <h2 className="font-medium text-[22px] font-medium">Morning, Aria Malik 👋</h2>
          <p className="font-light text-[15px]">0 tasks are waiting for you today</p>
        </div>
        <img src="./user-pr-pc-default.png" className="w-[50px] h-[50px] mr-[20px]"alt="user-profile-picture"/>
      </header>

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

        <div className="mt-[28px]">
          <h3 className="font-medium text-[22px]">Category</h3>
          
          <div className="flex flex-row justify-between mt-[20px]">
            <div className="w-[160px] h-[140px] bg-white rounded-md ml-[15px] flex flex-row justify-between">
              <div className="ml-[15px]">
                <p className="text-[19px] w-[80px]">Personal To-do</p>
                <p className="text-[12px] text-black opacity-60 mb-[30px]">12 Tasks remaining</p>

                <a href="#" className="text-[#2879E4]">Go to Tasks</a>
              </div>
              <img src="./coffeecup.png" className="mr-[10px] w-[28px] h-[28px]"/>
            </div>

            <div className="w-[160px] h-[140px] bg-white rounded-md mr-[15px] flex flex-row justify-between ml-[10px]" >
              <div className="ml-[15px]">
                <p className="text-[19px] w-[70px]">Work To-do</p>
                <p className="text-[12px] text-black opacity-60 mb-[30px]">0 Tasks remaining</p>

                <a href="#" className="text-[#2879E4]">Go to Tasks</a>
              </div>
              <img src="./suitcase.png" className="mr-[10px] w-[28px] h-[28px]"/>
            </div>
          </div>
        </div>

        <div className="mt-[25px]">
          <div className="flex flex-row justify-between">
            <h3 className="font-medium text-[22px]">Daily task View</h3>
            <a href="#" className="text-[#2879E4] mt-[6px]">See all</a>
          </div>

          <button className="block w-[210px] h-[55px] bg-[#0076FF] mt-[40px] rounded-[50px] m-auto text-white font-medium">Add New Task</button>
        </div>
      </main>

      <footer className="w-[100%] fixed bottom-0 left-0 w-full pb-[25px] flex flex-row justify-between mt-auto">
        <a href="#" className="mt-[20px]">
          <img src="./homepage-active-icon.png" className="ml-[35px]"/>
        </a>
        <a href="#" className=" mt-[20px]">
          <img src="./Calendar.png" className=""/>
        </a>

        <button className="w-[60px] h-[60px] rounded-[50%] bg-[#2879E4] text-[35px] text-white">+</button>

        <a href="#" className="mt-[20px]">
          <img src="./profile.png" className=""/>
        </a>
        <a href="#" className="mr-[35px] mt-[20px]">
          <img src="./messages.png" className=""/>
        </a>
      </footer>
    </div>
  );
}
