import { env } from 'process';
import { config } from 'dotenv';

interface IConfig {
    BACKEND_PORT: number;
    BACKEND_HOST: string;      
};

config().parsed;

const {BACKEND_PORT, BACKEND_HOST}: IConfig = {
    BACKEND_PORT: Number( env.BACKEND_PORT ) || 5000,
    BACKEND_HOST: String( env.BACKEND_HOST) || 'localhost'      
};

export {BACKEND_PORT, BACKEND_HOST};  