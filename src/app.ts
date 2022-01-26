import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import UserManager from './UserManager';
import User from './User';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

const userManager = new UserManager();

wss.on('connection', (ws, req) => {
  const user = new User(ws, req);

  userManager.addUser(user);

  ws.on('message', (message: string) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
  });

  ws.on('close', () => {
    userManager.removeUser(user);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send(res.send(userManager.getAllUsers()));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
