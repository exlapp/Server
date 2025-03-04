import { Router, Request, Response } from 'express';
import { getAuth } from '../controllers/authController';

const router: Router = Router();

router.get('/', getAuth);

export { router as authRouter };