import {Router} from 'express'
import { authRouter } from './authRouter';

const router: Router = Router();

router.use('/auth', authRouter)

export { router as indexRouter };