import { state, getNextId } from '../../buildState.js';
import { io } from '../../config/socket.js';

export const add = async (socket, message) => {
    const messageWithId = {
        ...message,
        id: getNextId(),
    };
    state.messages.push(messageWithId);
    io.emit('messageAdd', messageWithId);
};
