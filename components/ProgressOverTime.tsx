"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid } from 'lucide-react';
import { useState, useRef } from 'react';

export default function ProgressOverTime() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const chartData = {
    peopleContacted: [
      { month: 'May', value: 250 },
      { month: 'June', value: 300 },
      { month: 'July', value: 350 },
      { month: 'Aug', value: 400 },
      { month: 'Sept', value: 520 },
      { month: 'Oct', value: 750 }
    ],
    leadsGenerated: [
      { month: 'May', value: 20 },
      { month: 'June', value: 40 },
      { month: 'July', value: 30 },
      { month: 'Aug', value: 50 },
      { month: 'Sept', value: 35 },
      { month: 'Oct', value: 70 }
    ],
    peopleRejected: [
      { month: 'May', value: 150 },
      { month: 'June', value: 180 },
      { month: 'July', value: 220 },
      { month: 'Aug', value: 160 },
      { month: 'Sept', value: 140 },
      { month: 'Oct', value: 200 }
    ]
  };

  const maxValue = 800;
  const months = ['May', 'June', 'July', 'Aug', 'Sept', 'Oct'];
  const width = 600;
  const height = 280;
  const xGap = width / (months.length - 1);

  const getX = (i: number) => i * xGap;
  const getY = (v: number) => height - (v / maxValue) * height;
  const makePoints = (arr: { value: number }[]) => arr.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    let index = Math.round(x / xGap);
    index = Math.max(0, Math.min(months.length - 1, index));

    setHoverIndex(index);
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold text-gray-900">Progress over time</CardTitle>
        <Button variant="outline" size="sm" className="text-sm font-normal text-gray-700 border-gray-300">
          <Grid className="h-4 w-4 mr-2" />
          Select parameters
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-purple-600"></span> People contacted
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-green-500"></span> Leads generated
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-500"></span> People rejected
          </div>
        </div>

        <div className="relative h-80 w-full">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="ml-8"
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <polyline fill="none" stroke="#7c3aed" strokeWidth="2" points={makePoints(chartData.peopleContacted)} />
            <polyline fill="none" stroke="#22c55e" strokeWidth="2" points={makePoints(chartData.leadsGenerated)} />
            <polyline fill="none" stroke="#ef4444" strokeWidth="2" points={makePoints(chartData.peopleRejected)} />

            {hoverIndex !== null && (
              <>
                <line
                  x1={getX(hoverIndex)}
                  x2={getX(hoverIndex)}
                  y1={0}
                  y2={height}
                  stroke="#aaa"
                  strokeDasharray="4 3"
                />
                <circle cx={getX(hoverIndex)} cy={getY(chartData.peopleContacted[hoverIndex].value)} r="5" fill="#7c3aed" />
                <circle cx={getX(hoverIndex)} cy={getY(chartData.leadsGenerated[hoverIndex].value)} r="5" fill="#22c55e" />
                <circle cx={getX(hoverIndex)} cy={getY(chartData.peopleRejected[hoverIndex].value)} r="5" fill="#ef4444" />
              </>
            )}
          </svg>

          <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {hoverIndex !== null && (
            <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  People contacted
                  <span className="ml-auto font-semibold">{chartData.peopleContacted[hoverIndex].value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  People rejected
                  <span className="ml-auto font-semibold">{chartData.peopleRejected[hoverIndex].value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Leads generated
                  <span className="ml-auto font-semibold">{chartData.leadsGenerated[hoverIndex].value}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
