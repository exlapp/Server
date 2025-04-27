import { Router } from 'express';
import { getAuth, createUser, newPasswordSet, forgotPassword } from '../controllers/authController';
import { executeAuthChain } from '../helpers/executeAuthChain'
import { executeRegChain } from '../helpers/executeRegChain'
import { executeResetChain } from '../helpers/executeResetChain'

const router: Router = Router();

router
    .post('/signIn', executeAuthChain(), getAuth)
    .post('/signUp', executeRegChain(), createUser)
    .post('/newPasswordSet', executeResetChain(), newPasswordSet)
    .post('/forgotPassword', forgotPassword)

export { router as authRouter };