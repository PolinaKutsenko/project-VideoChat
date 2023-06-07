import { add as addService } from '../../../services/user/add.js';
import { get as getService } from '../../../services/user/get.js';
import { login as loginService } from '../../../services/user/login.js';
import { remove as removeService } from '../../../services/user/remove.js';

export const add = async (req, res) => {
    const result = await addService(req, res);
    return result;
}

export const get = async (req, res) => {
    const result = await getService(req, res);
    return result;
}

export const login = async (req, res) => {
    const result = await loginService(req, res);
    return result;
}

export const remove = async (req, res) => {
    const result = await removeService(req, res);
    return result;
}
