import nodemailer from 'nodemailer';
import express from 'express';
import handlebars from 'express-handlebars';
import config from './config/config.js';

const price = 10
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices risus sodales ultrices pharetra. Integer viverra pulvinar lectus, eget volutpat tortor. Nunc ac metus erat. '
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', `./views`);
app.set('view engine', 'handlebars');

const mailConfig = {
    service: config.mailing.service,
    port: config.mailing.port,
    auth: {
        user: config.mailing.auth.user,
        pass: config.mailing.auth.pass,
    },
}

const transport = nodemailer.createTransport(mailConfig);

app.get('/mail-with-image', async (req, res) => {
    const destination = req.query.destination;

    try{
        await transport.sendMail({
            from: `Coder test <${config.mailing.auth.user}>`,
            to: destination,
            subject: 'Gift card',
            html: `z
            <img src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/128/920/products/screenshot_20220612-195515_write-on-pdf1-22ed01c1958538d94f16550744622762-640-0.jpg" alt="MDN" />
            <h1>Gift card ${price} peso'</h1>
                    <p>${text}</p>
            `,
            attachments: [{
                filename: 'image.jpg',
                path: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/128/920/products/screenshot_20220612-195515_write-on-pdf1-22ed01c1958538d94f16550744622762-640-0.jpg',
                cid: 'image',
            }],
        });
        res.send('Mail sent');
    } catch (e) {
        res.json({ error: e });
    }
    
});

app.get('/mail-simple', async (req, res) => {
    const destination = req.query.destination;
    try {
        await transport.sendMail({
            from: `Coder test <${config.mailing.auth.user}>`,
            to: destination,
            subject: 'Test mail',
            html: '<h1>Test mail</h1>',
        });
        res.send('Mail sent');
    } catch (e) {
        res.json({ error: e });
    }
});

app.listen(8080,()=>console.log("Listening"));