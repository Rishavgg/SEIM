import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from "../components/Navbar/Navbar";
import Live from "../components/Live/Live";
import Plot from "../components/plots/Plot";
import TimePie from "../components/Time/Time";
import HttpVerbsPie from "../components/Pie/Pie";

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

interface HomeProps {
    logs: LogData[];
    error: string | null;
}

const Home: React.FC<HomeProps> = ({ logs, error }) => {
    useEffect(() => {
        const socket = io('http://localhost:3002');

        socket.on('fileContents', (fileContents: string) => {
            
            // Assuming the file contents received are in JSON format
            try {
                console.log('Received file contents:', fileContents);
            } catch (error) {
                console.log('Error parsing file contents');
            }
        });

        socket.on('fileError', (errorMessage: string) => {
            console.log('Received file error:', errorMessage);
            console.log(errorMessage);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <Live logs={logs} error={error} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Plot logs={logs} error={error} />
                    <TimePie logs={logs} error={error} />
                    <HttpVerbsPie logs={logs} error={error} />
                </div>
            </div>
        </>
    );
}

export default Home;
