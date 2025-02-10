'use client';

import { useState } from 'react';
import { Card, Title } from "@tremor/react";
import PlayerDetailDashboard from './PlayerDetailDashboard';

export interface PlayerStats {
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
  lastFiveGames: { date: string; opponent: string; points: number; rebounds: number; assists: number; efficiency: number; plusMinus: number }[];
  scoringByQuarter: { quarter: string; points: number; efficiency: number }[];
  playTypes: { type: string; frequency: number; ppp: number; percentile: number }[];
  shotZones: { zone: string; attempts: number; made: number; percentage: number; leagueAvg: number }[];
}

export default function PlayerDashboard() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  const samplePlayer: PlayerStats = {
    name: "John Doe",
    position: "PG",
    points: 25,
    rebounds: 5,
    assists: 8,
    trueShootingPct: 58.5,
    effectiveFgPct: 54.2,
    usageRate: 24.5,
    assistPct: 28.4,
    reboundPct: 12.5,
    offRating: 114.2,
    defRating: 108.5,
    winShares: 6.8,
    lastFiveGames: [
      { date: "2024-03-10", opponent: "LAL", points: 28, rebounds: 6, assists: 8, efficiency: 32, plusMinus: 12 },
      { date: "2024-03-08", opponent: "GSW", points: 25, rebounds: 5, assists: 7, efficiency: 28, plusMinus: -5 },
      { date: "2024-03-06", opponent: "BOS", points: 31, rebounds: 4, assists: 9, efficiency: 35, plusMinus: 8 },
      { date: "2024-03-04", opponent: "MIA", points: 22, rebounds: 7, assists: 6, efficiency: 26, plusMinus: 4 },
      { date: "2024-03-02", opponent: "PHX", points: 27, rebounds: 5, assists: 8, efficiency: 30, plusMinus: 6 },
    ],
    scoringByQuarter: [
      { quarter: "1st", points: 7.2, efficiency: 54.5 },
      { quarter: "2nd", points: 6.8, efficiency: 52.8 },
      { quarter: "3rd", points: 8.4, efficiency: 58.2 },
      { quarter: "4th", points: 7.6, efficiency: 55.4 },
    ],
    playTypes: [
      { type: "P&R Ball Handler", frequency: 28, ppp: 1.12, percentile: 82 },
      { type: "Spot Up", frequency: 22, ppp: 1.08, percentile: 75 },
      { type: "Transition", frequency: 18, ppp: 1.24, percentile: 88 },
      { type: "Isolation", frequency: 15, ppp: 0.95, percentile: 65 },
      { type: "Off Screen", frequency: 12, ppp: 1.02, percentile: 70 },
    ],
    shotZones: [
      { zone: "Restricted Area", attempts: 124, made: 82, percentage: 66.1, leagueAvg: 64.2 },
      { zone: "Paint", attempts: 86, made: 42, percentage: 48.8, leagueAvg: 42.1 },
      { zone: "Mid-Range", attempts: 98, made: 44, percentage: 44.9, leagueAvg: 41.5 },
      { zone: "Corner 3", attempts: 64, made: 28, percentage: 43.8, leagueAvg: 38.2 },
      { zone: "Above Break 3", attempts: 182, made: 72, percentage: 39.6, leagueAvg: 35.8 },
    ],
  };

  if (selectedPlayer) {
    return (
      <PlayerDetailDashboard
        player={selectedPlayer}
        onBack={() => setSelectedPlayer(null)}
      />
    );
  }

  return (
    <Card className="cursor-pointer" onClick={() => setSelectedPlayer(samplePlayer)}>
      <Title>Click to view player details</Title>
    </Card>
  );
} 