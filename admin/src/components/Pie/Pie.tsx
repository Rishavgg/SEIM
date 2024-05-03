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

interface HttpVerbsPieProps {
  logs: LogData[];
  error: string | null;
}

const HttpVerbsPie: React.FC<HttpVerbsPieProps> = ({ logs, error }) => {
  // Define colors for each HTTP verb
  const verbColors: { [key: string]: string } = {
    GET: '#8884d8',
    POST: '#82ca9d',
    PUT: '#ffc658',
    DELETE: '#ff7300',
    // Add more verbs and colors as needed
  };

  // Calculate counts for each HTTP verb
  const httpVerbs: { [key: string]: number } = {};
  logs.forEach(log => {
    const verb = log.method;
    httpVerbs[verb] = (httpVerbs[verb] || 0) + 1;
  });

  // Convert data to an array of objects with definite colors
  const data = Object.keys(httpVerbs).map(verb => ({
    name: verb,
    value: httpVerbs[verb],
    fill: verbColors[verb] || '#000000' // Default color black if not defined
  }));

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default HttpVerbsPie;
