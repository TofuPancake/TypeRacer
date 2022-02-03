import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import * as SocketOn from './sockets/on';
import { initSocketServer, getSocketIO } from './sockets';
import routes from './routes';

const app = express();
const server = http.createServer(app);
initSocketServer(server);
const io = getSocketIO();

require('dotenv').config();

const mongoUri = process.env.ATLAS_URI;
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to MongoDB Atlas.');
    }
  },
);

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

io.on('connection', (socket) => {
  console.log('a user connected with id:', socket.id);
  SocketOn.disconnect(socket);
  SocketOn.initializeGame(socket);
  SocketOn.createLobby(socket);
  SocketOn.joinLobby(socket);
  SocketOn.updatePlayerProgress(socket);
  SocketOn.disconnecting(socket);
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
