import { Button } from '@/components/ui/button';
import { Filter, Calendar, ChevronDown, Grid } from 'lucide-react';

export default function Filters() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="h-9 px-4 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="flex items-center gap-2 h-9 px-3 text-sm font-normal text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          <Calendar className="h-4 w-4" />
          Date range: <span className="font-medium">All</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2 h-9 px-3 text-sm font-normal text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          <Grid className="h-4 w-4" />
          Edit Insights
        </Button>
      </div>
    </div>
  );
}
