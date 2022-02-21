import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import UserManager from './UserManager';
import User from './User';
import wsMessageManager from './wsMessageManager';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

const userManager = new UserManager();

// TODO Ws DoS attack prevention (Rate Limiting)
wss.on('connection', (ws, req) => {
  const user = new User(ws, req);

  userManager.addUser(user);

  ws.on('message', (message: string) => {
    wsMessageManager(user, message, userManager);
  });

  ws.on('close', () => {
    userManager.removeUser(user);
    userManager.dropClosedClientFiles(user);
    userManager.sendCurrRoomUsers(user);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send(res.send(userManager.getAllUsers()));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
