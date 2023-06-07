import { add as addService } from '../../../services/message/add.js';
import { get as getService } from '../../../services/message/get.js';

export const add = async (req, res) => {
    const result = await addService(req, res);
    return result;
}

export const get = async (req, res) => {
    const result = await getService(req, res);
    return result;
}
