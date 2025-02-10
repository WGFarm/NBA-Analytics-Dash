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
} from "@tremor/react";
import ThemeToggle from './ThemeToggle';
import { InformationCircleIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import ComparisonIndicator from './ComparisonIndicator';

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
  zone: string;
  attempts: number;
  efficiency: number;
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
    { zone: "Paint", attempts: 45, efficiency: 62 },
    { zone: "Mid-Range", attempts: 20, efficiency: 42 },
    { zone: "Corner 3", attempts: 15, efficiency: 38 },
    { zone: "Top of Key 3", attempts: 20, efficiency: 35 },
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
    <main className="p-4 md:p-10 mx-auto max-w-[1600px] bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <Card className="mb-8 dark:bg-gray-800">
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
                decoration="top" 
                decorationColor="emerald" 
                className="hover:shadow-lg transition-shadow dark:bg-gray-800 group cursor-pointer"
                onClick={() => handleMetricChange("efg")}
              >
                <Flex alignItems="start">
                  <div>
                    <Title className="dark:text-white">Shooting Efficiency</Title>
                    <Subtitle className="mt-2 dark:text-gray-400">eFG% by Team</Subtitle>
                  </div>
                </Flex>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4 text-sm text-gray-500 dark:text-gray-400">
                  Click to focus
                </div>
                <DonutChart
                  className="mt-6 h-64"
                  data={teamMetrics}
                  category="efg"
                  index="team"
                  valueFormatter={(value) => `${value.toFixed(1)}%`}
                  colors={["blue", "cyan"]}
                  showAnimation={true}
                  showTooltip={true}
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

              {/* Head-to-Head Performance */}
              <Card className="dark:bg-gray-800">
                <Title className="dark:text-white">Head-to-Head Performance</Title>
                <Grid numItems={2} className="gap-6 mt-4">
                  <div>
                    <Text className="dark:text-gray-400">Points per Game</Text>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <Text className="dark:text-gray-300">{selectedTeam}</Text>
                        <Metric className="text-2xl text-blue-600 dark:text-blue-400">115.2</Metric>
                      </div>
                      <div className="text-right">
                        <Text className="dark:text-gray-300">{otherTeamData?.team}</Text>
                        <Metric className="text-2xl text-red-600 dark:text-red-400">112.8</Metric>
                      </div>
                    </div>
                    <ProgressBar 
                      value={115.2 / (115.2 + 112.8)} 
                      className="mt-2"
                      tooltip="Head-to-head scoring comparison"
                    />
                  </div>
                  <div>
                    <Text className="dark:text-gray-400">Win Percentage</Text>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <Text className="dark:text-gray-300">{selectedTeam}</Text>
                        <Metric className="text-2xl text-blue-600 dark:text-blue-400">60%</Metric>
                      </div>
                      <div className="text-right">
                        <Text className="dark:text-gray-300">{otherTeamData?.team}</Text>
                        <Metric className="text-2xl text-red-600 dark:text-red-400">40%</Metric>
                      </div>
                    </div>
                    <ProgressBar 
                      value={0.6} 
                      className="mt-2"
                      tooltip="Head-to-head win percentage"
                    />
                  </div>
                </Grid>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              {/* Shot Distribution */}
              <Card className="dark:bg-gray-800">
                <Title className="dark:text-white">Shot Distribution Comparison</Title>
                <Grid numItems={2} className="gap-4 mt-4">
                  <div>
                    <Subtitle className="dark:text-gray-400">{selectedTeam}</Subtitle>
                    <DonutChart
                      className="mt-2"
                      data={shotDistribution}
                      category="attempts"
                      index="zone"
                      valueFormatter={(value) => `${value}%`}
                      colors={["blue", "cyan", "indigo", "violet"]}
                    />
                  </div>
                  <div>
                    <Subtitle className="dark:text-gray-400">{otherTeamData?.team}</Subtitle>
                    <DonutChart
                      className="mt-2"
                      data={shotDistribution}
                      category="attempts"
                      index="zone"
                      valueFormatter={(value) => `${value}%`}
                      colors={["blue", "cyan", "indigo", "violet"]}
                    />
                  </div>
                </Grid>
                <div className="mt-4">
                  {shotDistribution.map((zone) => (
                    <div key={zone.zone} className="mt-2">
                      <ComparisonIndicator
                        value={zone.efficiency}
                        comparisonValue={zone.efficiency * 0.9} // Example comparison
                        label={zone.zone}
                        formatValue={(v) => `${v.toFixed(1)}%`}
                      />
                    </div>
                  ))}
                </div>
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
                  data={shotDistribution}
                  index="zone"
                  categories={["efficiency"]}
                  colors={["violet"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={false}
                  showGridLines={false}
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
    </main>
  );
}
