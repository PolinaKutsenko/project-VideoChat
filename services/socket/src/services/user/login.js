import { state } from '../../buildState.js';
import { io } from '../../config/socket.js';
import { FULL_ROOM_ERROR, USERS_MAX_COUNT } from '../../const/index.js';

export const login = async (socket, user) => {
    const data = { data: null, error: null };
    const usersCount = state.users.length;

    const userWithId = {
        ...user,
        id: socket.id,
    };

    if (usersCount >= USERS_MAX_COUNT) {
      data.error = FULL_ROOM_ERROR;
    } else {
      data.data = userWithId;
      state.users.push(userWithId);
    }
    io.to(socket.id).emit('userLogin', data);
};
