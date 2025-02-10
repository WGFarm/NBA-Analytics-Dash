'use client';

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
} from "@tremor/react";

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

  return (
    <main className="p-4 md:p-10 mx-auto max-w-[1600px] bg-gray-50 min-h-screen">
      <Card className="mb-8">
        <Flex justifyContent="between" alignItems="center">
          <div>
            <Title className="text-3xl font-bold text-gray-800">NBA Analytics Hub</Title>
            <Text className="mt-2 text-gray-600">Real-time performance metrics and analysis</Text>
          </div>
          <Badge size="xl" className="bg-blue-50 text-blue-700">
            Live Updates
          </Badge>
        </Flex>
      </Card>
      
      <TabGroup>
        <TabList className="mt-8 bg-white p-2 rounded-lg shadow-sm">
          <Tab className="px-6 py-3 text-sm">Efficiency Metrics</Tab>
          <Tab className="px-6 py-3 text-sm">Shot Distribution</Tab>
          <Tab className="px-6 py-3 text-sm">Performance Trends</Tab>
          <Tab className="px-6 py-3 text-sm">Advanced Stats</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
              {/* Offensive & Defensive Ratings */}
              <Card decoration="top" decorationColor="blue" className="hover:shadow-lg transition-shadow">
                <Flex alignItems="start">
                  <div>
                    <Title>Team Ratings</Title>
                    <Subtitle className="mt-2">Offensive vs Defensive Efficiency</Subtitle>
                  </div>
                </Flex>
                <BarChart
                  className="mt-6 h-64"
                  data={teamMetrics}
                  index="team"
                  categories={["offensiveRating", "defensiveRating"]}
                  colors={["emerald", "red"]}
                  valueFormatter={(value) => `${value.toFixed(1)}`}
                  showLegend={true}
                  showGridLines={false}
                />
              </Card>

              {/* Shooting Efficiency */}
              <Card decoration="top" decorationColor="emerald" className="hover:shadow-lg transition-shadow">
                <Flex alignItems="start">
                  <div>
                    <Title>Shooting Efficiency</Title>
                    <Subtitle className="mt-2">eFG% by Team</Subtitle>
                  </div>
                </Flex>
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
              <Card decoration="top" decorationColor="indigo" className="hover:shadow-lg transition-shadow">
                <Flex alignItems="start">
                  <div>
                    <Title>Game Pace</Title>
                    <Subtitle className="mt-2">Possessions per 48 minutes</Subtitle>
                  </div>
                </Flex>
                <div className="mt-6">
                  <Metric className="text-4xl font-bold text-indigo-600">
                    {teamMetrics[0].pace.toFixed(1)}
                  </Metric>
                  <Text className="mt-2 text-gray-600">League Average: 98.5</Text>
                  <ProgressBar 
                    value={teamMetrics[0].pace / 120} 
                    className="mt-4"
                    color="indigo"
                    tooltip={`${teamMetrics[0].pace.toFixed(1)} possessions`}
                  />
                </div>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              {/* Shot Distribution */}
              <Card decoration="left" decorationColor="cyan" className="hover:shadow-lg transition-shadow">
                <Flex alignItems="start">
                  <div>
                    <Title>Shot Distribution by Zone</Title>
                    <Subtitle className="mt-2">Percentage of attempts by location</Subtitle>
                  </div>
                </Flex>
                <DonutChart
                  className="mt-6 h-80"
                  data={shotDistribution}
                  category="attempts"
                  index="zone"
                  valueFormatter={(value) => `${value}%`}
                  colors={["blue", "cyan", "indigo", "violet"]}
                  showAnimation={true}
                  showTooltip={true}
                />
              </Card>

              {/* Shot Efficiency */}
              <Card decoration="left" decorationColor="violet" className="hover:shadow-lg transition-shadow">
                <Flex alignItems="start">
                  <div>
                    <Title>Shot Efficiency by Zone</Title>
                    <Subtitle className="mt-2">FG% from different locations</Subtitle>
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
              <Card>
                <Title>Scoring Timeline</Title>
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
              <Card>
                <Title>Team Performance Indicators</Title>
                <Grid numItems={2} className="gap-4 mt-4">
                  {clutchMetrics.map((metric) => (
                    <Card key={metric.metric}>
                      <Text>{metric.metric}</Text>
                      <Metric>{metric.value}</Metric>
                      <Text className="mt-2">
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
              <Card className="col-span-2">
                <Title>Play Type Efficiency</Title>
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
              <Card>
                <Title>Play Type Distribution</Title>
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
              <Card className="col-span-3">
                <Title>Team Success Metrics</Title>
                <Grid numItems={3} className="gap-4 mt-4">
                  <Card decoration="top" decorationColor="emerald">
                    <Text>Assist Rate</Text>
                    <Metric>{teamMetrics[0].assistRate}%</Metric>
                  </Card>
                  <Card decoration="top" decorationColor="blue">
                    <Text>Rebound Rate</Text>
                    <Metric>{teamMetrics[0].reboundRate}%</Metric>
                  </Card>
                  <Card decoration="top" decorationColor="red">
                    <Text>Turnover Rate</Text>
                    <Metric>{teamMetrics[0].turnoverRate}%</Metric>
                  </Card>
                </Grid>
              </Card>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
