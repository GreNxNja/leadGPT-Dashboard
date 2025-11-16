"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ProgressOverTime() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 280 });
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const width = Math.max(300, containerWidth - 32);
        const height = Math.min(280, Math.max(200, width * 0.5));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
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
    setTooltipPos({ x: getX(index), y: height / 2 });
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-3">
        <CardTitle className="text-base font-semibold text-gray-900">Progress over time</CardTitle>
        <Button variant="outline" size="sm" className="text-sm font-normal text-gray-600 border-gray-300 hover:bg-gray-50">
          <Grid className="h-4 w-4 mr-2" />
          Select parameters
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span className="text-xs text-purple-700 font-medium">People contacted</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-green-700 font-medium">Leads generated</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-xs text-red-700 font-medium">People rejected</span>
          </div>
        </div>

        <div ref={containerRef} className="relative w-full" style={{ height: height + 60 }}>
          <div className="overflow-x-auto">
            <svg
              ref={svgRef}
              width={width}
              height={height}
              className="ml-2 sm:ml-4"
              onMouseMove={handleMove}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Grid lines */}
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={i}
                  x1={0}
                  x2={width}
                  y1={(i / 6) * height}
                  y2={(i / 6) * height}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}

              {/* Area fills */}
              <defs>
                <linearGradient id="purpleGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="redGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <polygon
                fill="url(#purpleGradient)"
                points={`0,${height} ${makePoints(chartData.peopleContacted)} ${width},${height}`}
              />
              <polygon
                fill="url(#redGradient)"
                points={`0,${height} ${makePoints(chartData.peopleRejected)} ${width},${height}`}
              />
              <polygon
                fill="url(#greenGradient)"
                points={`0,${height} ${makePoints(chartData.leadsGenerated)} ${width},${height}`}
              />

              {/* Lines */}
              <polyline fill="none" stroke="#7c3aed" strokeWidth="2.5" points={makePoints(chartData.peopleContacted)} />
              <polyline fill="none" stroke="#ef4444" strokeWidth="2.5" points={makePoints(chartData.peopleRejected)} />
              <polyline fill="none" stroke="#22c55e" strokeWidth="2.5" points={makePoints(chartData.leadsGenerated)} />

              {/* Hover line and dots */}
              {hoverIndex !== null && (
                <>
                  <line
                    x1={getX(hoverIndex)}
                    x2={getX(hoverIndex)}
                    y1={0}
                    y2={height}
                    stroke="#d1d5db"
                    strokeWidth="1.5"
                  />
                  <circle cx={getX(hoverIndex)} cy={getY(chartData.peopleContacted[hoverIndex].value)} r="4" fill="white" stroke="#7c3aed" strokeWidth="2.5" />
                  <circle cx={getX(hoverIndex)} cy={getY(chartData.leadsGenerated[hoverIndex].value)} r="4" fill="white" stroke="#22c55e" strokeWidth="2.5" />
                  <circle cx={getX(hoverIndex)} cy={getY(chartData.peopleRejected[hoverIndex].value)} r="4" fill="white" stroke="#ef4444" strokeWidth="2.5" />
                </>
              )}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-2 sm:left-4 flex justify-between text-xs text-gray-500" style={{ width }}>
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* Tooltip */}
          {hoverIndex !== null && (
            <div 
              className="absolute bg-white border border-gray-200 rounded-lg shadow-xl p-3 text-sm pointer-events-none z-10"
              style={{ 
                left: tooltipPos.x > width / 2 ? tooltipPos.x - 140 : tooltipPos.x + 20,
                top: 20
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span className="text-gray-600 text-xs">People contacted</span>
                  <span className="ml-auto font-bold text-gray-900">{chartData.peopleContacted[hoverIndex].value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-gray-600 text-xs">People rejected</span>
                  <span className="ml-auto font-bold text-gray-900">{chartData.peopleRejected[hoverIndex].value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-gray-600 text-xs">Leads generated</span>
                  <span className="ml-auto font-bold text-gray-900">{chartData.leadsGenerated[hoverIndex].value}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}