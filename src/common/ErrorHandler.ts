import { ErrorRequestHandler, NextFunction, Request, Response  } from "express"
import { AuthError } from "../errors/AuthError"
import { BadReqError } from "../errors/BadReqError"

const middleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    
    if ( err instanceof AuthError ) {        
        res.status(err.statusCode).json({data: {message: err.message}})
    } else if ( err instanceof BadReqError ) {
        res.status(err.statusCode).json({data: {message: err.message}})        
    } else if ( err instanceof Error ) {
        res.status(500).send(err.message)
    }    
        
}

export { middleware as errorHandler }