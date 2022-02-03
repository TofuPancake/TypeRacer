import io from 'socket.io-client';

let socket;

export function initSocket() {
    if(!socket){
        socket = io();
    }
}

export function getSocket() {
    if (!socket) {
        throw new Error('Socket not initialized.');
    }
    return socket;
}
