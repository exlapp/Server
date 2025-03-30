import { Response } from 'express'
import { COOKIE_MAX_AGE } from '../configs/cookieConfig';

interface IProps {
    statusCode: number;
    data: object;
    response: Response;
    tokens?: {
        tokenAccess?: string
        tokenRefresh?: string
    };
}

const view = async (props: IProps): Promise<void> => {

    const {statusCode, data, tokens, response} = props

    if (tokens) {
        const {tokenAccess, tokenRefresh} = tokens
        response.header('Authorization', 'Bearer ' + tokenAccess);        
        response.cookie('refreshToken', tokenRefresh , { maxAge: COOKIE_MAX_AGE, httpOnly: true, signed: true });
    }

    response
        .status(statusCode)
        .json(data)
    
}

export { view };