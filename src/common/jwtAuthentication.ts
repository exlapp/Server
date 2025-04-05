import { ErrorRequestHandler, NextFunction, Request, Response  } from "express"
import { AuthError } from "../errors/AuthError"
import { BadReqError } from "../errors/BadReqError"
import { executeResetChain } from '../helpers/executeResetChain'
import { validationResult } from "express-validator"

const middleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    
    try {

        const result: boolean = validationResult(req).isEmpty();   
        if (!result) {
            throw new BadReqError('Ошибка запроса. Некорректный заголовок authorization в request!')                        
        };

        const {authorization} = req.headers
        console.log(authorization)
        
    } catch (error) {
        next(error);
    }   
        
}

export { middleware as jwtAuthentication }