'use client';

import {
  Card,
  Title,
  Text,
  Grid,
  Col,
  Metric,
  AreaChart,
  DonutChart,
  BarChart,
  Flex,
  Badge,
  Button,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ProgressBar,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableRow,
  ScatterChart,
  LineChart,
} from "@tremor/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PlayerStats } from './PlayerDashboard';
import StatTooltip from './StatTooltip';

interface PlayerDetailProps {
  player: PlayerStats;
  onBack: () => void;
  gameLog?: GameLogEntry[];
}

interface GameLogEntry {
  date: string;
  opponent: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fgm: number;
  fga: number;
  threePm: number;
  threePa: number;
  ftm: number;
  fta: number;
  plusMinus: number;
}

// Add new interfaces for detailed stats
interface ShotZoneStats {
  zone: string;
  attempts: number;
  made: number;
  percentage: number;
  leagueAvg: number;
}

interface AdvancedSplits {
  situation: string;
  points: number;
  efficiency: number;
  frequency: number;
}

// Move all data declarations to the top, outside the component
const defaultGameLog: GameLogEntry[] = [
  {
    date: "2024-02-20",
    opponent: "LAL",
    minutes: 35,
    points: 30,
    rebounds: 5,
    assists: 8,
    steals: 2,
    blocks: 0,
    fgm: 10,
    fga: 20,
    threePm: 5,
    threePa: 10,
    ftm: 5,
    fta: 6,
    plusMinus: 12,
  },
  {
    date: "2024-02-18",
    opponent: "PHX",
    minutes: 32,
    points: 28,
    rebounds: 4,
    assists: 10,
    steals: 1,
    blocks: 1,
    fgm: 9,
    fga: 18,
    threePm: 4,
    threePa: 9,
    ftm: 6,
    fta: 6,
    plusMinus: 8,
  },
  {
    date: "2024-02-16",
    opponent: "DEN",
    minutes: 36,
    points: 35,
    rebounds: 6,
    assists: 6,
    steals: 3,
    blocks: 0,
    fgm: 12,
    fga: 22,
    threePm: 6,
    threePa: 11,
    ftm: 5,
    fta: 5,
    plusMinus: 15,
  },
  // Add more recent games...
];

// Add shot chart data
const shotChartData = [
  { zone: "Restricted Area", made: 82, attempts: 124, percentage: 66.1 },
  { zone: "Paint (Non-RA)", made: 42, attempts: 86, percentage: 48.8 },
  { zone: "Mid-Range", made: 44, attempts: 98, percentage: 44.9 },
  { zone: "Corner 3", made: 28, attempts: 64, percentage: 43.8 },
  { zone: "Above Break 3", made: 72, attempts: 182, percentage: 39.6 },
];

// Add advanced metrics data
const advancedMetrics = {
  scoring: {
    pointsPerPossession: 1.12,
    pointsPerShot: 1.24,
    trueShootingPct: 58.5,
    effectiveFgPct: 54.2,
  },
  playmaking: {
    assistPct: 28.4,
    assistToTurnover: 2.8,
    potentialAssists: 12.5,
    passesPerGame: 52.3,
  },
  efficiency: {
    offRating: 114.2,
    defRating: 108.5,
    netRating: 5.7,
    winShares: 4.2,
  },
};

// Add performance splits
const performanceSplits = {
  byPeriod: [
    { period: "1st", points: 8.2, efficiency: 56.8 },
    { period: "2nd", points: 7.4, efficiency: 52.3 },
    { period: "3rd", points: 9.1, efficiency: 58.9 },
    { period: "4th", points: 7.8, efficiency: 54.1 },
  ],
  byGameType: [
    { type: "Home", points: 28.4, efficiency: 57.2 },
    { type: "Away", points: 26.8, efficiency: 54.8 },
    { type: "Wins", points: 29.2, efficiency: 58.5 },
    { type: "Losses", points: 25.6, efficiency: 53.1 },
  ],
};

// Add new visualization data
const shotDistanceData = [
  { distance: '0-3', frequency: 32, efficiency: 68 },
  { distance: '3-10', frequency: 18, efficiency: 45 },
  { distance: '10-16', frequency: 15, efficiency: 42 },
  { distance: '16-3P', frequency: 12, efficiency: 41 },
  { distance: '3P', frequency: 23, efficiency: 38 },
];

const defenseMatchupData = [
  { defender: 'Guards', possessions: 145, ptsAllowed: 1.02, stopPct: 62 },
  { defender: 'Wings', possessions: 98, ptsAllowed: 0.98, stopPct: 65 },
  { defender: 'Bigs', possessions: 56, ptsAllowed: 1.12, stopPct: 58 },
];

const clutchPerformance = [
  { timeLeft: '5:00', score: 'Close', points: 4.2, efficiency: 58 },
  { timeLeft: '4:00', score: 'Close', points: 3.8, efficiency: 55 },
  { timeLeft: '3:00', score: 'Close', points: 4.5, efficiency: 62 },
  { timeLeft: '2:00', score: 'Close', points: 5.2, efficiency: 65 },
  { timeLeft: '1:00', score: 'Close', points: 3.8, efficiency: 52 },
];

// Add new interface for shot location data
interface ShotLocation {
  x: number;
  y: number;
  made: boolean;
  value: number;
  attempts: number;
}

// Add shot location data
const shotLocations: ShotLocation[] = [
  { x: 250, y: 60, made: true, value: 0.85, attempts: 45 },  // At rim
  { x: 150, y: 120, made: true, value: 0.65, attempts: 32 }, // Left wing three
  { x: 350, y: 120, made: true, value: 0.72, attempts: 38 }, // Right wing three
  { x: 250, y: 400, made: true, value: 0.92, attempts: 65 }, // Paint
  { x: 100, y: 250, made: true, value: 0.45, attempts: 25 }, // Left corner three
  { x: 400, y: 250, made: true, value: 0.48, attempts: 28 }, // Right corner three
  { x: 200, y: 200, made: true, value: 0.52, attempts: 30 }, // Mid-range
  { x: 300, y: 200, made: true, value: 0.54, attempts: 33 }, // Mid-range
];

// Add new interfaces and helper functions for clustering
interface ShotCluster {
  centerX: number;
  centerY: number;
  radius: number;
  shots: ShotLocation[];
  efficiency: number;
}

// Helper functions
function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function createClusters(shots: ShotLocation[], radius: number = 40): ShotCluster[] {
  const clusters: ShotCluster[] = [];
  const processedShots = new Set<ShotLocation>();

  shots.forEach(shot => {
    if (processedShots.has(shot)) return;

    const nearbyShots = shots.filter(s => 
      !processedShots.has(s) && 
      calculateDistance(shot.x, shot.y, s.x, s.y) <= radius
    );

    if (nearbyShots.length > 0) {
      const centerX = nearbyShots.reduce((sum, s) => sum + s.x, 0) / nearbyShots.length;
      const centerY = nearbyShots.reduce((sum, s) => sum + s.y, 0) / nearbyShots.length;
      const totalAttempts = nearbyShots.reduce((sum, s) => sum + s.attempts, 0);
      const weightedEfficiency = nearbyShots.reduce(
        (sum, s) => sum + (s.value * s.attempts), 
        0
      ) / totalAttempts;

      const maxDistance = Math.max(
        ...nearbyShots.map(s => calculateDistance(centerX, centerY, s.x, s.y))
      );

      clusters.push({
        centerX,
        centerY,
        radius: Math.max(maxDistance, 20),
        shots: nearbyShots,
        efficiency: weightedEfficiency
      });

      nearbyShots.forEach(s => processedShots.add(s));
    }
  });

  return clusters;
}

function calculateRollingAverages(games: GameLogEntry[], window: number = 5) {
  return games.map((_, index, array) => {
    if (index < window - 1) return null;
    const windowGames = array.slice(index - window + 1, index + 1);
    return {
      date: array[index].date,
      points: windowGames.reduce((sum, g) => sum + g.points, 0) / window,
      assists: windowGames.reduce((sum, g) => sum + g.assists, 0) / window,
      rebounds: windowGames.reduce((sum, g) => sum + g.rebounds, 0) / window,
    };
  }).filter(Boolean);
}

// Update the heat map section in the component
const shotClusters = createClusters(shotLocations);

export default function PlayerDetailDashboard({ player, onBack, gameLog = [] }: PlayerDetailProps) {
  const recentGames = gameLog.length > 0 ? gameLog : defaultGameLog;
  const rollingAverages = calculateRollingAverages(recentGames);
  const shotClusters = createClusters(shotLocations);

  // Add detailed shot zone data
  const shotZones: ShotZoneStats[] = [
    { zone: "Restricted Area", attempts: 124, made: 82, percentage: 66.1, leagueAvg: 64.2 },
    { zone: "Paint (Non-RA)", attempts: 86, made: 42, percentage: 48.8, leagueAvg: 42.1 },
    { zone: "Mid-Range", attempts: 98, made: 44, percentage: 44.9, leagueAvg: 41.5 },
    { zone: "Corner 3", attempts: 64, made: 28, percentage: 43.8, leagueAvg: 38.2 },
    { zone: "Above Break 3", attempts: 182, made: 72, percentage: 39.6, leagueAvg: 35.8 },
  ];

  // Add situational splits
  const situationalSplits: AdvancedSplits[] = [
    { situation: "Transition", points: 4.2, efficiency: 1.12, frequency: 18.5 },
    { situation: "Pick & Roll Ball Handler", points: 8.4, efficiency: 0.98, frequency: 24.2 },
    { situation: "Spot Up", points: 6.8, efficiency: 1.08, frequency: 22.4 },
    { situation: "Isolation", points: 3.2, efficiency: 0.94, frequency: 12.8 },
    { situation: "Off Screen", points: 4.1, efficiency: 1.04, frequency: 14.6 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="dark:bg-gray-800">
        <Flex justifyContent="between" alignItems="center">
          <Button 
            icon={ArrowLeftIcon} 
            variant="light"
            onClick={onBack}
          >
            Back to Team
          </Button>
          <Badge size="lg">
            {player.position}
          </Badge>
        </Flex>
        <div className="mt-4">
          <Title className="text-2xl font-bold">{player.name}</Title>
          <Text className="text-gray-500 dark:text-gray-400">Season Averages</Text>
        </div>
      </Card>

      {/* Key Stats Overview */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card className="dark:bg-gray-800">
          <Text>Points</Text>
          <Metric className="mt-2">{player.points.toFixed(1)}</Metric>
          <ProgressBar 
            value={player.points / 40} 
            className="mt-2"
            tooltip="Per game average"
          />
        </Card>
        <Card className="dark:bg-gray-800">
          <Text>True Shooting %</Text>
          <Metric className="mt-2">{player.trueShootingPct.toFixed(1)}%</Metric>
          <ProgressBar 
            value={player.trueShootingPct / 100} 
            className="mt-2"
            color="emerald"
          />
        </Card>
        <Card className="dark:bg-gray-800">
          <Text>Usage Rate</Text>
          <Metric className="mt-2">{player.usageRate.toFixed(1)}%</Metric>
          <ProgressBar 
            value={player.usageRate / 40} 
            className="mt-2"
            color="blue"
          />
        </Card>
        <Card className="dark:bg-gray-800">
          <Text>Net Rating</Text>
          <Metric className="mt-2">
            {(player.offensiveRating - player.defensiveRating).toFixed(1)}
          </Metric>
          <ProgressBar 
            value={(player.offensiveRating - player.defensiveRating + 20) / 40} 
            className="mt-2"
            color={player.offensiveRating - player.defensiveRating > 0 ? "emerald" : "red"}
          />
        </Card>
      </Grid>

      {/* Detailed Stats */}
      <TabGroup>
        <TabList>
          <Tab>Performance Trends</Tab>
          <Tab>Shot Profile</Tab>
          <Tab>Advanced Stats</Tab>
          <Tab>Situational</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card className="dark:bg-gray-800">
                <Title>Scoring Trend</Title>
                <AreaChart
                  className="h-72 mt-4"
                  data={recentGames}
                  index="date"
                  categories={["points"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} pts`}
                  showLegend={false}
                />
              </Card>

              <Card className="dark:bg-gray-800">
                <Title>Rolling Averages (5-Game)</Title>
                <AreaChart
                  className="h-72 mt-4"
                  data={rollingAverages}
                  index="date"
                  categories={["points", "assists", "rebounds"]}
                  colors={["blue", "emerald", "amber"]}
                  valueFormatter={(value) => value.toFixed(1)}
                  showLegend={true}
                />
              </Card>

              <Card className="dark:bg-gray-800">
                <Title>Performance by Period</Title>
                <BarChart
                  className="h-72 mt-4"
                  data={performanceSplits.byPeriod}
                  index="period"
                  categories={["points", "efficiency"]}
                  colors={["blue", "emerald"]}
                  valueFormatter={(value) => value.toFixed(1)}
                  stack={false}
                />
              </Card>

              <Card className="dark:bg-gray-800">
                <Title>Situational Performance</Title>
                <BarChart
                  className="h-72 mt-4"
                  data={performanceSplits.byGameType}
                  index="type"
                  categories={["points", "efficiency"]}
                  colors={["violet", "indigo"]}
                  valueFormatter={(value) => value.toFixed(1)}
                  stack={false}
                />
              </Card>
            </Grid>

            {/* Add Game Log Table */}
            <Card className="mt-6 dark:bg-gray-800">
              <Title>Recent Games</Title>
              <Table className="mt-4">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>OPP</TableHeaderCell>
                    <TableHeaderCell>MIN</TableHeaderCell>
                    <TableHeaderCell>PTS</TableHeaderCell>
                    <TableHeaderCell>REB</TableHeaderCell>
                    <TableHeaderCell>AST</TableHeaderCell>
                    <TableHeaderCell>FG</TableHeaderCell>
                    <TableHeaderCell>3P</TableHeaderCell>
                    <TableHeaderCell>+/-</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentGames.map((game) => (
                    <TableRow key={game.date}>
                      <TableCell>{game.date}</TableCell>
                      <TableCell>{game.opponent}</TableCell>
                      <TableCell>{game.minutes}</TableCell>
                      <TableCell>{game.points}</TableCell>
                      <TableCell>{game.rebounds}</TableCell>
                      <TableCell>{game.assists}</TableCell>
                      <TableCell>{`${game.fgm}-${game.fga}`}</TableCell>
                      <TableCell>{`${game.threePm}-${game.threePa}`}</TableCell>
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
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card className="dark:bg-gray-800">
                <Title>Shot Distribution</Title>
                <DonutChart
                  className="mt-6"
                  data={shotChartData}
                  category="attempts"
                  index="zone"
                  valueFormatter={(value) => `${value} shots`}
                  colors={["blue", "cyan", "indigo", "violet", "purple"]}
                />
              </Card>

              <Card className="dark:bg-gray-800">
                <Title>Shot Distance vs Efficiency</Title>
                <ScatterChart
                  className="h-80 mt-4"
                  data={shotDistanceData}
                  category="efficiency"
                  x="distance"
                  y="frequency"
                  size="frequency"
                  colors={["blue"]}
                  valueFormatter={{
                    x: (distance) => `${distance}ft`,
                    y: (value) => `${value}%`,
                    size: (freq) => `${freq}% frequency`
                  }}
                  showLegend={false}
                />
              </Card>

              {/* New Shot Clock Analysis */}
              <Card className="dark:bg-gray-800">
                <Title>Scoring by Shot Clock</Title>
                <LineChart
                  className="h-72 mt-4"
                  data={[
                    { shotClock: "24-22", pps: 1.1, freq: 15 },
                    { shotClock: "21-18", pps: 1.2, freq: 25 },
                    { shotClock: "17-14", pps: 1.15, freq: 30 },
                    { shotClock: "13-10", pps: 1.05, freq: 20 },
                    { shotClock: "9-6", pps: 0.95, freq: 15 },
                    { shotClock: "5-0", pps: 0.85, freq: 10 },
                  ]}
                  index="shotClock"
                  categories={["pps", "freq"]}
                  colors={["emerald", "blue"]}
                  valueFormatter={{
                    pps: (value) => `${value.toFixed(2)} PPS`,
                    freq: (value) => `${value}%`
                  }}
                  showLegend={true}
                />
              </Card>

              {/* Add Shot Zone Breakdown */}
              <Card className="dark:bg-gray-800">
                <Title>Shot Zone Analysis</Title>
                <Table className="mt-4">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Zone</TableHeaderCell>
                      <TableHeaderCell>FG%</TableHeaderCell>
                      <TableHeaderCell>vs League</TableHeaderCell>
                      <TableHeaderCell>Volume</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shotZones.map((zone) => (
                      <TableRow key={zone.zone}>
                        <TableCell>{zone.zone}</TableCell>
                        <TableCell>{zone.percentage.toFixed(1)}%</TableCell>
                        <TableCell>
                          <Badge color={zone.percentage > zone.leagueAvg ? "emerald" : "red"}>
                            {((zone.percentage - zone.leagueAvg) > 0 ? '+' : '')}{(zone.percentage - zone.leagueAvg).toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <ProgressBar 
                            value={zone.attempts / 200}
                            tooltip={`${zone.made}/${zone.attempts} attempts`}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card className="dark:bg-gray-800">
                <Title>Scoring Efficiency</Title>
                <div className="mt-6 space-y-4">
                  {Object.entries(advancedMetrics.scoring).map(([key, value]) => (
                    <div key={key}>
                      <Text>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
                      <ProgressBar 
                        value={value / 100}
                        className="mt-2"
                        color="emerald"
                        tooltip={`${value.toFixed(1)}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="dark:bg-gray-800">
                <Title>Playmaking Metrics</Title>
                <div className="mt-6 space-y-4">
                  {Object.entries(advancedMetrics.playmaking).map(([key, value]) => (
                    <div key={key}>
                      <Text>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
                      <ProgressBar 
                        value={value / 20}
                        className="mt-2"
                        color="blue"
                        tooltip={`${value.toFixed(1)}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="dark:bg-gray-800 col-span-2">
                <Title>Impact Metrics</Title>
                <div className="mt-6 space-y-4">
                  {Object.entries(advancedMetrics.efficiency).map(([key, value]) => (
                    <div key={key}>
                      <Text>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
                      <ProgressBar 
                        value={(value + 20) / 40}
                        className="mt-2"
                        color="violet"
                        tooltip={`${value.toFixed(1)}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Grid>
          </TabPanel>

          {/* New Situational Panel */}
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card className="dark:bg-gray-800">
                <Title>Play Type Breakdown</Title>
                <BarChart
                  className="h-80 mt-4"
                  data={situationalSplits}
                  index="situation"
                  categories={["points"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value.toFixed(1)} PPG`}
                  showLegend={false}
                />
              </Card>

              <Card className="dark:bg-gray-800">
                <Title>Efficiency by Play Type</Title>
                <Table className="mt-4">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Play Type</TableHeaderCell>
                      <TableHeaderCell>PPP</TableHeaderCell>
                      <TableHeaderCell>Freq%</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {situationalSplits.map((split) => (
                      <TableRow key={split.situation}>
                        <TableCell>{split.situation}</TableCell>
                        <TableCell>
                          <Badge color={split.efficiency > 1.0 ? "emerald" : "gray"}>
                            {split.efficiency.toFixed(2)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Text>{split.frequency.toFixed(1)}%</Text>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
          </TabPanel>

          {/* Add new Defensive Impact Panel */}
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
              <Card className="dark:bg-gray-800">
                <Title>Defensive Matchups</Title>
                <BarChart
                  className="h-80 mt-4"
                  data={defenseMatchupData}
                  index="defender"
                  categories={["stopPct"]}
                  colors={["red"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={false}
                />
              </Card>

              <Card className="dark:bg-gray-800">
                <Title>Points Allowed by Position</Title>
                <DonutChart
                  className="mt-6"
                  data={defenseMatchupData}
                  category="possessions"
                  index="defender"
                  valueFormatter={(value) => `${value} poss.`}
                  colors={["red", "orange", "yellow"]}
                />
              </Card>

              {/* New Clutch Performance Chart */}
              <Card className="dark:bg-gray-800 col-span-2">
                <Title>Clutch Performance</Title>
                <LineChart
                  className="h-72 mt-4"
                  data={clutchPerformance}
                  index="timeLeft"
                  categories={["points", "efficiency"]}
                  colors={["violet", "indigo"]}
                  valueFormatter={{
                    points: (value) => `${value.toFixed(1)} pts`,
                    efficiency: (value) => `${value}%`
                  }}
                  showLegend={true}
                  curveType="monotone"
                />
              </Card>
            </Grid>
          </TabPanel>

          {/* Add Heat Map for Shot Locations */}
          <Card className="dark:bg-gray-800 col-span-2">
            <div className="flex justify-between items-center">
              <Title>Shot Location Heat Map</Title>
              <Badge size="sm">
                Shooting Efficiency by Location
              </Badge>
            </div>
            <div className="relative h-[600px] mt-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 500 470" className="w-full h-full">
                  {/* Court outline */}
                  <rect 
                    x="0" 
                    y="0" 
                    width="500" 
                    height="470" 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-gray-300 dark:text-gray-700" 
                    strokeWidth="2"
                  />

                  {/* Three point line */}
                  <path
                    d="M 100,250 A 150,150 0 0,1 400,250"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-300 dark:text-gray-700"
                    strokeWidth="2"
                  />

                  {/* Free throw circle */}
                  <circle 
                    cx="250" 
                    cy="150" 
                    r="60" 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-gray-300 dark:text-gray-700" 
                    strokeWidth="2"
                  />

                  {/* Paint area */}
                  <rect
                    x="175"
                    y="0"
                    width="150"
                    height="190"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-300 dark:text-gray-700"
                    strokeWidth="2"
                  />

                  {/* Baseline */}
                  <line
                    x1="0"
                    y1="0"
                    x2="500"
                    y2="0"
                    stroke="currentColor"
                    className="text-gray-300 dark:text-gray-700"
                    strokeWidth="2"
                  />

                  {/* Rim */}
                  <circle 
                    cx="250" 
                    cy="60" 
                    r="15" 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-gray-300 dark:text-gray-700" 
                    strokeWidth="2"
                  />

                  {/* Heat map gradient definitions */}
                  <defs>
                    <radialGradient id="shotGradient">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Shot clusters */}
                  <g className="shot-clusters">
                    {shotClusters.map((cluster, i) => (
                      <g key={i} className="cluster-group">
                        {/* Cluster background */}
                        <circle
                          cx={cluster.centerX}
                          cy={cluster.centerY}
                          r={cluster.radius}
                          className={`
                            opacity-20 transition-all duration-300
                            ${cluster.efficiency >= 0.6 
                              ? 'fill-emerald-500' 
                              : cluster.efficiency >= 0.45 
                                ? 'fill-yellow-500' 
                                : 'fill-red-500'}
                          `}
                        />

                        {/* Cluster border */}
                        <circle
                          cx={cluster.centerX}
                          cy={cluster.centerY}
                          r={cluster.radius}
                          className={`
                            fill-none stroke-current transition-all duration-300
                            ${cluster.efficiency >= 0.6 
                              ? 'text-emerald-500' 
                              : cluster.efficiency >= 0.45 
                                ? 'text-yellow-500' 
                                : 'text-red-500'}
                          `}
                          strokeWidth="1"
                          strokeDasharray="4 2"
                        />

                        {/* Efficiency label */}
                        <text
                          x={cluster.centerX}
                          y={cluster.centerY}
                          textAnchor="middle"
                          dy="-0.5em"
                          className="text-xs fill-gray-700 dark:fill-gray-300 font-semibold"
                        >
                          {(cluster.efficiency * 100).toFixed(1)}%
                        </text>

                        {/* Attempts label */}
                        <text
                          x={cluster.centerX}
                          y={cluster.centerY}
                          textAnchor="middle"
                          dy="1em"
                          className="text-xs fill-gray-600 dark:fill-gray-400"
                        >
                          {cluster.shots.reduce((sum, s) => sum + s.attempts, 0)} shots
                        </text>

                        {/* Individual shot markers */}
                        {cluster.shots.map((shot, j) => (
                          <circle
                            key={j}
                            cx={shot.x}
                            cy={shot.y}
                            r="2"
                            className={`
                              ${shot.made ? 'fill-green-500' : 'fill-red-500'}
                              opacity-50
                            `}
                          />
                        ))}
                      </g>
                    ))}
                  </g>

                  {/* Add interaction hints */}
                  <g className="interaction-hints">
                    {shotClusters.map((cluster, i) => (
                      <g 
                        key={i}
                        className="cluster-interaction-area"
                        onMouseEnter={() => {
                          // Add hover effects here if needed
                        }}
                      >
                        <circle
                          cx={cluster.centerX}
                          cy={cluster.centerY}
                          r={cluster.radius}
                          className="fill-transparent cursor-pointer"
                          onClick={() => {
                            // Add click handler if needed
                          }}
                        />
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow p-3">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Shot Clusters
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-20 mr-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">High Efficiency (≥60%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-20 mr-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Medium (45-59%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-20 mr-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Low Efficiency (<45%)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 opacity-50 mr-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Made Shot</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 opacity-50 mr-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Missed Shot</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 