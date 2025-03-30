import express, { Application, Request, Response, json, urlencoded } from 'express';
import { indexRouter } from '../routers/indexRouter';
import cookieParser from 'cookie-parser'
import {COOKIE_SECRET_KEY} from '../configs/cookieConfig'
import { errorHandler } from '../common/ErrorHandler'

const app: Application = express();

app

    .use(cookieParser(COOKIE_SECRET_KEY))
    .use(json({type: 'application/json'}))
    .use(urlencoded({ extended: true }))

    .use('/api', indexRouter)

    .all ( '*', ( req: Request, res: Response ) => {
        res.status(404).json({ message:`Ресурс (${req.originalUrl}) не найден` })                     
    })

    .use(errorHandler)

export {app as application}