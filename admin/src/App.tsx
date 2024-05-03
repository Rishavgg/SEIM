import HttpVerbsPie from "./components/Pie/Pie";
import Live from "./components/Live/Live"
import Plot from "./components/plots/Plot";
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import TimePie from "./components/Time/Time";
import Navbar from "./components/Navbar/Navbar";

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

export default function App() {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []); 

  useEffect(() => {
    if (!socket) return;

    socket.on('logs', handleLogsUpdate);
    socket.on('logsError', (errorData: { error: string }) => {
      setError(errorData.error);
    });

    socket.emit('getLogs');

    return () => {
      socket.off('logs', handleLogsUpdate);
      socket.off('logsError');
    };
  }, [logs,error,socket]);

  const handleLogsUpdate = (data: LogData[]) => {
    setLogs([...data]);
    setError(null);
  };
  
  return (
    <>
      <Navbar />
      <div>
        <Live logs={logs} error={error} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Plot logs={logs} error={error} />
          <TimePie logs={logs} error={error} />
          <HttpVerbsPie logs={logs} error={error} />
        </div>
      </div>
    </>
  )
}
