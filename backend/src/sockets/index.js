import socketio from 'socket.io';

let io;

export function initSocketServer(server) {
  io = socketio(server);
}

export function getSocketIO() {
  if (!io) {
    throw new Error('SocketIO not initialized.');
  }
  return io;
}
