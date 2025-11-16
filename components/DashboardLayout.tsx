"use client";
import { ReactNode } from 'react';
import { useSidebar } from '@/components/SidebarContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-[280px]'
        }`}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}