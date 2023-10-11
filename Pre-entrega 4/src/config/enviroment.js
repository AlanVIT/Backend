import dotenv from 'dotenv';

dotenv.config()

export default {
    port: process.env.PORT || 8080,
    mongo_uri: process.env.MONGO_URI,
    environment: process.env.NODE_ENV || 'development',
    adminUser: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_PASSWORD,
    mailing: {
        service: process.env.MAIL_SERVICE||'gmail',
        port: process.env.MAIL_PORT||'587',
        auth: {
            user: process.env.MAIL_AUTH_USER||'alanvitas27@gmail.com',
            pass: process.env.MAIL_AUTH_PASS||'ubmsxfrzkyxwxtxm',
        },
    },
    baseUrl: 'localhost'
}