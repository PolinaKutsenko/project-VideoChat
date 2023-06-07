import { Server } from 'socket.io';

import { vars } from './vars.js';
import { onConnection } from '../services/socket/onConnection.js';

const socketConfig = {
    pingInterval: 10000,
    pingTimeout: 10000,
    cors: {
        origin: vars.allowedOrigin,
      }
};

const io = new Server(socketConfig);

io.on('connection', onConnection);

export { io };

