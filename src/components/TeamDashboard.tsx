'use client';

import { useState } from 'react';
import {
  Card,
  Title,
  BarChart,
  LineChart,
  DonutChart,
  Grid,
  Col,
  Text,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Metric,
  ProgressBar,
  AreaChart,
  Badge,
  Flex,
  Subtitle,
  Legend,
  Select,
  SelectItem,
  DateRangePicker,
  DateRangePickerValue,
  Button,
  ScatterChart,
  BarList,
} from "@tremor/react";
import ThemeToggle from './ThemeToggle';
import { InformationCircleIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import ComparisonIndicator from './ComparisonIndicator';
import CustomRadarChart from './CustomRadarChart';

interface TeamMetrics {
  team: string;
  offensiveRating: number;
  defensiveRating: number;
  efg: number;
  trueShootingPct: number;
  pace: number;
  assistRate: number;
  reboundRate: number;
  turnoverRate: number;
}

interface ShotDistribution {
  category: string;
  Warriors: number;
  Lakers: number;
}

interface PerformanceTrend {
  quarter: string;
  teamA: number;
  teamB: number;
}

interface PlayTypeMetrics {
  playType: string;
  efficiency: number;
  frequency: number;
}

interface ClutchMetrics {
  metric: string;
  value: number;
  comparison: number;
}

interface HeadToHeadStats {
  category: string;
  teamA: number;
  teamB: number;
  isPercentage?: boolean;
  isGoodWhenHigh?: boolean;
}

interface ShotHeatmapData {
  x: number;
  y: number;
  value: number;
}

interface PlayerMatchupData {
  player: string;
  minutes: number;
  points: number;
  plusMinus: number;
}

export default function TeamDashboard() {
  // Example data - replace with real API data
  const teamMetrics: TeamMetrics[] = [
    {
      team: "Team A",
      offensiveRating: 112.5,
      defensiveRating: 108.2,
      efg: 54.3,
      trueShootingPct: 58.1,
      pace: 98.7,
      assistRate: 62.4,
      reboundRate: 51.2,
      turnoverRate: 13.8,
    },
    {
      team: "Team B",
      offensiveRating: 110.8,
      defensiveRating: 109.5,
      efg: 52.8,
      trueShootingPct: 56.9,
      pace: 97.2,
      assistRate: 60.1,
      reboundRate: 49.8,
      turnoverRate: 14.2,
    },
  ];

  const shotDistribution: ShotDistribution[] = [
    { category: "Paint", Warriors: 45, Lakers: 48 },
    { category: "Mid-Range", Warriors: 35, Lakers: 32 },
    { category: "Corner 3", Warriors: 42, Lakers: 38 },
    { category: "Top 3", Warriors: 38, Lakers: 35 },
    { category: "Fast Break", Warriors: 40, Lakers: 45 },
  ];

  // New sample data for performance trends
  const performanceTrends: PerformanceTrend[] = [
    { quarter: "Q1", teamA: 28, teamB: 24 },
    { quarter: "Q2", teamA: 26, teamB: 30 },
    { quarter: "Q3", teamA: 32, teamB: 28 },
    { quarter: "Q4", teamA: 30, teamB: 31 },
  ];

  const playTypeMetrics: PlayTypeMetrics[] = [
    { playType: "Pick & Roll", efficiency: 1.05, frequency: 25 },
    { playType: "Isolation", efficiency: 0.92, frequency: 15 },
    { playType: "Spot Up", efficiency: 1.12, frequency: 30 },
    { playType: "Post Up", efficiency: 0.98, frequency: 10 },
    { playType: "Transition", efficiency: 1.25, frequency: 20 },
  ];

  const clutchMetrics: ClutchMetrics[] = [
    { metric: "Points in Paint", value: 48, comparison: 42 },
    { metric: "Second Chance", value: 14, comparison: 12 },
    { metric: "Fast Break", value: 18, comparison: 15 },
    { metric: "Bench Points", value: 38, comparison: 32 },
  ];

  const headToHeadStats: HeadToHeadStats[] = [
    { category: "Points per Game", teamA: 115.2, teamB: 112.8, isGoodWhenHigh: true },
    { category: "Win Percentage", teamA: 60, teamB: 40, isPercentage: true },
    { category: "Field Goal %", teamA: 48.5, teamB: 46.2, isPercentage: true },
    { category: "3PT %", teamA: 37.8, teamB: 35.6, isPercentage: true },
    { category: "Free Throw %", teamA: 82.3, teamB: 79.8, isPercentage: true },
    { category: "Rebounds", teamA: 45.2, teamB: 42.8 },
    { category: "Assists", teamA: 26.5, teamB: 24.2 },
    { category: "Steals", teamA: 8.2, teamB: 7.5 },
    { category: "Blocks", teamA: 5.8, teamB: 4.9 },
    { category: "Turnovers", teamA: 13.2, teamB: 14.8, isGoodWhenHigh: false },
  ];

  const shotHeatmapData: ShotHeatmapData[] = [
    { x: 0, y: 0, value: 45 },
    { x: 1, y: 1, value: 32 },
    // ... more data points
  ];

  const playerMatchups: PlayerMatchupData[] = [
    { player: "Player 1", minutes: 32, points: 24, plusMinus: 12 },
    { player: "Player 2", minutes: 28, points: 18, plusMinus: -5 },
    { player: "Player 3", minutes: 25, points: 15, plusMinus: 8 },
    { player: "Player 4", minutes: 22, points: 12, plusMinus: 4 },
  ];

  // Properly typed state handlers
  const [selectedTeam, setSelectedTeam] = useState<string>("Team A");
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [selectedMetric, setSelectedMetric] = useState<string>("offensiveRating");

  // Type-safe event handlers
  const handleTeamChange = (value: string) => setSelectedTeam(value);
  const handleMetricChange = (value: string) => setSelectedMetric(value);
  const handleDateRangeChange = (value: DateRangePickerValue) => setDateRange(value);

  // Helper function with proper types
  const getTrendIndicator = (current: number, previous: number): JSX.Element => {
    const percentChange = ((current - previous) / previous) * 100;
    return (
      <div className="flex items-center gap-1">
        {percentChange > 0 ? (
          <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
        )}
        <span className={percentChange > 0 ? "text-emerald-500" : "text-red-500"}>
          {Math.abs(percentChange).toFixed(1)}%
        </span>
      </div>
    );
  };

  const selectedTeamData = teamMetrics.find(t => t.team === selectedTeam);
  const otherTeamData = teamMetrics.find(t => t.team !== selectedTeam);

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800">
        <Flex justifyContent="between" alignItems="center">
          <div>
            <Title className="text-3xl font-bold text-gray-800 dark:text-white">
              NBA Analytics Hub
            </Title>
            <Text className="mt-2 text-gray-600 dark:text-gray-300">
              Real-time performance metrics and analysis
            </Text>
          </div>
          <Flex alignItems="center" className="gap-4">
            <Badge size="xl" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              Live Updates
            </Badge>
            <ThemeToggle />
          </Flex>
        </Flex>
      </Card>
      
      {/* Interactive controls with proper handlers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          value={selectedTeam}
          onValueChange={handleTeamChange}
          className="dark:bg-gray-800"
        >
          <SelectItem value="Team A">Team A</SelectItem>
          <SelectItem value="Team B">Team B</SelectItem>
        </Select>

        <DateRangePicker
          value={dateRange}
          onValueChange={handleDateRangeChange}
          className="dark:bg-gray-800"
        />

        <Select
          value={selectedMetric}
          onValueChange={handleMetricChange}
          className="dark:bg-gray-800"
        >
          <SelectItem value="offensiveRating">Offensive Rating</SelectItem>
          <SelectItem value="defensiveRating">Defensive Rating</SelectItem>
          <SelectItem value="efg">Effective FG%</SelectItem>
        </Select>
      </div>

      <TabGroup>
        <TabList className="mt-8 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
          <Tab className="px-6 py-3 text-sm dark:text-gray-300">Efficiency Metrics</Tab>
          <Tab className="px-6 py-3 text-sm dark:text-gray-300">Shot Distribution</Tab>
          <Tab className="px-6 py-3 text-sm dark:text-gray-300">Performance Trends</Tab>
          <Tab className="px-6 py-3 text-sm dark:text-gray-300">Advanced Stats</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
              {/* Offensive & Defensive Ratings */}
              <Card 
                decoration="top" 
                decorationColor="blue" 
                className="hover:shadow-lg transition-shadow dark:bg-gray-800"
              >
                <Flex alignItems="start" className="space-x-2">
                  <div>
                    <Title className="dark:text-white">Offensive Rating</Title>
                    <Subtitle className="mt-2 dark:text-gray-400">
                      Points per 100 possessions
                    </Subtitle>
                  </div>
                  <InformationCircleIcon 
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 cursor-help" 
                    title="Points scored per 100 possessions"
                  />
                </Flex>
                <div className="mt-6">
                  <Metric className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedTeamData?.offensiveRating.toFixed(1)}
                  </Metric>
                  <div className="mt-4">
                    <ComparisonIndicator
                      value={selectedTeamData?.offensiveRating || 0}
                      comparisonValue={otherTeamData?.offensiveRating || 0}
                      label={`vs ${otherTeamData?.team}`}
                    />
                  </div>
                </div>
                <BarChart
                  className="mt-6 h-48"
                  data={teamMetrics}
                  index="team"
                  categories={["offensiveRating"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value.toFixed(1)}`}
                  showLegend={false}
                />
              </Card>

              {/* Shooting Efficiency */}
              <Card 
                decoration="left" 
                decorationColor="violet" 
                className="hover:shadow-lg transition-shadow dark:bg-gray-800"
              >
                <Flex alignItems="start">
                  <div>
                    <Title className="dark:text-white">Shot Efficiency by Zone</Title>
                    <Subtitle className="mt-2 dark:text-gray-400">FG% from different locations</Subtitle>
                  </div>
                </Flex>
                <BarChart
                  className="mt-6 h-80"
                  data={[
                    { zone: "Paint", Warriors: 62, Lakers: 58 },
                    { zone: "Mid-Range", Warriors: 42, Lakers: 40 },
                    { zone: "Corner 3", Warriors: 38, Lakers: 35 },
                    { zone: "Top 3", Warriors: 35, Lakers: 33 },
                    { zone: "Fast Break", Warriors: 65, Lakers: 62 },
                  ]}
                  index="zone"
                  categories={["Warriors", "Lakers"]}
                  colors={["blue", "red"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                />
              </Card>

              {/* Pace Metrics */}
              <Card 
                decoration="top" 
                decorationColor="indigo" 
                className="hover:shadow-lg transition-shadow dark:bg-gray-800"
              >
                <Flex alignItems="start">
                  <div>
                    <Title className="dark:text-white">Game Pace</Title>
                    <Subtitle className="mt-2 dark:text-gray-400">Possessions per 48 minutes</Subtitle>
                  </div>
                </Flex>
                <div className="mt-6">
                  <Metric className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                    {teamMetrics[0].pace.toFixed(1)}
                  </Metric>
                  <Text className="mt-2 text-gray-600 dark:text-gray-400">League Average: 98.5</Text>
                  <ProgressBar 
                    value={teamMetrics[0].pace / 120} 
                    className="mt-4"
                    color="indigo"
                    tooltip={`${teamMetrics[0].pace.toFixed(1)} possessions`}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Text className="dark:text-gray-400">vs Previous Week</Text>
                  {getTrendIndicator(teamMetrics[0].pace, 97.5)}
                </div>
              </Card>

              {/* Defensive Rating Comparison */}
              <Card 
                decoration="top" 
                decorationColor="red" 
                className="hover:shadow-lg transition-shadow dark:bg-gray-800"
              >
                <Flex alignItems="start" className="space-x-2">
                  <div>
                    <Title className="dark:text-white">Defensive Rating</Title>
                    <Subtitle className="mt-2 dark:text-gray-400">
                      Points allowed per 100 possessions
                    </Subtitle>
                  </div>
                  <InformationCircleIcon 
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 cursor-help" 
                    title="Lower is better"
                  />
                </Flex>
                <div className="mt-6">
                  <Metric className="text-4xl font-bold text-red-600 dark:text-red-400">
                    {selectedTeamData?.defensiveRating.toFixed(1)}
                  </Metric>
                  <div className="mt-4">
                    <ComparisonIndicator
                      value={selectedTeamData?.defensiveRating || 0}
                      comparisonValue={otherTeamData?.defensiveRating || 0}
                      label={`vs ${otherTeamData?.team}`}
                      isGoodWhenHigh={false}
                    />
                  </div>
                </div>
                <BarChart
                  className="mt-6 h-48"
                  data={teamMetrics}
                  index="team"
                  categories={["defensiveRating"]}
                  colors={["red"]}
                  valueFormatter={(value) => `${value.toFixed(1)}`}
                  showLegend={false}
                />
              </Card>

              {/* True Shooting Comparison */}
              <Card 
                decoration="top" 
                decorationColor="emerald" 
                className="hover:shadow-lg transition-shadow dark:bg-gray-800"
              >
                <Flex alignItems="start" className="space-x-2">
                  <div>
                    <Title className="dark:text-white">True Shooting</Title>
                    <Subtitle className="mt-2 dark:text-gray-400">
                      Shooting efficiency including FTs
                    </Subtitle>
                  </div>
                </Flex>
                <Grid numItems={2} className="gap-4 mt-6">
                  <div>
                    <Text className="dark:text-gray-400">{selectedTeam}</Text>
                    <Metric className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedTeamData?.trueShootingPct.toFixed(1)}%
                    </Metric>
                  </div>
                  <div>
                    <Text className="dark:text-gray-400">{otherTeamData?.team}</Text>
                    <Metric className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {otherTeamData?.trueShootingPct.toFixed(1)}%
                    </Metric>
                  </div>
                </Grid>
                <ComparisonIndicator
                  value={selectedTeamData?.trueShootingPct || 0}
                  comparisonValue={otherTeamData?.trueShootingPct || 0}
                  label="Difference"
                  formatValue={(v) => `${v.toFixed(1)}%`}
                />
              </Card>

              {/* Team Success Rates Comparison */}
              <Card className="col-span-3 dark:bg-gray-800">
                <Title className="dark:text-white">Team Success Metrics Comparison</Title>
                <Grid numItems={3} className="gap-4 mt-4">
                  <Card decoration="top" decorationColor="emerald" className="dark:bg-gray-700">
                    <Text className="dark:text-gray-300">Assist Rate</Text>
                    <div className="mt-2">
                      <Metric className="dark:text-white">{selectedTeamData?.assistRate}%</Metric>
                      <ComparisonIndicator
                        value={selectedTeamData?.assistRate || 0}
                        comparisonValue={otherTeamData?.assistRate || 0}
                        formatValue={(v) => `${v.toFixed(1)}%`}
                      />
                    </div>
                  </Card>
                  <Card decoration="top" decorationColor="blue" className="dark:bg-gray-700">
                    <Text className="dark:text-gray-300">Rebound Rate</Text>
                    <div className="mt-2">
                      <Metric className="dark:text-white">{selectedTeamData?.reboundRate}%</Metric>
                      <ComparisonIndicator
                        value={selectedTeamData?.reboundRate || 0}
                        comparisonValue={otherTeamData?.reboundRate || 0}
                        formatValue={(v) => `${v.toFixed(1)}%`}
                      />
                    </div>
                  </Card>
                  <Card decoration="top" decorationColor="red" className="dark:bg-gray-700">
                    <Text className="dark:text-gray-300">Turnover Rate</Text>
                    <div className="mt-2">
                      <Metric className="dark:text-white">{selectedTeamData?.turnoverRate}%</Metric>
                      <ComparisonIndicator
                        value={selectedTeamData?.turnoverRate || 0}
                        comparisonValue={otherTeamData?.turnoverRate || 0}
                        isGoodWhenHigh={false}
                        formatValue={(v) => `${v.toFixed(1)}%`}
                      />
                    </div>
                  </Card>
                </Grid>
              </Card>

              {/* Enhanced Head-to-Head Performance */}
              <Card className="col-span-3 dark:bg-gray-800">
                <Flex>
                  <Title className="dark:text-white">Head-to-Head Performance</Title>
                  <Badge className="ml-2 dark:bg-gray-700">Last 5 Games</Badge>
                </Flex>
                
                <Grid numItems={2} className="gap-6 mt-4">
                  {/* Main Stats Comparison */}
                  <Card className="dark:bg-gray-700">
                    <div className="space-y-4">
                      {headToHeadStats.slice(0, 5).map((stat) => (
                        <div key={stat.category}>
                          <Flex className="mb-2">
                            <Text className="dark:text-gray-300">{stat.category}</Text>
                            <ComparisonIndicator
                              value={stat.teamA}
                              comparisonValue={stat.teamB}
                              formatValue={(v) => stat.isPercentage ? `${v.toFixed(1)}%` : v.toFixed(1)}
                              isGoodWhenHigh={stat.isGoodWhenHigh !== false}
                            />
                          </Flex>
                          <ProgressBar
                            value={stat.teamA / (stat.teamA + stat.teamB)}
                            className="mt-1"
                            tooltip={`${selectedTeam}: ${stat.teamA} vs ${otherTeamData?.team}: ${stat.teamB}`}
                            color="blue"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Additional Stats Grid */}
                  <Card className="dark:bg-gray-700">
                    <Grid numItems={2} className="gap-4">
                      {headToHeadStats.slice(5).map((stat) => (
                        <div key={stat.category} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <Text className="dark:text-gray-400">{stat.category}</Text>
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <Text className="dark:text-gray-300">{selectedTeam}</Text>
                              <Metric className="text-lg text-blue-600 dark:text-blue-400">
                                {stat.teamA.toFixed(1)}
                              </Metric>
                            </div>
                            <div className="text-right">
                              <Text className="dark:text-gray-300">{otherTeamData?.team}</Text>
                              <Metric className="text-lg text-red-600 dark:text-red-400">
                                {stat.teamB.toFixed(1)}
                              </Metric>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Grid>
                  </Card>
                </Grid>

                {/* Recent Games Timeline */}
                <Card className="mt-4 dark:bg-gray-700">
                  <Title className="dark:text-white text-sm">Recent Matchups</Title>
                  <div className="flex justify-between items-center mt-4">
                    {[
                      { date: "Jan 15", scoreA: 112, scoreB: 108 },
                      { date: "Dec 28", scoreA: 105, scoreB: 115 },
                      { date: "Dec 12", scoreA: 118, scoreB: 110 },
                      { date: "Nov 30", scoreA: 108, scoreB: 106 },
                      { date: "Nov 15", scoreA: 122, scoreB: 115 },
                    ].map((game, idx) => (
                      <div key={idx} className="text-center">
                        <Text className="dark:text-gray-400 text-xs">{game.date}</Text>
                        <div className={`text-sm font-semibold ${
                          game.scoreA > game.scoreB ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                          {game.scoreA} - {game.scoreB}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Scoring Trends */}
                <Card className="mt-4 dark:bg-gray-700">
                  <Title className="dark:text-white text-sm">Scoring Distribution by Quarter</Title>
                  <AreaChart
                    className="mt-4 h-32"
                    data={[
                      { quarter: "Q1", teamA: 28, teamB: 24 },
                      { quarter: "Q2", teamA: 30, teamB: 28 },
                      { quarter: "Q3", teamA: 25, teamB: 32 },
                      { quarter: "Q4", teamA: 32, teamB: 26 },
                    ]}
                    index="quarter"
                    categories={["teamA", "teamB"]}
                    colors={["blue", "red"]}
                    valueFormatter={(value) => `${value} pts`}
                    showLegend={false}
                    showGridLines={false}
                  />
                </Card>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              {/* Shot Distribution */}
              <Card className="dark:bg-gray-800">
                <Title className="dark:text-white">Shot Distribution</Title>
                <Subtitle className="mt-2 dark:text-gray-400">
                  Shot frequency by zone comparison
                </Subtitle>
                
                <CustomRadarChart data={shotDistribution} />
              </Card>

              {/* Shot Efficiency */}
              <Card 
                decoration="left" 
                decorationColor="violet" 
                className="hover:shadow-lg transition-shadow dark:bg-gray-800"
              >
                <Flex alignItems="start">
                  <div>
                    <Title className="dark:text-white">Shot Efficiency by Zone</Title>
                    <Subtitle className="mt-2 dark:text-gray-400">FG% from different locations</Subtitle>
                  </div>
                </Flex>
                <BarChart
                  className="mt-6 h-80"
                  data={[
                    { zone: "Paint", Warriors: 62, Lakers: 58 },
                    { zone: "Mid-Range", Warriors: 42, Lakers: 40 },
                    { zone: "Corner 3", Warriors: 38, Lakers: 35 },
                    { zone: "Top 3", Warriors: 35, Lakers: 33 },
                    { zone: "Fast Break", Warriors: 65, Lakers: 62 },
                  ]}
                  index="zone"
                  categories={["Warriors", "Lakers"]}
                  colors={["blue", "red"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                />
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              {/* Scoring Timeline */}
              <Card className="dark:bg-gray-800">
                <Title className="dark:text-white">Scoring Timeline</Title>
                <AreaChart
                  className="mt-4 h-72"
                  data={performanceTrends}
                  index="quarter"
                  categories={["teamA", "teamB"]}
                  colors={["blue", "red"]}
                  valueFormatter={(value) => `${value} pts`}
                />
              </Card>

              {/* Momentum Shifts */}
              <Card className="dark:bg-gray-800">
                <Title className="dark:text-white">Team Performance Indicators</Title>
                <Grid numItems={2} className="gap-4 mt-4">
                  {clutchMetrics.map((metric) => (
                    <Card key={metric.metric} className="dark:bg-gray-700">
                      <Text className="dark:text-gray-300">{metric.metric}</Text>
                      <Metric className="dark:text-white">{metric.value}</Metric>
                      <Text className="mt-2 dark:text-gray-400">
                        vs {metric.comparison} (League Avg)
                      </Text>
                      <ProgressBar 
                        value={metric.value / (metric.value + metric.comparison)} 
                        className="mt-2"
                      />
                    </Card>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
              {/* Play Type Analysis */}
              <Card className="col-span-2 dark:bg-gray-800">
                <Title className="dark:text-white">Play Type Efficiency</Title>
                <BarChart
                  className="mt-4 h-80"
                  data={playTypeMetrics}
                  index="playType"
                  categories={["efficiency"]}
                  colors={["emerald"]}
                  valueFormatter={(value) => `${value.toFixed(2)} PPP`}
                />
              </Card>

              {/* Play Type Distribution */}
              <Card className="dark:bg-gray-800">
                <Title className="dark:text-white">Play Type Distribution</Title>
                <DonutChart
                  className="mt-4"
                  data={playTypeMetrics}
                  category="frequency"
                  index="playType"
                  valueFormatter={(value) => `${value}%`}
                  colors={["slate", "violet", "indigo", "rose", "cyan"]}
                />
              </Card>

              {/* Team Success Rates */}
              <Card className="col-span-3 dark:bg-gray-800">
                <Title className="dark:text-white">Team Success Metrics</Title>
                <Grid numItems={3} className="gap-4 mt-4">
                  <Card decoration="top" decorationColor="emerald" className="dark:bg-gray-700">
                    <Text className="dark:text-gray-300">Assist Rate</Text>
                    <Metric className="dark:text-white">{teamMetrics[0].assistRate}%</Metric>
                  </Card>
                  <Card decoration="top" decorationColor="blue" className="dark:bg-gray-700">
                    <Text className="dark:text-gray-300">Rebound Rate</Text>
                    <Metric className="dark:text-white">{teamMetrics[0].reboundRate}%</Metric>
                  </Card>
                  <Card decoration="top" decorationColor="red" className="dark:bg-gray-700">
                    <Text className="dark:text-gray-300">Turnover Rate</Text>
                    <Metric className="dark:text-white">{teamMetrics[0].turnoverRate}%</Metric>
                  </Card>
                </Grid>
              </Card>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* Floating action button */}
      <div className="fixed bottom-8 right-8">
        <Button
          size="lg"
          variant="primary"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => {
            console.log("Quick action clicked");
          }}
        >
          <ArrowTrendingUpIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
