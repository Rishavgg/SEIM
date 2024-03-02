import React, { useEffect, useState } from 'react';

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

const ApiFetcherComponent: React.FC = () => {
  const [logs, setLogs] = useState<LogData[]>([]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch('http://localhost:3001/logs');
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    const intervalId = setInterval(fetchApiData, 0);

    return () => clearInterval(intervalId)
  }, []);

  return (
    <div>
      <h2>Live API Data</h2>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            <strong>Path:</strong> {log.path} <strong>Code:</strong> {log.code} <strong>Remote:</strong> {log.remote} <strong>Host:</strong> {log.host}<strong>Method:</strong> {log.method}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiFetcherComponent;
