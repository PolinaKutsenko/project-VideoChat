import { getToken as getTokenService } from '../../../services/videochat/getToken.js';

export const getToken = async (req, res) => {
    const result = await getTokenService(req, res);
    return result;
}
