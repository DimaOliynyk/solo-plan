export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <header className="justify-items-center">
            <img src="./main-logo.png" alt="main logo"/>
            <div className="mt-[30px]">
              <h2 className="text-center text-[22px] text-black font-medium">Hello Welcome back!</h2>
              <p className="text-center text-[gray] text-[16px]">Sign in to continue</p>
            </div>
        </header>

        <main className="justify-items-center mt-[50px] h-[100%] bg-white rounded-xl">
          <form className="w-[330px] flex flex-col w-4\5 p-6">
            <p className="mb-[10px]">Email</p>
            <input type="email" placeholder="michael@gmail.com" className="mb-[20px] w-[100%] h-[40px] rounded-xl border-1 border-gray-300 border-gray-50 p-2"/>
            <p className="mb-[10px]">Password</p>
            <input type="password" placeholder="password" className="mb-[20px] w-[100%] h-[40px] rounded-xl border-1 border-gray-300 border-gray-50 p-2"/>

            <button className="h-[48px] bg-blue-400 w-[100%] mx-auto rounded-4xl mt-[30px]">Login</button>
          </form>
        </main>

        <footer className="absolute bottom-4 w-full">
          <p className="text-sm text-center">Dont have account? <a href="#">Sign Up</a></p>
        </footer>
    </div>
  );
}
