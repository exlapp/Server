import { request, Router } from 'express';
import { getAuth } from '../controllers/authController';
import { executeAuthChain } from '../validators/executeAuthChain'

const router: Router = Router();

router.post('/', executeAuthChain(), getAuth);

export { router as authRouter };