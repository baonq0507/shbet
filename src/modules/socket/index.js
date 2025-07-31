import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
    autoConnect: true,
    forceNew: true,
    upgrade: true,
});

const connect = (callback) => {
    socket.on('connect', () => {
        callback();
    });
};

const disconnect = (callback) => {
    socket.on('disconnect', () => {
        callback();
    });
};

const on = (event, callback) => {
    socket.on(event, (data) => {
        callback(data);
    });
};

const off = (event, callback) => {
    socket.off(event, (data) => {
        callback(data);
    });
};

const emit = (event, data, callback) => {
    socket.emit(event, data, (response) => {
        callback(response);
    });
};

export { connect, disconnect, on, off, emit };