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
  };
  onBack: () => void;
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

  const advancedMetrics = [
    { name: "True Shooting %", value: player.trueShootingPct, benchmark: 55.0 },
    { name: "Effective FG %", value: player.effectiveFgPct, benchmark: 52.0 },
    { name: "Usage Rate", value: player.usageRate, benchmark: 20.0 },
    { name: "Assist %", value: player.assistPct, benchmark: 15.0 },
    { name: "Rebound %", value: player.reboundPct, benchmark: 10.0 },
  ];

  const impactMetrics = [
    { name: "Offensive Rating", value: player.offRating, benchmark: 110 },
    { name: "Defensive Rating", value: player.defRating, benchmark: 110 },
    { name: "Win Shares", value: player.winShares, benchmark: 5.0 },
  ];

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
          <Tab>Stats</Tab>
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
                <Title>Shooting Efficiency</Title>
                <DonutChart
                  className="mt-6"
                  data={shootingStats}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value.toFixed(1)}%`}
                  colors={["emerald", "blue", "indigo"]}
                />
              </Card>

              <Card>
                <Title>Advanced Metrics</Title>
                <div className="mt-6 space-y-4">
                  {advancedMetrics.map((metric) => (
                    <div key={metric.name}>
                      <Flex>
                        <Text>{metric.name}</Text>
                        <ComparisonIndicator
                          value={metric.value}
                          comparisonValue={metric.benchmark}
                          formatValue={(v) => `${v.toFixed(1)}%`}
                        />
                      </Flex>
                      <ProgressBar
                        value={metric.value}
                        className="mt-2"
                        color="blue"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="col-span-full">
                <Title>Impact Metrics</Title>
                <Grid numItems={3} className="gap-4 mt-4">
                  {impactMetrics.map((metric) => (
                    <Card key={metric.name} decoration="top" decorationColor="blue">
                      <Text>{metric.name}</Text>
                      <Metric className="mt-2">{metric.value.toFixed(1)}</Metric>
                      <ComparisonIndicator
                        value={metric.value}
                        comparisonValue={metric.benchmark}
                        formatValue={(v) => v.toFixed(1)}
                      />
                    </Card>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 