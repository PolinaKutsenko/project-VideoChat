import { io } from '../../config/socket.js';
import { AccessToken } from 'livekit-server-sdk';
import { vars } from '../../config/vars.js';
import { ROOM_NAME } from '../../const/index.js';

const roomName = ROOM_NAME

export const getToken = async (socket, user) => {
    const participantId = user.id;
    const at = new AccessToken(vars.apikey, vars.apisecret, {
        identity: participantId,
    });
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    const token = at.toJwt();
    
    io.to(socket.id).emit('videochatGetToken', token);
};
