import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';

// Simple data structure
interface GameStats {
  quarter: number;
  homeScore: number;
  awayScore: number;
  homePossessions: number;
  awayPossessions: number;
}

const gameData: GameStats[] = [
  { quarter: 1, homeScore: 25, awayScore: 22, homePossessions: 24, awayPossessions: 23 },
  { quarter: 2, homeScore: 48, awayScore: 45, homePossessions: 46, awayPossessions: 44 },
  { quarter: 3, homeScore: 72, awayScore: 68, homePossessions: 70, awayPossessions: 67 },
  { quarter: 4, homeScore: 98, awayScore: 92, homePossessions: 94, awayPossessions: 91 }
];

const shotData = [
  { range: '0-3ft', home: 35, away: 30 },
  { range: '3-10ft', home: 15, away: 18 },
  { range: '10-16ft', home: 12, away: 15 },
  { range: '16-3PT', home: 18, away: 20 },
  { range: '3PT', home: 20, away: 17 }
];

const TeamDashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>NBA Game Analytics</h1>

      {/* Score Display */}
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

      {/* Score Progression Chart */}
      <div className="chart-container">
        <h2>Score Progression</h2>
        <LineChart width={600} height={300} data={gameData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" label={{ value: 'Quarter', position: 'bottom' }} />
          <YAxis label={{ value: 'Score', angle: -90, position: 'left' }} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="homeScore" 
            stroke="#8884d8" 
            name="Home" 
          />
          <Line 
            type="monotone" 
            dataKey="awayScore" 
            stroke="#82ca9d" 
            name="Away" 
          />
        </LineChart>
      </div>

      {/* Shot Distribution Chart */}
      <div className="chart-container">
        <h2>Shot Distribution</h2>
        <BarChart width={600} height={300} data={shotData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="home" fill="#8884d8" name="Home" />
          <Bar dataKey="away" fill="#82ca9d" name="Away" />
        </BarChart>
      </div>
    </div>
  );
};

export default TeamDashboard;
