import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import viewsRouter from './views.router.js';

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine('hbs', handlebars.engine());
app.set('views', `./views`);
app.set('view engine', 'hbs');
app.use('/', viewsRouter);


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/setCookie', (req, res) => {
    const data = req.body
    res.cookie('inmortalCookie', data).send('Cookie inmortal seteada');


    res.cookie('coderCookie', 'esta es una cookie', { maxAge: 10000 }).send('Cookie seteada');

});

app.get('/getCookie', (req, res) => {
    const cookie = req.cookies;
    res.send(cookie);
});

app.get('/clearCookie', (req, res) => {
    res.clearCookie('inmortalCookie').send('Cookie borrada');
});

app.use(cookieParser('C0D3R H0US3'))

app.listen(8080,()=>{console.log('listening on port 8080')})

