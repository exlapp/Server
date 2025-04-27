import { env } from 'process';
import { config } from 'dotenv'

interface IConfig {    
    jwtAccessSecretKey: string;
    jwtRefreshSecretKey: string;
    jwtRestoreSecretKey: string;
    jwtAccessExpiresIn: number;
    jwtRefreshExpiresIn: number;
    jwtRestoreExpiresIn: number;
}

config().parsed;

const { jwtAccessExpiresIn, jwtAccessSecretKey, jwtRestoreSecretKey, jwtRefreshExpiresIn, jwtRefreshSecretKey, jwtRestoreExpiresIn }: IConfig = {
    jwtAccessSecretKey: String(env.JWT_ACCESS_SECRET_KEY),
    jwtAccessExpiresIn: Number(env.JWT_ACCESS_EXPIRES_IN),
    jwtRefreshSecretKey: String(env.JWT_REFRESH_SECRET_KEY),
    jwtRefreshExpiresIn: Number(env.JWT_REFRESH_EXPIRES_IN),
    jwtRestoreSecretKey: String(env.JWT_RESTORE_SECRET_KEY),
    jwtRestoreExpiresIn: Number(env.JWT_RESTORE_EXPIRES_IN),    
};

export { jwtAccessExpiresIn, jwtAccessSecretKey, jwtRefreshExpiresIn, jwtRefreshSecretKey, jwtRestoreSecretKey, jwtRestoreExpiresIn };
