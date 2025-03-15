import { request, response } from 'express';
import {body, ValidationChain, validationResult} from 'express-validator'

const executeAuthChain = (): ValidationChain => { 
    return (
        body('username').exists().trim().isString().isLength({min: 3}),
        body('password').exists().trim().isString().isLength({min: 3})
    )           
} 

export {executeAuthChain};