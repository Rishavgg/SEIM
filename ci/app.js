import express from "express";
import fs from "fs";
import helmet from "helmet";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from 'node:http';

const port = 3002;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://admin.localhost",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const FILE_PATH = "/var/www/app/output.txt";

const readAndCheckFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const lines = data.split('\n');
            const firstLineWords = lines[0].trim().split(' ');
            const lastWord = firstLineWords[firstLineWords.length - 1];
            if (lastWord === 'suspicious') {
                resolve(lines.join('\n'));
            } else {
                return 
            }
        });
    });
};

let isFileContentSent = false;

const sendFileContents = () => {
    if (!isFileContentSent) {
        readAndCheckFile(FILE_PATH)
            .then((fileContents) => {
                if (!isFileContentSent) {
                    io.emit('fileContents', fileContents);
                    isFileContentSent = true; // Set flag to true after sending content
                }
            })
            .catch((error) => {
                io.emit('fileError', error);
            });
    }
};
// Watch file for changes
fs.watch(FILE_PATH, (event, filename) => {
    if (event === 'change') {
        console.log(`File ${filename} has been changed.`);
        sendFileContents();
    }
});

app.use(helmet());
app.use(cors());

io.on('connection', (socket) => {
    console.log('Client connected');
    sendFileContents();

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on ${port}`);
});
