"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface ChartDataPoint {
  month: string;
  overall: number;
  delayed: number;
  notResponded: number;
}

export default function LeadsSummary() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const chartData: ChartDataPoint[] = [
    { month: "Apr", overall: 320, delayed: 80, notResponded: 40 },
    { month: "May", overall: 420, delayed: 60, notResponded: 20 },
    { month: "June", overall: 200, delayed: 50, notResponded: 30 },
    { month: "July", overall: 80, delayed: 20, notResponded: 60 },
    { month: "Aug", overall: 120, delayed: 30, notResponded: 10 },
    { month: "Sept", overall: 380, delayed: 90, notResponded: 70 },
  ];

  const maxValue = Math.max(
    ...chartData.map((d) => d.overall + d.delayed + d.notResponded),
  );

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-gray-900">
          Leads summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tooltip */}
        {hoveredBar !== null && (
          <div className="absolute z-10 left-1/2 -translate-x-1/2 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-md mt-2 text-sm w-56">
            <div className="flex items-start gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5"></span>
              <div className="flex-1">
                <div className="text-gray-600">Leads generated</div>
                <div className="text-xl font-semibold text-gray-900">
                  {chartData[hoveredBar].overall}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 mt-1.5"></span>
              <div className="flex-1">
                <div className="text-gray-600">Delayed response</div>
                <div className="text-xl font-semibold text-gray-900">
                  {chartData[hoveredBar].delayed}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400 mt-1.5"></span>
              <div className="flex-1">
                <div className="text-gray-600">Not responded</div>
                <div className="text-xl font-semibold text-gray-900">
                  {chartData[hoveredBar].notResponded}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bar Chart */}
        <div className="w-full flex justify-between items-end h-[180px] px-4 relative">
          {chartData.map((data, index) => {
            const total = data.overall + data.delayed + data.notResponded;
            const barTotalHeight = (total / maxValue) * 150;
            const overallHeight = (data.overall / total) * barTotalHeight;
            const delayedHeight = (data.delayed / total) * barTotalHeight;
            const notRespondedHeight =
              (data.notResponded / total) * barTotalHeight;

            return (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer relative"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{ width: "34px" }}
              >
                <div className="flex flex-col-reverse w-full h-[150px] justify-end">
                  <div
                    className={`w-full bg-pink-400 transition-all rounded-t ${
                      hoveredBar === index ? "opacity-100" : "opacity-80"
                    }`}
                    style={{ height: `${notRespondedHeight}px` }}
                  />
                  <div
                    className="w-full bg-orange-400 transition-all"
                    style={{ height: `${delayedHeight}px` }}
                  />
                  <div
                    className="w-full bg-purple-600 transition-all rounded-b"
                    style={{ height: `${overallHeight}px` }}
                  />
                </div>
                <span className="mt-2 text-xs text-gray-500">{data.month}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-xs text-gray-600 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span>Overall leads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span>Delayed response</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            <span>Not responded</span>
          </div>
        </div>

        {/* Leads details and progress */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              <span className="text-sm text-gray-600">Leads Generated</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Purchase available:</div>
              <div className="text-lg font-semibold text-gray-900">392</div>
            </div>
          </div>
          <div className="relative">
            <Progress value={78} className="h-2 bg-gray-100" />
            <div className="absolute left-[78%] top-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-purple-600"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-purple-600 hover:text-purple-700"
            >
              Get more leads <ChevronRight className="h-3 w-3 ml-0.5" />
            </Button>
          </div>
          <div className="flex justify-between text-sm pt-1">
            <div className="flex flex-col">
              <span className="text-gray-500">Leads utilised</span>
              <span className="text-lg font-semibold text-gray-900">1200</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-gray-500">Potential leads</span>
              <span className="text-lg font-semibold text-gray-900">300</span>
            </div>
          </div>
          <div className="flex justify-between text-sm pt-1 border-t border-gray-100">
            <div className="flex flex-col pt-2">
              <span className="text-gray-500">Leads generated</span>
              <span className="text-lg font-semibold text-gray-900">827</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
