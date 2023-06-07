import dotenv from 'dotenv';
import { parseBoolean } from '../utils/parsers/parseBoolean.js';
import { parseNumber } from '../utils/parsers/parseNumber.js';
import { parseString } from '../utils/parsers/parseString.js';

dotenv.config();

export const vars ={
    env: parseString(process.env.NODE_ENV, 'develop'),
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    isLocal: parseBoolean(process.env.IS_LOCAL, false),
    port: parseNumber(process.env.PORT, 3000),
    allowedOrigin: parseString(process.env.ALLOWED_ORIGIN, ''),
    apikey: parseString(process.env.API_KEY, ''),
    apisecret: parseString(process.env.API_SECRET, ''),
};
