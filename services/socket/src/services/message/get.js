import { state } from '../../buildState.js';
import { io } from '../../config/socket.js';

export const get = async (socket, data) => {
    io.emit('messageGet', state.messages);
};