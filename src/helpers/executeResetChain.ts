import { body, header, ValidationChain } from 'express-validator'

const chain = (): ValidationChain => { 
    return (
        body('password').exists().trim().isString().isLength({min: 3}),
        body('id').exists().trim().isString().isLength({min: 3})        
    )           
} 

export {chain as executeResetChain};