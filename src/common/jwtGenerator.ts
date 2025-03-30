import { sign, SignOptions } from 'jsonwebtoken'
import { jwtAccessSecretKey, jwtAccessExpiresIn, jwtRefreshSecretKey, jwtRefreshExpiresIn } from '../configs/jwtConfig'

const jwtGenerator = (userId: string) => {        
    const tokenAccess = sign({ id: userId }, jwtAccessSecretKey, {expiresIn: jwtAccessExpiresIn})
    const tokenRefresh = sign({ id: userId }, jwtRefreshSecretKey, {expiresIn: jwtRefreshExpiresIn})
    return {
        tokenAccess: tokenAccess,
        tokenRefresh: tokenRefresh
    }
}

export { jwtGenerator }