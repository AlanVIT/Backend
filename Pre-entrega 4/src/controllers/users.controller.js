import { default as token } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../config/enviroment.js';
import UsersManager from '../dao/managers/users.managers.js';

const PRIVATE_KEY = "CoderKeyFeliz";

const mailConfig = {
    service: config.mailing.service,
    port: config.mailing.port,
    auth: {
        user: config.mailing.auth.user,
        pass: config.mailing.auth.pass,
    },
}

const transport = nodemailer.createTransport(mailConfig);

    const usersManager = new UsersManager();
    

export const UsersController = {

    async sendEmail(email){
        try {
            const jwt = this.createJwt(email)
            transport.sendMail({
                from: `Coder <${config.mailing.auth.user}>`,
                to: email,
                subject: 'Recuperar pass',
                html: `<h1>Para recuperar tu pass, haz click en el boton de abajo</h1>
                        <hr>
                        <a href="http://${config.baseUrl}:8080/api/session/restore-pass/${jwt}">CLICK AQUI</a>
                `,
            });
        } catch (e) {
            res.json({ error: e });
        }
    },

    async getUserByEmail(email){
        try {
            return await usersManager.getUserByEmail(email);
        } catch (e) {
            res.json({ error: e });
        }
    },

    async getAllUsers(){
        try {
            return await usersManager.getAllUsers();
        } catch (e) {
            res.json({ error: e });
        }
    },
    async deleteUsers(){
        try {
            return await usersManager.deleteUsers();
        } catch (e) {
            res.json({ error: e });
        }
    },
    createJwt(email){
        return token.sign({ email }, PRIVATE_KEY, { expiresIn: '1h' })
    },

    async updateUserRole(id){
        try {
            const user = await usersManager.getUserById(id);

            if(user.role === 'user'){
                const requiredDocuments = ['id', 'address', 'account'];
                const userDocuments = user.documents || [];
    
                const hasAllDocuments = requiredDocuments.every(requiredDocument => {
                    return userDocuments.some(userDocument => userDocument.name.includes(requiredDocument))
                });
    
                if (!hasAllDocuments) throw new Error('User must have all documents');
            }

            return await usersManager.toggleUserRole(user);
        } catch (e) {
            throw new Error(e);
        }
    },

    async setLastConnection(email){
        try {
            const user = await usersManager.getUserByEmail(email);
            if( !user ) throw new Error('User not found');
            await usersManager.setLastConnection(user);
        } catch (e) {
            throw new Error(e);
        }
    },

    async updateUserDocuments(id, files){
        try {
            const user = await usersManager.getUserById(id);
            const documents = user.documents || [];

            // const newDocuments = documents;
            // files.forEach(file => {
            //     newDocuments.push({ name: file.originalname, reference: file.path })
            // });

            const newDocuments = [
                ...documents,
                ...files.map(file => ({ name: file.originalname, reference: file.path }))
            ];

            return await user.updateOne({ documents: newDocuments });
        } catch (e) {
            res.json({ error: e });
        }
    }
}