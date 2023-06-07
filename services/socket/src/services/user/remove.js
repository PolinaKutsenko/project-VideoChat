import { state } from '../../buildState.js';
import { io } from '../../config/socket.js';

export const remove = async (socket, user) => {
    const userId = user.id;
    state.users = state.users.filter((user) => user.id !== userId);
    io.emit('userRemove', userId);
};
