import { request, Router } from 'express';
import { getAuth } from '../controllers/authController';
import { executeAuthChain } from '../helpers/executeAuthChain'

const router: Router = Router();

router.post('/', executeAuthChain(), getAuth);

export { router as authRouter };