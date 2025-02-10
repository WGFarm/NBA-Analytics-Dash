'use client';

import { Card, Title, Subtitle, Legend, Text } from "@tremor/react";
import { useState } from 'react';

interface RadarChartProps {
  data: {
    category: string;
    Warriors: number;
    Lakers: number;
  }[];
}

interface TooltipData {
  x: number;
  y: number;
  category: string;
  warriors: number;
  lakers: number;
}

// Add this new interface for enhanced tooltip data
interface EnhancedTooltipData extends TooltipData {
  difference: number;
  total: number;
  leagueAverage: number;
  historicalAvg: number;
  lastGame: {
    warriors: number;
    lakers: number;
  };
  trend: {
    warriors: 'up' | 'down' | 'stable';
    lakers: 'up' | 'down' | 'stable';
  };
  seasonHigh: number;
}

export default function CustomRadarChart({ data }: RadarChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<EnhancedTooltipData | null>(null);
  const [hoveredTeam, setHoveredTeam] = useState<'Warriors' | 'Lakers' | null>(null);

  // Calculate the maximum value for scaling
  const maxValue = Math.max(
    ...data.flatMap(d => [d.Warriors, d.Lakers])
  );

  // Convert data points to SVG coordinates
  const points = data.map((d, i) => {
    const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 150; // SVG radius
    return {
      category: d.category,
      Warriors: {
        x: Math.cos(angle) * (radius * d.Warriors / maxValue) + 200,
        y: Math.sin(angle) * (radius * d.Warriors / maxValue) + 200
      },
      Lakers: {
        x: Math.cos(angle) * (radius * d.Lakers / maxValue) + 200,
        y: Math.sin(angle) * (radius * d.Lakers / maxValue) + 200
      },
      labelX: Math.cos(angle) * (radius + 30) + 200,
      labelY: Math.sin(angle) * (radius + 30) + 200,
      values: {
        warriors: d.Warriors,
        lakers: d.Lakers
      }
    };
  });

  // Create path strings for each team
  const createPath = (team: 'Warriors' | 'Lakers') => {
    return points.map((p, i) => 
      (i === 0 ? 'M' : 'L') + `${p[team].x},${p[team].y}`
    ).join(' ') + 'Z';
  };

  // Add this helper function for calculating differences
  const calculateTooltipData = (category: string, warriors: number, lakers: number): EnhancedTooltipData => {
    const difference = warriors - lakers;
    const total = warriors + lakers;
    
    // Example data - replace with real data
    const leagueAverage = 50;
    const historicalAvg = 48;
    const lastGame = {
      warriors: warriors - 2,
      lakers: lakers + 1
    };
    
    const trend = {
      warriors: warriors > lastGame.warriors ? 'up' : warriors < lastGame.warriors ? 'down' : 'stable',
      lakers: lakers > lastGame.lakers ? 'up' : lakers < lastGame.lakers ? 'down' : 'stable'
    };

    return {
      x: 0,
      y: 0,
      category,
      warriors,
      lakers,
      difference,
      total,
      leagueAverage,
      historicalAvg,
      lastGame,
      trend,
      seasonHigh: Math.max(warriors, lakers)
    };
  };

  // Update the handleMouseMove function
  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (!tooltipData) return;

    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    
    const viewBoxX = (x * 400) / svgRect.width;
    const viewBoxY = (y * 400) / svgRect.height;
    
    setTooltipData(prev => prev ? {
      ...prev,
      x: viewBoxX,
      y: viewBoxY
    } : null);
  };

  return (
    <div className="w-full relative">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredCategory(null);
          setTooltipData(null);
          setHoveredTeam(null);
        }}
      >
        {/* Value indicators */}
        {[20, 40, 60, 80, 100].map((value, i) => (
          <text
            key={i}
            x="205"
            y={200 - (150 * (i + 1) / 5)}
            className="text-xs fill-gray-400 dark:fill-gray-500"
          >
            {value}%
          </text>
        ))}

        {/* Background grid with hover effect */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <polygon
            key={i}
            points={points.map(p => {
              const angle = (points.indexOf(p) / points.length) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * (150 * scale) + 200;
              const y = Math.sin(angle) * (150 * scale) + 200;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="currentColor"
            className={`text-gray-200 dark:text-gray-700 transition-all duration-200 ${
              hoveredCategory ? 'opacity-30' : 'opacity-100'
            }`}
            strokeWidth="1"
          />
        ))}

        {/* Interactive axis lines */}
        {points.map((p, i) => (
          <g key={i}>
            <line
              x1="200"
              y1="200"
              x2={p.labelX}
              y2={p.labelY}
              stroke="currentColor"
              className={`text-gray-200 dark:text-gray-700 transition-all duration-200 ${
                hoveredCategory === p.category ? 'opacity-100 stroke-2' : 'opacity-50'
              }`}
              strokeWidth="1"
            />
            {/* Clickable area for each axis */}
            <circle
              cx={p.labelX}
              cy={p.labelY}
              r="30"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => {
                setHoveredCategory(p.category);
                setTooltipData(calculateTooltipData(
                  p.category,
                  p.values.warriors,
                  p.values.lakers
                ));
              }}
            />
          </g>
        ))}

        {/* Team polygons with hover effects */}
        {['Warriors', 'Lakers'].map((team) => (
          <path
            key={team}
            d={createPath(team as 'Warriors' | 'Lakers')}
            fill={team === 'Warriors' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)'}
            stroke={team === 'Warriors' ? 'rgb(59, 130, 246)' : 'rgb(239, 68, 68)'}
            strokeWidth={hoveredTeam === team ? '3' : '2'}
            className={`transition-all duration-200 ${
              hoveredTeam && hoveredTeam !== team ? 'opacity-30' : 'opacity-100'
            }`}
            onMouseEnter={() => setHoveredTeam(team as 'Warriors' | 'Lakers')}
            onMouseLeave={() => setHoveredTeam(null)}
          />
        ))}

        {/* Enhanced labels with hover effect */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-xs fill-gray-600 dark:fill-gray-300 transition-all duration-200 ${
              hoveredCategory === p.category ? 'font-bold' : ''
            }`}
          >
            {p.category}
          </text>
        ))}

        {/* Enhanced Tooltip */}
        {tooltipData && (
          <g 
            transform={`translate(${tooltipData.x + 10}, ${tooltipData.y - 10})`}
            className="tooltip-container"
          >
            {/* Increase height for more content */}
            <rect
              x="0"
              y="0"
              width="180"
              height="200"
              rx="6"
              className="fill-white dark:fill-gray-800 opacity-95 shadow-lg"
            />
            
            <g className="tooltip-content">
              {/* Category Header */}
              <text 
                x="10" 
                y="20" 
                className="text-sm font-bold fill-gray-800 dark:fill-white"
              >
                {tooltipData.category}
              </text>

              {/* Team Values with Trend Indicators */}
              <g transform="translate(10, 35)">
                {/* Warriors */}
                <rect width="15" height="15" fill="rgb(59, 130, 246)" />
                <text x="25" y="12" className="text-xs fill-gray-700 dark:fill-gray-300">
                  Warriors: {tooltipData.warriors}%
                  {tooltipData.trend.warriors === 'up' && ' ↑'}
                  {tooltipData.trend.warriors === 'down' && ' ↓'}
                </text>
                <text x="120" y="12" className="text-xs fill-gray-500 dark:fill-gray-400">
                  ({tooltipData.lastGame.warriors}%)
                </text>

                {/* Lakers */}
                <rect y="20" width="15" height="15" fill="rgb(239, 68, 68)" />
                <text x="25" y="32" className="text-xs fill-gray-700 dark:fill-gray-300">
                  Lakers: {tooltipData.lakers}%
                  {tooltipData.trend.lakers === 'up' && ' ↑'}
                  {tooltipData.trend.lakers === 'down' && ' ↓'}
                </text>
                <text x="120" y="32" className="text-xs fill-gray-500 dark:fill-gray-400">
                  ({tooltipData.lastGame.lakers}%)
                </text>
              </g>

              {/* Divider */}
              <line 
                x1="10" 
                y1="65" 
                x2="170" 
                y2="65" 
                className="stroke-gray-200 dark:stroke-gray-700" 
                strokeWidth="1"
              />

              {/* Statistical Comparisons */}
              <g transform="translate(10, 80)">
                {/* Direct Comparison */}
                <text className="text-xs fill-gray-600 dark:fill-gray-400">
                  Difference: 
                  <tspan className={tooltipData.difference > 0 ? 'fill-emerald-500' : 'fill-red-500'}>
                    {' '}{tooltipData.difference > 0 ? '+' : ''}{tooltipData.difference}%
                  </tspan>
                </text>

                {/* League Average */}
                <text y="20" className="text-xs fill-gray-600 dark:fill-gray-400">
                  vs League Avg: 
                  <tspan className={
                    Math.max(tooltipData.warriors, tooltipData.lakers) > tooltipData.leagueAverage
                      ? 'fill-emerald-500' 
                      : 'fill-red-500'
                  }>
                    {' '}{Math.max(tooltipData.warriors, tooltipData.lakers) - tooltipData.leagueAverage}%
                  </tspan>
                </text>

                {/* Historical Average */}
                <text y="40" className="text-xs fill-gray-600 dark:fill-gray-400">
                  vs Historical: 
                  <tspan className={
                    Math.max(tooltipData.warriors, tooltipData.lakers) > tooltipData.historicalAvg
                      ? 'fill-emerald-500' 
                      : 'fill-red-500'
                  }>
                    {' '}{Math.max(tooltipData.warriors, tooltipData.lakers) - tooltipData.historicalAvg}%
                  </tspan>
                </text>

                {/* Game-to-Game Change */}
                <text y="60" className="text-xs fill-gray-600 dark:fill-gray-400">
                  Warriors Change: 
                  <tspan className={tooltipData.warriors - tooltipData.lastGame.warriors > 0 ? 'fill-emerald-500' : 'fill-red-500'}>
                    {' '}{tooltipData.warriors - tooltipData.lastGame.warriors > 0 ? '+' : ''}
                    {tooltipData.warriors - tooltipData.lastGame.warriors}%
                  </tspan>
                </text>

                <text y="80" className="text-xs fill-gray-600 dark:fill-gray-400">
                  Lakers Change: 
                  <tspan className={tooltipData.lakers - tooltipData.lastGame.lakers > 0 ? 'fill-emerald-500' : 'fill-red-500'}>
                    {' '}{tooltipData.lakers - tooltipData.lastGame.lakers > 0 ? '+' : ''}
                    {tooltipData.lakers - tooltipData.lastGame.lakers}%
                  </tspan>
                </text>

                {/* Season High */}
                <text y="100" className="text-xs fill-gray-600 dark:fill-gray-400">
                  Season High: 
                  <tspan className="fill-blue-500">
                    {' '}{tooltipData.seasonHigh}%
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        )}
      </svg>

      {/* Interactive legend */}
      <div className="mt-3">
        <Legend 
          className="justify-center"
          categories={["Warriors", "Lakers"]}
          colors={["blue", "red"]}
          onMouseEnter={(team) => setHoveredTeam(team as 'Warriors' | 'Lakers')}
          onMouseLeave={() => setHoveredTeam(null)}
        />
      </div>
    </div>
  );
} 