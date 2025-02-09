'use client'

import React, { useState } from 'react';
import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import { 
  Target,
  Activity,
  Users
} from 'lucide-react';

interface TeamStats {
  name: string;
  offensiveRating: number;
  defensiveRating: number;
  pace: number;
  effectiveFgPercentage: number;
  turnoverRate: number;
  reboundRate: number;
  assistRate: number;
  pointsInPaint: number;
  fastBreakPoints: number;
  benchPoints: number;
}

interface GameData {
  score: {
    home: number;
    away: number;
  };
  time: string;
  quarter: number;
  teamStats: {
    home: TeamStats;
    away: TeamStats;
  };
  possessionHistory: Array<{
    minute: number;
    home: number;
    away: number;
  }>;
  shotDistribution: Array<{
    range: string;
    home: number;
    away: number;
  }>;
  playTypes: Array<{
    type: string;
    homeEfficiency: number;
    awayEfficiency: number;
    homeFreq: number;
    awayFreq: number;
  }>;
}

interface ComparisonCardProps {
  title: string;
  home: number;
  away: number;
  icon: React.ReactNode;
  format?: 'number' | 'percent';
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ 
  title, 
  home, 
  away, 
  icon, 
  format = 'number' 
}) => {
  const homeValue = format === 'percent' ? `${home}%` : home;
  const awayValue = format === 'percent' ? `${away}%` : away;
  const diff = home - away;
  const isDifferencePositive = diff > 0;

  return (
    <CardComponent>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-left">
            <div className="text-2xl font-bold text-blue-600">{homeValue}</div>
            <p className="text-xs text-gray-500">Home</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-red-600">{awayValue}</div>
            <p className="text-xs text-gray-500">Away</p>
          </div>
        </div>
        <div className="mt-2 text-sm text-center">
          <span className={isDifferencePositive ? 'text-green-600' : 'text-red-600'}>
            {isDifferencePositive ? '↑' : '↓'} {Math.abs(diff).toFixed(1)}
          </span>
        </div>
      </CardContent>
    </CardComponent>
  );
};

const TeamAnalyticsDashboard: React.FC = () => {
  const [gameData] = useState<GameData>({
    score: {
      home: 85,
      away: 82
    },
    time: "3:45",
    quarter: 4,
    teamStats: {
      home: {
        name: "Home Team",
        offensiveRating: 112.5,
        defensiveRating: 104.2,
        pace: 98.4,
        effectiveFgPercentage: 54.8,
        turnoverRate: 12.5,
        reboundRate: 52.3,
        assistRate: 62.8,
        pointsInPaint: 42,
        fastBreakPoints: 15,
        benchPoints: 28
      },
      away: {
        name: "Away Team",
        offensiveRating: 108.2,
        defensiveRating: 106.8,
        pace: 96.2,
        effectiveFgPercentage: 51.2,
        turnoverRate: 14.2,
        reboundRate: 47.7,
        assistRate: 58.4,
        pointsInPaint: 36,
        fastBreakPoints: 12,
        benchPoints: 22
      }
    },
    possessionHistory: [
      { minute: 1, home: 1.12, away: 1.08 },
      { minute: 2, home: 1.15, away: 1.05 },
      { minute: 3, home: 1.08, away: 1.12 },
      { minute: 4, home: 1.18, away: 1.06 },
      { minute: 5, home: 1.14, away: 1.09 }
    ],
    shotDistribution: [
      { range: "0-3ft", home: 35, away: 30 },
      { range: "3-10ft", home: 15, away: 18 },
      { range: "10-16ft", home: 12, away: 15 },
      { range: "16-3PT", home: 18, away: 20 },
      { range: "3PT", home: 20, away: 17 }
    ],
    playTypes: [
      { type: "Pick & Roll", homeEfficiency: 1.12, awayEfficiency: 1.05, homeFreq: 25, awayFreq: 22 },
      { type: "Isolation", homeEfficiency: 0.95, awayEfficiency: 0.98, homeFreq: 15, awayFreq: 18 },
      { type: "Spot Up", homeEfficiency: 1.15, awayEfficiency: 1.08, homeFreq: 30, awayFreq: 28 },
      { type: "Transition", homeEfficiency: 1.25, awayEfficiency: 1.18, homeFreq: 12, awayFreq: 15 },
      { type: "Post Up", homeEfficiency: 0.98, awayEfficiency: 1.02, homeFreq: 18, awayFreq: 17 }
    ]
  });

  return (
    <div className="w-full space-y-4 bg-gray-50 p-6 rounded-xl">
      {/* Add all your charts and components here */}
    </div>
  );
};

export default TeamAnalyticsDashboard; 