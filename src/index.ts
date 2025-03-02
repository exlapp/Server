import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Express!');
});

app.listen(5000, 'localhost').on(
    'listening', () => {
        console.log('Server on')
    }
)