import dotenv from 'dotenv';

dotenv.config()

export default {
    port: process.env.PORT || 8080,
    mongo_uri: process.env.MONGO_URI,
    environment: process.env.NODE_ENV || 'development',
    adminUser: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_PASSWORD,
}