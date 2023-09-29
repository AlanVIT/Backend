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

    it('Debería autenticar a un usuario válido', (done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                username: 'usuario',
                password: 'contraseña',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });

    it('Debería devolver un error al autenticar un usuario inválido', (done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                username: 'usuario_invalido',
                password: 'contraseña_invalida',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });
    });
});
