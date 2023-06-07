import { state } from '../../buildState.js';
import { io } from '../../config/socket.js';

export const disconnect = async (socket, data) => {
    state.users = state.users.filter((user) => {
        return user.id !== socket.id;
    });
    io.emit('userGet', state.users);
};