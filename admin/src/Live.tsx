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
  return (
    <div>
      <h2>Live API Data</h2>
      {props.error ? (
        <p>Error fetching logs: {props.error}</p>
      ) : (
        <ul>
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
