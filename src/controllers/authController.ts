import { Request, Response, NextFunction } from "express"

const getAuth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {    
    response.send('Hello Express!');
}

export {getAuth}