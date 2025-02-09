import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

interface TeamStats {
  quarter: number;
  homeScore: number;
  awayScore: number;
}

const gameData: TeamStats[] = [
  { quarter: 1, homeScore: 25, awayScore: 22 },
  { quarter: 2, homeScore: 48, awayScore: 45 },
  { quarter: 3, homeScore: 72, awayScore: 68 },
  { quarter: 4, homeScore: 98, awayScore: 92 },
];

const TeamDashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>NBA Game Stats</h1>
      
      {/* Score Progression Chart */}
      <div className="chart-container">
        <h2>Score Progression</h2>
        <LineChart width={600} height={300} data={gameData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" label="Quarter" />
          <YAxis label="Score" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="homeScore" stroke="#8884d8" name="Home" />
          <Line type="monotone" dataKey="awayScore" stroke="#82ca9d" name="Away" />
        </LineChart>
      </div>

      {/* Current Score Display */}
      <div className="score-display">
        <div className="team home">
          <h3>Home</h3>
          <p className="score">{gameData[gameData.length - 1].homeScore}</p>
        </div>
        <div className="team away">
          <h3>Away</h3>
          <p className="score">{gameData[gameData.length - 1].awayScore}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard; 