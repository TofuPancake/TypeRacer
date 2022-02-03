export function getSocketIO() {
  return {
    sockets: {
      adapter: {
        rooms: {
          get() {
            return ['test'];
          },
        },
      },
    },
  };
}
