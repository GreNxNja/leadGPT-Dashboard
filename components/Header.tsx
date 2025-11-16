import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white transition-all duration-300">
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Statistics</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        {/* User Avatar */}
        <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-gray-200">
          <AvatarImage src="/userImage.png" alt="User" />
          <AvatarFallback className="bg-linear-to-br from-orange-400 to-pink-500 text-white font-medium text-xs sm:text-sm">
            AK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}