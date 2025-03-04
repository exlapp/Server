import express, { Application } from 'express';
import { indexRouter } from '../routers/indexRouter';

const app: Application = express();

app.use('/api', indexRouter)

export {app as application}