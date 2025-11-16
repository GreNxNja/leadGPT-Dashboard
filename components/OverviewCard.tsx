import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  value: string;
  icon: string; 
}

export function OverviewCard({ title, value, icon }: OverviewCardProps) {
  return (
    <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-all duration-150">
      <CardHeader className="flex flex-row items-center gap-2 sm:gap-3 pb-2 p-3 sm:p-4">
        <img 
          src={icon} 
          alt={title} 
          className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" 
        />
        <h3 className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}