import { application } from '../common/application';

const server = () => {

    application.listen(5000, 'localhost').on(
        'listening', () => {
            console.log('Server on')
        }
    )

}

export {server}