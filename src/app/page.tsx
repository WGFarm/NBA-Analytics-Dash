'use client';

import { Card, Title, BarChart } from "@tremor/react";

export default function Home() {
  // Example data - replace with real NBA API data
  const chartdata = [
    {
      team: "Lakers",
      "Points Per Game": 115,
    },
    {
      team: "Warriors",
      "Points Per Game": 118,
    },
    {
      team: "Celtics",
      "Points Per Game": 117,
    },
    {
      team: "Bucks",
      "Points Per Game": 120,
    },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>NBA Team Statistics</Title>
      <Card className="mt-6">
        <Title>Points Per Game by Team</Title>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="team"
          categories={["Points Per Game"]}
          colors={["blue"]}
          yAxisWidth={48}
        />
      </Card>
    </main>
  );
} 