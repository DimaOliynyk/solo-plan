"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Standardized Nav Items
  const navItems = [
    { href: '/home/user', icon: '/house.png', id: 'home' },
    { href: '/schedule/user', icon: '/calendar.png', id: 'schedule' },
    { href: '#chat', icon: '/chat.png', id: 'chat' },
    { href: '/profile/user', icon: '/user.png', id: 'profile' },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <footer className="w-[90%] max-w-[400px] h-20 bg-[#0A1121] rounded-[2.5rem] flex justify-around items-center px-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto">
        
        {/* First two icons */}
        {navItems.slice(0, 2).map((item) => (
          <NavLink key={item.id} item={item} active={pathname === item.href} />
        ))}

        {/* Standardized Center "Plus" Button */}
        <div className="relative -translate-y-6">
          <Link 
            href="/newtaskcreate/user" 
            className="w-16 h-16 bg-blue-600 rounded-2xl border-[6px] border-[#F8FAFC] shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            <span className="text-white text-3xl font-light leading-none">+</span>
          </Link>
        </div>

        {/* Last two icons */}
        {navItems.slice(2).map((item) => (
          <NavLink key={item.id} item={item} active={pathname === item.href} />
        ))}
        
      </footer>
    </div>
  );
}

function NavLink({ item, active }: { item: any; active: boolean }) {
  return (
    <Link 
      href={item.href} 
      className={`p-4 transition-all duration-300 ${active ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-50'}`}
    >
      {/* Icon size forced to exactly 24x24px for consistency */}
      <img src={item.icon} className="w-6 h-6 invert object-contain" alt="" />
    </Link>
  );
}