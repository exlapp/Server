import {Router} from 'express'
import { authRouter } from './authRouter';

const router: Router = Router()
    .use('/auth', authRouter)

export { router as indexRouter };