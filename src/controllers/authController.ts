import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { SignInUseCase } from '../domain/UseCases/SignInUseCase'
import { SignUpUseCase } from '../domain/UseCases/SignUpUseCase'
import { SetNewPasswordUseCase } from '../domain/UseCases/SetNewPasswordUseCase'
import { SendPasswordResetLink } from '../domain/UseCases/SendPasswordResetLink'
import { AuthError } from '../errors/AuthError'
import { BadReqError } from '../errors/BadReqError'
import { compare } from "bcrypt";
import { jwtGenerator } from "../common/jwtGenerator";
import { ServerError } from "../errors/ServerError";
import { COOKIE_MAX_AGE } from "../configs/cookieConfig";
import { emailSendler } from '../common/emailSendler'
import { sign, verify } from "jsonwebtoken";
import { jwtRestoreSecretKey, jwtRestoreExpiresIn } from "../configs/jwtConfig";

interface IRequestParams {
    restoreToken?: string;
}

interface IAuthRequestBody {    
    id?: string;
    login?: string;
    password?: string;
}

declare global {
    namespace Express {
        export interface Request<TParams = {}, TQuery = {}, TBody = any> {
            body: TBody & IAuthRequestBody;
            params: TParams & IRequestParams;
        }
    }
}

const getAuth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {    
    
    try {

        const result: boolean = validationResult(request).isEmpty();   
        if (!result) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')                        
        };

        const {login, password} = <IAuthRequestBody>request.body;
        if (!login || !password) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')
        }
        
        const existedUser = await new SignInUseCase().execute(login);
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

const createUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    try {

        const result: boolean = validationResult(request).isEmpty();   
        if (!result) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')                        
        };

        const {login, password} = <IAuthRequestBody>request.body;
        if (!login || !password) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')
        }
        
        const newUser = await new SignUpUseCase().execute(login, password);
        if (!newUser) {
            throw new AuthError('Ошибка регистрации. Пользователь с таким именем уже существует!')            
        }

        const { login: entLogin } = newUser;

        response
            .status(200)
            .json({ 
                data: { 
                    message: `Пользователь ${entLogin} успешно зарегистрирован!`,                    
                } 
            });        
                
    } catch (error) {
        next(error);
    }

}

const newPasswordSet = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    try {

        const result: boolean = validationResult(request).isEmpty();   
        if (!result) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')                        
        };

        const { id, password } = <IAuthRequestBody>request.body;
        if (!id || !password) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')
        }

        const { restoreToken } = <IRequestParams>request.params
        if (!restoreToken) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')
        }

        const isTokenValid = verify(restoreToken, jwtRestoreSecretKey);
        if (!isTokenValid) {
            throw new BadReqError('Ошибка запроса. Ссылка для восстановления пароля устарела/не действительна!')
        }

        const userWithUpdatedPassword = await new SetNewPasswordUseCase().execute(id, password);
        if (!userWithUpdatedPassword) {
            throw new AuthError('Ошибка регистрации. Не удалось обновить пароль!')
        }

        const { login: entLogin  } = userWithUpdatedPassword;

        response
            .status(200)
            .json({ 
                data: { 
                    message: `Пароль пользователя ${entLogin} успешно обновлен!`,                    
                } 
            });


        
    } catch (error) {
        next(error);
    }

}

const forgotPassword = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    try {

        const result: boolean = validationResult(request).isEmpty();   
        if (!result) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')                        
        };
        
        const { login: reqLogin } = <IAuthRequestBody> request.body;
        if (!reqLogin) {
            throw new BadReqError('Ошибка запроса. Получены некорректные параметры запроса!')
        }

        const entity = await new SendPasswordResetLink().execute(reqLogin);
        if (!entity) {
            throw new AuthError('Ошибка регистрации. Не удалось найти email!')
        }

        const { login: entLogin } = entity;

        const tokenRestore = sign({ login: entLogin }, jwtRestoreSecretKey, {expiresIn: jwtRestoreExpiresIn})
                
        const isSendEmail = await emailSendler(tokenRestore)
        if (!isSendEmail) {
            throw new AuthError('Ошибка регистрации. Не удалось отправить письмо!')
        }

        response.status(200).json({ message: `Письмо по адресу ${entLogin} отправлено!` });

    } catch (error) {
        next(error);
    }
}

export { getAuth, createUser, newPasswordSet, forgotPassword };