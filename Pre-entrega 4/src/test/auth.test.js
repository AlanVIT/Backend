import chai from 'chai'
import chaiHttp from 'chai-http'
import app from "../app.js"

const should = chai.should();

chai.use(chaiHttp);

describe('Módulo de Autenticación', () => {
    // Antes de cada prueba, iniciar la aplicación
    beforeEach(() => {
        // Inicializa la aplicación o realiza otras configuraciones necesarias
    });


    it('Debería permitir que un usuario registrado inicie sesión', (done) => {
        chai.request(app)
            .post('/api/sessions/login')
            .send({
                username: 'usuario_existente',
                password: 'contraseña_existente',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // Verificar aquí los detalles de la respuesta JSON si es necesario
                done();
            });
    });

    it('Debería devolver un error al iniciar sesión con credenciales incorrectas', (done) => {
        chai.request(app)
            .post('/api/sessions/login')
            .send({
                username: 'usuario_invalido',
                password: 'contraseña_invalida',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                // Verificar aquí los detalles de la respuesta JSON si es necesario
                done();
            });
    });

    it('Debería permitir que un usuario registrado cierre sesión', (done) => {
        chai.request(app)
            .post('/api/sessions/logout')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // Verificar aquí los detalles de la respuesta JSON si es necesario
                done();
            });
    });

    it('Debería devolver un mensaje de error al cerrar sesión si el usuario no está autenticado', (done) => {
        chai.request(app)
            .post('/api/sessions/logout')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                // Verificar aquí los detalles de la respuesta JSON si es necesario
                done();
            });
    });

});
