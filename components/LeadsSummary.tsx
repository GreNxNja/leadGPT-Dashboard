"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface ChartDataPoint {
  month: string;
  overall: number;
  delayed: number;
  notResponded: number;
}

export default function LeadsSummary() {
  const [hoverIndex, setHoverIndex] = useState<number | null | "bottom">(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  const data: ChartDataPoint[] = [
    { month: "Apr", overall: 320, delayed: 80, notResponded: 40 },
    { month: "May", overall: 420, delayed: 60, notResponded: 20 },
    { month: "Jun", overall: 200, delayed: 50, notResponded: 30 },
    { month: "Jul", overall: 80, delayed: 20, notResponded: 60 },
    { month: "Aug", overall: 120, delayed: 30, notResponded: 10 },
    { month: "Sep", overall: 380, delayed: 90, notResponded: 70 },
  ];

  const bottomData = {
    used: 1200,
    generated: 827,
    potential: 300,
    percent: 80,
    purchased: 1200,
  };

  const max = Math.max(
    ...data.map((d) => d.overall + d.delayed + d.notResponded),
  );

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = 180;

    const left = x + w > rect.width ? x - w - 8 : x + 8;
    setTooltip({ x: left, y: y - 10 });
  };

  return (
    <Card className="rounded-2xl border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Leads summary
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        {hoverIndex !== null && (
          <div
            className="absolute z-50 bg-white p-3 rounded-lg border border-gray-200 shadow-lg text-sm w-[180px] pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {hoverIndex === "bottom" ? (
              <>
                <TooltipRow
                  color="bg-purple-600"
                  label="Leads Generated"
                  value={bottomData.generated}
                />
              </>
            ) : (
              <>
                <TooltipRow
                  color="bg-purple-600"
                  label="Leads generated"
                  value={data[hoverIndex as number].overall}
                />
                <TooltipRow
                  color="bg-orange-400"
                  label="Delayed response"
                  value={data[hoverIndex as number].delayed}
                />
                <TooltipRow
                  color="bg-pink-400"
                  label="Not responded"
                  value={data[hoverIndex as number].notResponded}
                />
              </>
            )}
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <div className="flex flex-col justify-between h-[220px] text-xs text-gray-500 pt-2">
            {Array.from({ length: 6 }).map((_, i) => {
              const v = Math.round((max / 5) * (5 - i));
              return (
                <span key={i} className="-mt-1">
                  {v}
                </span>
              );
            })}
          </div>

          <div
            className="relative flex-1"
            onMouseMove={move}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-gray-200"
                style={{ top: `${(i / 5) * 100}%` }}
              />
            ))}

            <div className="flex justify-between items-end h-[220px] px-4 relative pt-2">
              {data.map((d, i) => {
                const total = d.overall + d.delayed + d.notResponded;
                const h = (total / max) * 180;
                const h1 = (d.overall / total) * h;
                const h2 = (d.delayed / total) * h;
                const h3 = (d.notResponded / total) * h;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center cursor-pointer group"
                    onMouseEnter={() => setHoverIndex(i)}
                  >
                    <div className="flex flex-col w-10 justify-end h-[180px] transition-opacity group-hover:opacity-80">
                      <div
                        className="bg-purple-600 rounded-t"
                        style={{ height: h1 }}
                      />
                      <div className="bg-orange-400" style={{ height: h2 }} />
                      <div
                        className="bg-pink-400 rounded-b"
                        style={{ height: h3 }}
                      />
                    </div>
                    <span className="mt-3 text-xs text-gray-600">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 text-xs text-gray-600 py-3 border-b border-gray-200">
          <Legend color="bg-purple-600" label="Overall leads" />
          <Legend color="bg-orange-400" label="Delayed response" />
          <Legend color="bg-pink-400" label="Not responded" />
        </div>

        <div
          className="mt-6 bg-white rounded-lg relative"
          onMouseMove={move}
          onMouseEnter={() => setHoverIndex("bottom")}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl font-bold text-gray-900">
              {bottomData.purchased}
            </div>
            <div className="text-sm text-gray-600">Purchased</div>
            <div className="ml-auto">
              <span className="flex items-center gap-1 text-purple-600 font-medium cursor-pointer text-sm hover:text-purple-700">
                Get more leads <ChevronRight size={16} />
              </span>
            </div>
          </div>

          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="absolute left-0 top-0 h-full bg-purple-600 rounded-full"
              style={{ width: `${bottomData.percent}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span className="text-gray-600">Leads utilised</span>
              <span className="font-semibold text-gray-900">
                {bottomData.used}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-gray-600">Potential leads</span>
              <span className="font-semibold text-gray-900">
                {bottomData.potential}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="text-gray-600">Leads generated</span>
            <span className="font-semibold text-gray-900">
              {bottomData.generated}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TooltipRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="mb-2.5 last:mb-0">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <div className="text-gray-600 text-xs">{label}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900 ml-3.5">{value}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
