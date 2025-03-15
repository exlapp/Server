import express, { Application, json, urlencoded } from 'express';
import { indexRouter } from '../routers/indexRouter';

const app: Application = express();

app

.use(json({type: 'application/json'}))
.use(urlencoded({ extended: false }))

.use('/api', indexRouter)

export {app as application}