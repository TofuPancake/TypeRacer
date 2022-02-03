export function disconnect(socket, cb = null) {
  socket.on('disconnect', () => {
    console.log('user disconnected with id:', socket.id);
    if (cb) {
      cb();
    }
  });
}
