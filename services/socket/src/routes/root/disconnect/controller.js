import { disconnect as disconnectService } from '../../../services/disconnect/index.js';

export const disconnect = async (req, res) => {
    const result = await disconnectService(req, res);
    return result;
}
  
