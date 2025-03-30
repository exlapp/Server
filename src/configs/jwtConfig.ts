import { env } from 'process';
import { config } from 'dotenv'

interface IConfig {    
    jwtAccessSecretKey: string;
    jwtRefreshSecretKey: string;
    jwtAccessExpiresIn: number;
    jwtRefreshExpiresIn: number    
}

config().parsed;

const { jwtAccessExpiresIn, jwtAccessSecretKey, jwtRefreshExpiresIn, jwtRefreshSecretKey }: IConfig = {
    jwtAccessSecretKey: String(env.JWT_ACCESS_SECRET_KEY),
    jwtAccessExpiresIn: Number(env.JWT_ACCESS_EXPIRES_IN),
    jwtRefreshSecretKey: String(env.JWT_REFRESH_SECRET_KEY),
    jwtRefreshExpiresIn: Number(env.JWT_REFRESH_EXPIRES_IN),   
};

export { jwtAccessExpiresIn, jwtAccessSecretKey, jwtRefreshExpiresIn, jwtRefreshSecretKey };
