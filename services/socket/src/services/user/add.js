import { state } from '../../buildState.js';
import { io } from '../../config/socket.js';

export const add = async (socket, user) => {
    const userWithId = {
        ...user,
        id: socket.id,
    };
    state.users.push(userWithId);
    io.emit('userAdd', userWithId);
};