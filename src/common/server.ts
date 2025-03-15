import { application } from '../common/application';
import { DB_HOST, DB_NAME, DB_PORT } from '../configs/dbConfig';
import { BACKEND_PORT, BACKEND_HOST } from '../configs/serverConfig'
import { dbConnect } from './dbConnect';

const server = () => {

    application.listen(BACKEND_PORT, BACKEND_HOST, () => {
        dbConnect()
            .then(() => console.log(`DB ${DB_NAME} on http://${DB_HOST}:${DB_PORT}: OK!`))
            .catch(() => console.log(`DB ${DB_NAME} on http://${DB_HOST}:${DB_PORT}: ERROR!`))
    })
        
        .on ('listening', () => {            
            console.log(`App on http://${BACKEND_HOST}:${BACKEND_PORT}: OK!`)

        })
        
        .on ('error', (error) => {
            console.log(`App on http://${BACKEND_HOST}:${BACKEND_PORT}: ERROR!`)           
        })

}

export {server}