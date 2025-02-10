'use client';

import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Grid,
  Metric,
  AreaChart,
  BarChart,
  Flex,
  Badge,
  Button,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  DonutChart,
  ProgressBar,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableRow,
  LineChart,
} from "@tremor/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ComparisonIndicator from './ComparisonIndicator';

interface PlayerDetailProps {
  player: {
    name: string;
    position: string;
    points: number;
    rebounds: number;
    assists: number;
    trueShootingPct: number;
    effectiveFgPct: number;
    usageRate: number;
    assistPct: number;
    reboundPct: number;
    offRating: number;
    defRating: number;
    winShares: number;
    lastFiveGames: {
      date: string;
      opponent: string;
      points: number;
      rebounds: number;
      assists: number;
      efficiency: number;
      plusMinus: number;
    }[];
    scoringByQuarter: {
      quarter: string;
      points: number;
      efficiency: number;
    }[];
    playTypes: {
      type: string;
      frequency: number;
      ppp: number; // points per possession
      percentile: number;
    }[];
    shotZones: {
      zone: string;
      attempts: number;
      made: number;
      percentage: number;
      leagueAvg: number;
    }[];
  };
  onBack: () => void;
}

interface AdvancedMetric {
  name: string;
  value: number;
  benchmark: number;
  trend: number[];
  category: 'scoring' | 'efficiency' | 'impact';
  color: Color;
}

export default function PlayerDetailDashboard({ player, onBack }: PlayerDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const performanceData = [
    { date: "2024-01", points: 25, rebounds: 5, assists: 8 },
    { date: "2024-02", points: 28, rebounds: 6, assists: 7 },
    { date: "2024-03", points: 22, rebounds: 4, assists: 9 },
  ];

  const shootingStats = [
    { name: "At Rim", value: 68, total: 124 },
    { name: "Mid-Range", value: 42, total: 98 },
    { name: "3-Point", value: 38, total: 112 },
  ];

  const advancedMetricsData: AdvancedMetric[] = [
    {
      name: "True Shooting",
      value: player.trueShootingPct,
      benchmark: 55.0,
      trend: [54.2, 55.8, 57.1, 58.5, 58.2],
      category: 'efficiency',
      color: "emerald"
    },
    {
      name: "Usage Rate",
      value: player.usageRate,
      benchmark: 20.0,
      trend: [22.4, 23.1, 24.5, 24.8, 24.5],
      category: 'impact',
      color: "blue"
    },
    {
      name: "PER",
      value: 22.4,
      benchmark: 15.0,
      trend: [20.1, 21.4, 22.0, 22.4, 22.4],
      category: 'impact',
      color: "violet"
    },
    {
      name: "Box Plus/Minus",
      value: 4.8,
      benchmark: 0.0,
      trend: [3.2, 3.8, 4.2, 4.6, 4.8],
      category: 'impact',
      color: "indigo"
    },
  ];

  const efficiencyMetrics = {
    scoring: {
      pointsPerShot: 1.28,
      pointsPerPossession: 1.12,
      assistPoints: 15.4,
      percentAssisted: 42.5,
    },
    shotQuality: {
      contested: 52.4,
      openThrees: 38.2,
      rimFrequency: 34.5,
      midRange: 28.4,
    },
    gameImpact: {
      clutchPoints: 4.2,
      fourthQuarter: 7.8,
      fastBreak: 3.6,
      secondChance: 2.4,
    }
  };

  const impactMetrics = [
    { name: "Offensive Rating", value: player.offRating, benchmark: 110 },
    { name: "Defensive Rating", value: player.defRating, benchmark: 110 },
    { name: "Win Shares", value: player.winShares, benchmark: 5.0 },
  ];

  const performanceMetrics = {
    scoring: {
      pointsInPaint: { value: 12.4, rank: 82 },
      fastBreakPoints: { value: 4.2, rank: 65 },
      secondChance: { value: 3.8, rank: 58 },
      offTurnover: { value: 4.6, rank: 71 },
    },
    efficiency: {
      clutchTime: { value: 62.5, rank: 88 },
      fourthQuarter: { value: 58.2, rank: 75 },
      contested: { value: 52.4, rank: 68 },
    },
    impact: {
      plusMinus: { value: 6.8, rank: 85 },
      netRating: { value: 8.2, rank: 78 },
      winProbAdded: { value: 4.2, rank: 72 },
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <Flex justifyContent="between" alignItems="center">
          <Button 
            icon={ArrowLeftIcon} 
            variant="light"
            onClick={onBack}
          >
            Back
          </Button>
          <Badge>{player.position}</Badge>
        </Flex>
        <Title className="mt-4">{player.name}</Title>
      </Card>

      <TabGroup>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Performance</Tab>
          <Tab>Charts</Tab>
          <Tab>Advanced</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                <Text>Points</Text>
                <Metric>{player.points}</Metric>
              </Card>
              <Card>
                <Text>Rebounds</Text>
                <Metric>{player.rebounds}</Metric>
              </Card>
              <Card>
                <Text>Assists</Text>
                <Metric>{player.assists}</Metric>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card>
                <Title>Scoring Breakdown</Title>
                <div className="mt-6 space-y-4">
                  {Object.entries(performanceMetrics.scoring).map(([key, data]) => (
                    <div key={key}>
                      <Flex>
                        <Text>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                        <Badge color={data.rank > 80 ? "emerald" : data.rank > 60 ? "blue" : "gray"}>
                          {`${data.rank}th percentile`}
                        </Badge>
                      </Flex>
                      <div className="flex items-center space-x-2 mt-2">
                        <Text className="w-16">{data.value.toFixed(1)}</Text>
                        <ProgressBar
                          value={data.rank}
                          color={data.rank > 80 ? "emerald" : data.rank > 60 ? "blue" : "gray"}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Title>Efficiency by Situation</Title>
                <div className="mt-6 space-y-4">
                  {Object.entries(performanceMetrics.efficiency).map(([key, data]) => (
                    <div key={key}>
                      <Flex>
                        <Text>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                        <Text>{`${data.value.toFixed(1)}%`}</Text>
                      </Flex>
                      <ProgressBar
                        value={data.value}
                        color={data.rank > 80 ? "emerald" : data.rank > 60 ? "blue" : "gray"}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Title>Quarter by Quarter Performance</Title>
                <BarChart
                  className="mt-6 h-72"
                  data={player.scoringByQuarter}
                  index="quarter"
                  categories={["points", "efficiency"]}
                  colors={["blue", "emerald"]}
                  valueFormatter={(value) => `${value.toFixed(1)}`}
                  stack={false}
                />
              </Card>

              <Card>
                <Title>Play Type Efficiency</Title>
                <div className="mt-6 space-y-4">
                  {player.playTypes.map((play) => (
                    <div key={play.type}>
                      <Flex>
                        <Text>{play.type}</Text>
                        <Badge color={play.percentile > 80 ? "emerald" : play.percentile > 60 ? "blue" : "gray"}>
                          {`${play.percentile}th percentile`}
                        </Badge>
                      </Flex>
                      <div className="flex items-center space-x-2 mt-2">
                        <Text className="w-24">{play.ppp.toFixed(2)} PPP</Text>
                        <ProgressBar
                          value={play.percentile}
                          color={play.percentile > 80 ? "emerald" : play.percentile > 60 ? "blue" : "gray"}
                          className="flex-grow"
                        />
                        <Text className="w-20">{play.frequency}% freq</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="col-span-full">
                <Title>Last 5 Games</Title>
                <Table className="mt-4">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Date</TableHeaderCell>
                      <TableHeaderCell>OPP</TableHeaderCell>
                      <TableHeaderCell>PTS</TableHeaderCell>
                      <TableHeaderCell>REB</TableHeaderCell>
                      <TableHeaderCell>AST</TableHeaderCell>
                      <TableHeaderCell>EFF</TableHeaderCell>
                      <TableHeaderCell>+/-</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {player.lastFiveGames.map((game) => (
                      <TableRow key={game.date}>
                        <TableCell>{game.date}</TableCell>
                        <TableCell>{game.opponent}</TableCell>
                        <TableCell>{game.points}</TableCell>
                        <TableCell>{game.rebounds}</TableCell>
                        <TableCell>{game.assists}</TableCell>
                        <TableCell>{game.efficiency.toFixed(1)}</TableCell>
                        <TableCell>
                          <Badge color={game.plusMinus > 0 ? "emerald" : "red"}>
                            {game.plusMinus > 0 ? '+' : ''}{game.plusMinus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Card className="mt-6">
              <Title>Performance Trends</Title>
              <AreaChart
                className="mt-4 h-72"
                data={performanceData}
                index="date"
                categories={["points", "rebounds", "assists"]}
                colors={["blue", "red", "green"]}
              />
            </Card>
          </TabPanel>

          <TabPanel>
            <Card className="mt-6">
              <Title>Stats Comparison</Title>
              <BarChart
                className="mt-4 h-72"
                data={performanceData}
                index="date"
                categories={["points"]}
                colors={["blue"]}
              />
            </Card>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card>
                <Title>Advanced Metrics Trends</Title>
                <div className="mt-6 space-y-8">
                  {advancedMetricsData.map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <Flex>
                        <Text>{metric.name}</Text>
                        <Badge color={metric.color}>
                          {metric.value > metric.benchmark ? "Above Average" : "Below Average"}
                        </Badge>
                      </Flex>
                      <LineChart
                        data={metric.trend.map((value, i) => ({ x: `Game ${i + 1}`, value }))}
                        index="x"
                        categories={["value"]}
                        colors={[metric.color]}
                        className="h-20"
                        showAnimation={true}
                        showLegend={false}
                        valueFormatter={(value) => `${value.toFixed(1)}`}
                      />
                      <div className="flex items-center space-x-2">
                        <Text className="text-sm text-gray-500">Trend</Text>
                        <Badge color={metric.color} size="xs">
                          {((metric.trend[metric.trend.length - 1] - metric.trend[0]) / metric.trend[0] * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Title>Scoring Efficiency</Title>
                <BarChart
                  className="mt-6 h-72"
                  data={[
                    { name: "Points per Shot", value: efficiencyMetrics.scoring.pointsPerShot * 50 },
                    { name: "Points per Possession", value: efficiencyMetrics.scoring.pointsPerPossession * 50 },
                    { name: "Assist Points", value: efficiencyMetrics.scoring.assistPoints },
                    { name: "% Assisted", value: efficiencyMetrics.scoring.percentAssisted },
                  ]}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value.toFixed(1)}`}
                />
              </Card>

              <Card>
                <Title>Shot Quality Distribution</Title>
                <DonutChart
                  className="mt-6"
                  data={[
                    { name: "Contested", value: efficiencyMetrics.shotQuality.contested },
                    { name: "Open Threes", value: efficiencyMetrics.shotQuality.openThrees },
                    { name: "At Rim", value: efficiencyMetrics.shotQuality.rimFrequency },
                    { name: "Mid-Range", value: efficiencyMetrics.shotQuality.midRange },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value.toFixed(1)}%`}
                  colors={["red", "emerald", "blue", "violet"]}
                />
              </Card>

              <Card>
                <Title>Game Impact Metrics</Title>
                <div className="mt-6 space-y-4">
                  {Object.entries(efficiencyMetrics.gameImpact).map(([key, value]) => (
                    <div key={key}>
                      <Flex>
                        <Text>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                        <Text>{value.toFixed(1)} pts</Text>
                      </Flex>
                      <ProgressBar
                        value={value * 5}
                        className="mt-2"
                        color={value > 5 ? "emerald" : value > 3 ? "blue" : "gray"}
                        tooltip={`${value.toFixed(1)} points per game`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 