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

const User: React.FC<PlotProps> = ({ logs, error }) => {
  // Extract browser names from user agent strings
  const extractBrowserNames = (agent: string): string => {
    // Example regex to extract browser names (modify as needed)
    const regex = /(Chrome|Firefox|Safari|Opera|Edge|Internet Explorer)[\s/]([\d.]+)/;
    const match = agent.match(regex);
    return match ? match[1] : "Unknown"; // Default to "Unknown" if no match found
  };

  // Count occurrences of each browser name
  const countBrowserNames = (logs: LogData[]): { [key: string]: number } => {
    const counts: { [key: string]: number } = {};
    logs.forEach(log => {
      const browserName = extractBrowserNames(log.agent);
      counts[browserName] = (counts[browserName] || 0) + 1;
    });
    return counts;
  };

  // Prepare data for plotting
  const prepareData = (counts: { [key: string]: number }): { name: string, count: number }[] => {
    return Object.keys(counts).map(name => ({ name, count: counts[name] }));
  };

  const browserCounts = countBrowserNames(logs);
  const data = prepareData(browserCounts);

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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default User;
