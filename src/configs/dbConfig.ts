import {env} from 'process';
import { config } from 'dotenv';

interface IConfig {
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
};

config().parsed;

const { DB_HOST, DB_PORT, DB_NAME }: IConfig = {
    DB_HOST: String(env.DB_HOST) || 'localhost',
    DB_PORT: Number(env.DB_PORT) || 27017,
    DB_NAME: String(env.DB_NAME) 
}

export { DB_HOST, DB_PORT, DB_NAME };