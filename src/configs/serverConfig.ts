import { env } from 'process';
import { config } from 'dotenv';

interface IConfig {
    BACKEND_PORT: number;
    BACKEND_HOST: string;
    BACKEND_COOKIE_SECRET: string;
};

config().parsed;

const {BACKEND_PORT, BACKEND_HOST, BACKEND_COOKIE_SECRET}: IConfig = {
    BACKEND_PORT: Number( env.BACKEND_PORT ) || 5000,
    BACKEND_HOST: String( env.BACKEND_HOST) || 'localhost' ,
    BACKEND_COOKIE_SECRET: String(env.BACKEND_COOKIE_SECRET)
};

export {BACKEND_PORT, BACKEND_HOST, BACKEND_COOKIE_SECRET};  