import { env } from 'process';
import { config } from 'dotenv';

interface IConfig {
    COOKIE_SECRET_KEY: string
    COOKIE_MAX_AGE: number;
};

config().parsed;

const {COOKIE_MAX_AGE, COOKIE_SECRET_KEY}: IConfig = {    
    COOKIE_SECRET_KEY: String(env.COOKIE_SECRET_KEY),
    COOKIE_MAX_AGE: Number(env.COOKIE_MAX_AGE)
};

export { COOKIE_SECRET_KEY, COOKIE_MAX_AGE };  