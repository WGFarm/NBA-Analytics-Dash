'use client';

import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Select,
  SelectItem,
  ProgressBar,
} from "@tremor/react";
import { useState } from 'react';
import StatTooltip from './StatTooltip';
import PlayerDetailDashboard from './PlayerDetailDashboard';

interface PlayerStats {
  name: string;
  position: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fgm: number;
  fga: number;
  threePm: number;
  threePa: number;
  ftm: number;
  fta: number;
  plusMinus: number;
  trueShootingPct: number;
  effectiveFgPct: number;
  usageRate: number;
  assistPct: number;
  reboundPct: number;
  defensiveRating: number;
  offensiveRating: number;
}

const statExplanations = {
  traditional: {
    minutes: "Total minutes played in the game",
    points: "Total points scored",
    rebounds: "Total rebounds (offensive + defensive)",
    assists: "Passes that lead directly to field goals",
    steals: "Possessions gained from opponents",
    blocks: "Opponent shots blocked",
    turnovers: "Possessions lost to opponents",
    plusMinus: "Point differential while player is on court",
  },
  shooting: {
    fgm: "Field Goals Made - Successful shots from the field",
    fga: "Field Goals Attempted - Total shots from the field",
    efg: "Effective Field Goal % - Field goal % adjusted for 3-pointers being worth more",
    threePm: "Three-Pointers Made - Successful 3-point shots",
    threePa: "Three-Pointers Attempted - Total 3-point shots",
    threePct: "Three-Point % - Success rate on 3-point shots",
    ftm: "Free Throws Made - Successful free throws",
    fta: "Free Throws Attempted - Total free throws",
    ts: "True Shooting % - Shooting efficiency including all shot types",
  },
  advanced: {
    usg: "Usage Rate - Percentage of team plays used by player while on court",
    astPct: "Assist % - Percentage of teammate field goals assisted by player",
    rebPct: "Rebound % - Percentage of available rebounds grabbed by player",
    tsPct: "True Shooting % - Points per shooting possession",
    efgPct: "Effective FG % - FG% adjusted for 3-pointers",
    astToRatio: "Assist to Turnover Ratio - Assists divided by turnovers",
    ptsPerPoss: "Points Per Possession - Points scored per possession used",
  },
  impact: {
    offRtg: "Offensive Rating - Points scored per 100 possessions",
    defRtg: "Defensive Rating - Points allowed per 100 possessions",
    netRtg: "Net Rating - Difference between offensive and defensive rating",
    plusMinus: "Plus/Minus - Team point differential with player on court",
    floorImpact: "Floor Impact - Overall effect on team performance",
  },
};

const getEfficiencyContext = (value: number, type: 'efg' | 'ts') => {
  if (type === 'efg') {
    if (value >= 60) return "Elite";
    if (value >= 55) return "Very Good";
    if (value >= 50) return "League Average";
    return "Below Average";
  }
  if (value >= 65) return "Elite";
  if (value >= 60) return "Very Good";
  if (value >= 55) return "League Average";
  return "Below Average";
};

const getRatingContext = (value: number, type: 'offensive' | 'defensive') => {
  if (type === 'offensive') {
    if (value >= 115) return "Elite Offense";
    if (value >= 110) return "Good Offense";
    if (value >= 105) return "Average Offense";
    return "Poor Offense";
  }
  if (value <= 105) return "Elite Defense";
  if (value <= 110) return "Good Defense";
  if (value <= 115) return "Average Defense";
  return "Poor Defense";
};

export default function PlayerDashboard() {
  const [selectedTeam, setSelectedTeam] = useState<string>("Warriors");
  const [sortField, setSortField] = useState<keyof PlayerStats>("minutes");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  // Example player data
  const warriorsPlayers: PlayerStats[] = [
    {
      name: "Stephen Curry",
      position: "PG",
      minutes: 34,
      points: 32,
      rebounds: 6,
      assists: 8,
      steals: 2,
      blocks: 0,
      turnovers: 3,
      fgm: 11,
      fga: 21,
      threePm: 6,
      threePa: 12,
      ftm: 4,
      fta: 4,
      plusMinus: 15,
      trueShootingPct: 68.5,
      effectiveFgPct: 66.7,
      usageRate: 32.5,
      assistPct: 28.4,
      reboundPct: 8.5,
      defensiveRating: 108.2,
      offensiveRating: 118.5,
    },
    // Add more players...
  ];

  const lakersPlayers: PlayerStats[] = [
    {
      name: "LeBron James",
      position: "SF",
      minutes: 36,
      points: 28,
      rebounds: 8,
      assists: 11,
      steals: 1,
      blocks: 1,
      turnovers: 4,
      fgm: 10,
      fga: 18,
      threePm: 2,
      threePa: 6,
      ftm: 6,
      fta: 8,
      plusMinus: 12,
      trueShootingPct: 65.2,
      effectiveFgPct: 61.1,
      usageRate: 31.8,
      assistPct: 42.5,
      reboundPct: 12.3,
      defensiveRating: 105.8,
      offensiveRating: 115.2,
    },
    // Add more players...
  ];

  const players = selectedTeam === "Warriors" ? warriorsPlayers : lakersPlayers;

  const sortedPlayers = [...players].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === 'desc' ? 
      (bValue as number) - (aValue as number) : 
      (aValue as number) - (bValue as number);
  });

  const handleSort = (field: keyof PlayerStats) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handlePlayerClick = (player: PlayerStats) => {
    setSelectedPlayer(player);
  };

  return (
    <Card className="dark:bg-gray-800">
      {selectedPlayer ? (
        <PlayerDetailDashboard 
          player={selectedPlayer}
          onBack={() => setSelectedPlayer(null)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Title>Player Advanced Metrics</Title>
            <Select
              value={selectedTeam}
              onValueChange={setSelectedTeam}
              className="w-40"
            >
              <SelectItem value="Warriors">Warriors</SelectItem>
              <SelectItem value="Lakers">Lakers</SelectItem>
            </Select>
          </div>

          <TabGroup>
            <TabList>
              <Tab>Traditional Stats</Tab>
              <Tab>Shooting</Tab>
              <Tab>Advanced Metrics</Tab>
              <Tab>Impact Stats</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Player</TableHeaderCell>
                      <TableHeaderCell>
                        Pos
                        <StatTooltip explanation="Player's primary position" />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('minutes')}
                      >
                        MIN
                        <StatTooltip 
                          metric="Minutes"
                          explanation={statExplanations.traditional.minutes} 
                        />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('points')}
                      >
                        PTS
                        <StatTooltip 
                          metric="Points"
                          explanation={statExplanations.traditional.points} 
                        />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('rebounds')}
                      >
                        REB
                        <StatTooltip explanation={statExplanations.traditional.rebounds} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('assists')}
                      >
                        AST
                        <StatTooltip explanation={statExplanations.traditional.assists} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('steals')}
                      >
                        STL
                        <StatTooltip explanation={statExplanations.traditional.steals} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('blocks')}
                      >
                        BLK
                        <StatTooltip explanation={statExplanations.traditional.blocks} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('turnovers')}
                      >
                        TO
                        <StatTooltip explanation={statExplanations.traditional.turnovers} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('plusMinus')}
                      >
                        +/-
                        <StatTooltip explanation={statExplanations.traditional.plusMinus} />
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedPlayers.map((player) => (
                      <TableRow 
                        key={player.name}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => handlePlayerClick(player)}
                      >
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell>{player.minutes}</TableCell>
                        <TableCell>{player.points}</TableCell>
                        <TableCell>{player.rebounds}</TableCell>
                        <TableCell>{player.assists}</TableCell>
                        <TableCell>{player.steals}</TableCell>
                        <TableCell>{player.blocks}</TableCell>
                        <TableCell>{player.turnovers}</TableCell>
                        <TableCell>
                          <Badge color={player.plusMinus > 0 ? "emerald" : "red"}>
                            {player.plusMinus > 0 ? '+' : ''}{player.plusMinus}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>

              <TabPanel>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Player</TableHeaderCell>
                      <TableHeaderCell>
                        FGM
                        <StatTooltip explanation={statExplanations.shooting.fgm} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        FGA
                        <StatTooltip explanation={statExplanations.shooting.fga} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('effectiveFgPct')}
                      >
                        eFG%
                        <StatTooltip explanation={statExplanations.shooting.efg} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        3PM
                        <StatTooltip explanation={statExplanations.shooting.threePm} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        3PA
                        <StatTooltip explanation={statExplanations.shooting.threePa} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        3P%
                        <StatTooltip explanation={statExplanations.shooting.threePct} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        FTM
                        <StatTooltip explanation={statExplanations.shooting.ftm} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        FTA
                        <StatTooltip explanation={statExplanations.shooting.fta} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('trueShootingPct')}
                      >
                        TS%
                        <StatTooltip explanation={statExplanations.shooting.ts} />
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedPlayers.map((player) => (
                      <TableRow 
                        key={player.name}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => handlePlayerClick(player)}
                      >
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.fgm}</TableCell>
                        <TableCell>{player.fga}</TableCell>
                        <TableCell>
                          <Badge 
                            color={player.effectiveFgPct >= 55 ? "emerald" : "gray"}
                            tooltip={getEfficiencyContext(player.effectiveFgPct, 'efg')}
                          >
                            {player.effectiveFgPct.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>{player.threePm}</TableCell>
                        <TableCell>{player.threePa}</TableCell>
                        <TableCell>
                          {((player.threePm / player.threePa) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell>{player.ftm}</TableCell>
                        <TableCell>{player.fta}</TableCell>
                        <TableCell>
                          <Badge color={player.trueShootingPct >= 60 ? "emerald" : "gray"}>
                            {player.trueShootingPct.toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>

              <TabPanel>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Player</TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('usageRate')}
                      >
                        USG%
                        <StatTooltip 
                          metric="Usage Rate"
                          explanation={statExplanations.advanced.usg} 
                        />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('assistPct')}
                      >
                        AST%
                        <StatTooltip explanation={statExplanations.advanced.astPct} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('reboundPct')}
                      >
                        REB%
                        <StatTooltip explanation={statExplanations.advanced.rebPct} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('trueShootingPct')}
                      >
                        TS%
                        <StatTooltip explanation={statExplanations.advanced.tsPct} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('effectiveFgPct')}
                      >
                        eFG%
                        <StatTooltip explanation={statExplanations.advanced.efgPct} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        AST/TO
                        <StatTooltip explanation={statExplanations.advanced.astToRatio} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        PTS/Poss
                        <StatTooltip explanation={statExplanations.advanced.ptsPerPoss} />
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedPlayers.map((player) => (
                      <TableRow 
                        key={player.name}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => handlePlayerClick(player)}
                      >
                        <TableCell>{player.name}</TableCell>
                        <TableCell>
                          <Badge color={player.usageRate >= 25 ? "blue" : "gray"}>
                            {player.usageRate.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>{player.assistPct.toFixed(1)}%</TableCell>
                        <TableCell>{player.reboundPct.toFixed(1)}%</TableCell>
                        <TableCell>{player.trueShootingPct.toFixed(1)}%</TableCell>
                        <TableCell>{player.effectiveFgPct.toFixed(1)}%</TableCell>
                        <TableCell>
                          {(player.assists / Math.max(player.turnovers, 1)).toFixed(1)}
                        </TableCell>
                        <TableCell>
                          {(player.points / (player.fga + 0.44 * player.fta)).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>

              <TabPanel>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Player</TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('offensiveRating')}
                      >
                        Off Rtg
                        <StatTooltip 
                          metric="Offensive Rating"
                          explanation={statExplanations.impact.offRtg} 
                        />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('defensiveRating')}
                      >
                        Def Rtg
                        <StatTooltip explanation={statExplanations.impact.defRtg} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        Net Rtg
                        <StatTooltip explanation={statExplanations.impact.netRtg} />
                      </TableHeaderCell>
                      <TableHeaderCell 
                        className="cursor-pointer"
                        onClick={() => handleSort('plusMinus')}
                      >
                        +/-
                        <StatTooltip explanation={statExplanations.impact.plusMinus} />
                      </TableHeaderCell>
                      <TableHeaderCell>
                        Floor Impact
                        <StatTooltip explanation={statExplanations.impact.floorImpact} />
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedPlayers.map((player) => (
                      <TableRow 
                        key={player.name}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => handlePlayerClick(player)}
                      >
                        <TableCell>{player.name}</TableCell>
                        <TableCell>
                          <Badge color={player.offensiveRating >= 110 ? "emerald" : "gray"}>
                            {player.offensiveRating.toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge color={player.defensiveRating <= 105 ? "emerald" : "gray"}>
                            {player.defensiveRating.toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            color={(player.offensiveRating - player.defensiveRating) > 0 ? "emerald" : "red"}
                          >
                            {(player.offensiveRating - player.defensiveRating).toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge color={player.plusMinus > 0 ? "emerald" : "red"}>
                            {player.plusMinus > 0 ? '+' : ''}{player.plusMinus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <ProgressBar
                            value={(player.offensiveRating - 100) / 30}
                            color={player.offensiveRating >= 110 ? "emerald" : "gray"}
                            tooltip={`Impact Score: ${((player.offensiveRating - 100) / 30 * 100).toFixed(1)}
                              ${getRatingContext(player.offensiveRating, 'offensive')}`}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </>
      )}
    </Card>
  );
} 