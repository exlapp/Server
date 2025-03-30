import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { SignInWithLoggingUseCase } from '../domain/UseCases/SignInWithLoggingUseCase'
import { AuthError } from '../errors/AuthError'
import { BadReqError } from '../errors/BadReqError'
import { compare } from "bcrypt";
import { jwtGenerator } from "../common/jwtGenerator";
import { ServerError } from "../errors/ServerError";
import { COOKIE_MAX_AGE } from "../configs/cookieConfig";

interface IAuthRequest extends Request {
    login: string
    password: string
}

const getAuth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {    
    
    try {

        const result: boolean = validationResult(request).isEmpty();   
        if (!result) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')                        
        };

        const {login, password} = <IAuthRequest>request.body;
        
        const existedUser = await new SignInWithLoggingUseCase().execute(login);
        if (!existedUser) {
            throw new AuthError('Неверные имя пользователя или пароль!')            
        }

        const { password: dbPassword } = existedUser;
        if (!dbPassword) {
            throw new AuthError('Неверные имя пользователя или пароль!')
        }

        const passwordsIsEqual: boolean = await compare(password, dbPassword);
        if (!passwordsIsEqual) {
            throw new AuthError('Неверные имя пользователя или пароль!')
        }

        const { id: dbId } = existedUser;
        if (!dbId) {
           throw new ServerError('Ошибка сервера. Не удалось получить id пользователя!')
        }
        
        const {tokenAccess, tokenRefresh} = jwtGenerator(dbId);

        response.header('Authorization', 'Bearer ' + tokenAccess);        
        response.cookie('refreshToken', tokenRefresh , { maxAge: COOKIE_MAX_AGE, httpOnly: true, signed: true });
                
        response
            .status(200)
            .json({ 
                data: { 
                    message: 'Пользователь успешно авторизован!', 
                    body: { 
                        id: existedUser.id,
                        status: existedUser.status,

                     }
                } 
            });                    
            
    } catch (error) {
        next(error);
    }
            
};

export { getAuth };