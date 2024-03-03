import { useEffect, useRef } from "react";
import './Live.css'; 

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

interface LiveProps {
  logs: LogData[];
  error?: string | null;
}

export default function Live(props: LiveProps) {
  const logsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (logsRef.current) {
      const logs = logsRef.current.children;

      for (let i = 0; i < logs.length; i++) {
        const logElement = logs[i] as HTMLElement;
        logElement.style.animation = `fadeIn 0.3s ease ${i * 0.3}s forwards`;
      }
    }
  }, [props.logs]);
  return (
    <div>
      <h2>Live Log View</h2>
      {props.error ? (
        <p>Error fetching logs: {props.error}</p>
      ) : (
        <ul ref={logsRef} className="logs-list">
          {props.logs.map((log) => (
            <li key={log._id}>
              <strong>Path:</strong> {log.path} <strong>Code:</strong> {log.code} <strong>Remote:</strong> {log.remote} <strong>Host:</strong> {log.host} <strong>Method:</strong> {log.method}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
