import { connect, MongooseError } from 'mongoose';
import { DB_HOST, DB_NAME, DB_PORT } from '../configs/dbConfig'

const dbConnect = async () => {
    await connect(`mongodb://${DB_HOST}:${DB_PORT}/`, { dbName: DB_NAME })
};

export { dbConnect };