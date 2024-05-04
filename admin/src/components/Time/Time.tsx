import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

interface LogData {
  _id: string;
  remote: string;
  host: string;
  user: string;
  method: string;
  path: string;
  code: string;
  size: string;
  referer: string;
  agent: string;
  time: string;
}

interface TimePieProps {
  logs: LogData[];
  error: string | null;
}

const TimePie: React.FC<TimePieProps> = ({ logs, error }) => {
  // Calculate counts for each time
  const timeCounts: { [key: string]: number } = {};
  logs.forEach(log => {
    // Extract hour from time and round it to the nearest hour
    const date = new Date(log.time);
    const hour = date.getHours();
    const timeInterval = `${hour}:00`; // Format as HH:00
    timeCounts[timeInterval] = (timeCounts[timeInterval] || 0) + 1;
  });

  // Define colors for each time interval
  const timeColors: { [key: string]: string } = {
    '0:00': '#8884d8',
    '1:00': '#82ca9d',
    '2:00': '#ffc658',
    '3:00': '#ff7300',
    '4:00': '#0088FE',
    '5:00': '#00C49F',
    '6:00': '#FFBB28',
    '7:00': '#FF8042',
    '8:00': '#5B6C5D',
    '9:00': '#FDC500',
    '10:00': '#F98400',
    '11:00': '#588C73',
    '12:00': '#FF6B6B',
    '13:00': '#FFE66D',
    '14:00': '#B5EAD7',
    '15:00': '#B5EAD7',
    '16:00': '#D4A5A5',
    '17:00': '#D4A5A5',
    '18:00': '#92A8D1',
    '19:00': '#92A8D1',
    '20:00': '#C8C8A9',
    '21:00': '#C8C8A9',
    '22:00': '#E1BC29',
    '23:00': '#E1BC29'
  };

  // Convert data to an array of objects with colors
  const data = Object.keys(timeCounts).map(interval => ({
    time: interval,
    count: timeCounts[interval],
    fill: timeColors[interval] || '#000000' // Default color black if not defined
  }));

  return (
    <div className="pdf-element">
      {error && <div>Error: {error}</div>}
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="count" cx="50%" cy="50%" outerRadius={80} label />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default TimePie;
