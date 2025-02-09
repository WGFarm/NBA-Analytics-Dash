'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
    <Card>
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
    </Card>
  );
};

const TeamAnalyticsDashboard = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComparisonCard
          title="Offensive Rating"
          home={gameData.teamStats.home.offensiveRating}
          away={gameData.teamStats.away.offensiveRating}
          icon={<Target className="h-4 w-4 text-blue-600" />}
        />
        <ComparisonCard
          title="Effective FG%"
          home={gameData.teamStats.home.effectiveFgPercentage}
          away={gameData.teamStats.away.effectiveFgPercentage}
          icon={<Activity className="h-4 w-4 text-blue-600" />}
          format="percent"
        />
        <ComparisonCard
          title="Assist Rate"
          home={gameData.teamStats.home.assistRate}
          away={gameData.teamStats.away.assistRate}
          icon={<Users className="h-4 w-4 text-blue-600" />}
          format="percent"
        />
      </div>

      <Tabs defaultValue="efficiency" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-blue-50">
          <TabsTrigger value="efficiency">Points per Possession</TabsTrigger>
          <TabsTrigger value="shot-distribution">Shot Distribution</TabsTrigger>
          <TabsTrigger value="play-types">Play Type Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle>Points per Possession Timeline</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gameData.possessionHistory}>
                  <defs>
                    <linearGradient id="homeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="awayGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="minute" />
                  <YAxis domain={[0.8, 1.4]} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="home" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#homeGradient)" 
                    name="Home Team"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="away" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#awayGradient)" 
                    name="Away Team"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shot-distribution">
          <Card>
            <CardHeader>
              <CardTitle>Shot Distribution by Range</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gameData.shotDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="home" name="Home Team" fill="#3b82f6" />
                  <Bar dataKey="away" name="Away Team" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="play-types">
          <Card>
            <CardHeader>
              <CardTitle>Play Type Efficiency & Frequency</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={gameData.playTypes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 2]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 40]} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    yAxisId="right" 
                    dataKey="homeFreq" 
                    name="Home Frequency %" 
                    fill="#3b82f6" 
                    opacity={0.3} 
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="awayFreq" 
                    name="Away Frequency %" 
                    fill="#ef4444" 
                    opacity={0.3} 
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="homeEfficiency" 
                    name="Home Efficiency" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="awayEfficiency" 
                    name="Away Efficiency" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Additional Team Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Points in Paint', home: gameData.teamStats.home.pointsInPaint, away: gameData.teamStats.away.pointsInPaint },
                { label: 'Fast Break Points', home: gameData.teamStats.home.fastBreakPoints, away: gameData.teamStats.away.fastBreakPoints },
                { label: 'Bench Points', home: gameData.teamStats.home.benchPoints, away: gameData.teamStats.away.benchPoints }
              ].map((metric, index) => (
                <div key={index} className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {metric.label}
                    </span>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-blue-600 mr-2">
                        Home: {metric.home}
                      </span>
                      <span className="text-xs font-semibold text-red-600">
                        Away: {metric.away}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                    <div 
                      style={{ width: `${(metric.home / (metric.home + metric.away)) * 100}%` }}
                      className="bg-blue-500"
                    />
                    <div 
                      style={{ width: `${(metric.away / (metric.home + metric.away)) * 100}%` }}
                      className="bg-red-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Game Flow Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Pace</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {gameData.teamStats.home.pace}
                  </div>
                  <div className="text-xs text-gray-500">Possessions per 48</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Turnover Rate</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {gameData.teamStats.home.turnoverRate}%
                  </div>
                  <div className="text-xs text-gray-500">Team Average</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamAnalyticsDashboard; 