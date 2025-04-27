import { createTransport } from "nodemailer";
import { BACKEND_HOST, BACKEND_PORT } from '../configs/serverConfig'

const util = async ( token: string ): Promise<boolean | Error> => {
    
    try {
        
        const transporter = createTransport({
            service: 'mail',
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'alvest@bk.ru',
                pass: 'NWZ7hh400pn0p37GFbuD',
            },
        });
                        
        const result = await transporter.sendMail({
            from: 'alvest@bk.ru',
            to: 'Mordenos@yandex.ru',
            subject: 'Это письмо было отправлено через сервер node js',
            text: 'Это письмо было отправлено через сервер node js',
            html:
            
                `<html> 
                    <body style="
                        margin: 0; 
                        padding: 0; 
                        width: 100%; 
                        height: 250px; 
                        border: solid 1px; 
                        display: flex;
                        align-items: center;
                        justify-content: center;"
                    >
                        <div style="
                            width: 50%;
                            height: 50%;
                            background: #32CD32"
                            display: flex;
                            align-items: center;
                            justify-content: center"
                        >
                            <a href="http://${BACKEND_HOST}:${BACKEND_PORT}/newPasswordSet?restore_token=${token}">Восстановить пароль</a>
                        </div>                        
                    </body>
                </html>`,
                
        });

        if (!result) {
            throw new Error('Ошибка регистрации. Не удалось обновить пароль!')
        }

        return true;
        
    } catch (error) {
        throw error;
    }

}

export { util as emailSendler }