import { Router } from 'express';
import { getAuth, createUser } from '../controllers/authController';
import { executeAuthChain } from '../helpers/executeAuthChain'
import { executeRegChain } from '../helpers/executeRegChain'

const router: Router = Router();

router
    .post('/signIn', executeAuthChain(), getAuth)
    .post('/signUp', executeRegChain(), createUser);

export { router as authRouter };