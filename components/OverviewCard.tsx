import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  value: string;
  icon: string; 
}

export function OverviewCard({ title, value, icon }: OverviewCardProps) {
  return (
    <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-all duration-150">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <img 
          src={icon} 
          alt={title} 
          className="w-6 h-6" // 24px
        />
        <h3 className="text-[16px] font-medium text-gray-700">
          {title}
        </h3>
      </CardHeader>

      <CardContent>
        <div className="text-[28px] font-bold text-gray-900">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
