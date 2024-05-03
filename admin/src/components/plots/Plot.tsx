import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

interface PlotProps {
  logs: LogData[];
  error: string | null;
}

const Plot: React.FC<PlotProps> = ({ logs, error }) => {
  // Convert ISO time format to standard time format (HH:MM:SS)
  const formatTime = (isoTime: string): string => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Assuming 'time' field represents the time data for X-axis and 'code' field represents the data for Y-axis
  // Modify accordingly based on your data structure
  const data = logs.map(log => ({
    time: formatTime(log.time),
    code: parseInt(log.code) // Assuming 'code' is a string, convert it to number
  }));

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="code" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default Plot;
