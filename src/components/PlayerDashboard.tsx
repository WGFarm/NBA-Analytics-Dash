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