import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b bg-white">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-900">Statistics</h1>
      </div>

      <div className="flex items-center gap-3">

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        {/* User Avatar */}
        <Avatar className="h-10 w-10 border-2 border-gray-200">
          <AvatarImage src="/userImage.png" alt="User" />
          <AvatarFallback className="bg-linear-to-br from-orange-400 to-pink-500 text-white font-medium text-sm">
            AK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
