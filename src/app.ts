import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws) => {
  console.log('A new client connected');
  ws.send('conn successful');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello express');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
