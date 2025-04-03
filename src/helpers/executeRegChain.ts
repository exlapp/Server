import { body, ValidationChain } from 'express-validator'

const chain = (): ValidationChain => { 
    return (
        body('username').exists().trim().isString().isLength({min: 3}),
        body('password').exists().trim().isString().isLength({min: 3})
    )           
} 

export {chain as executeRegChain};