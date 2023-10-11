import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Rutas que no son de sesiones', () => {
    // Prueba la ruta GET /api/products
    describe('GET /api/products', () => {
        it('Debería devolver una lista de productos', (done) => {
            chai.request(app)
                .get('/api/products')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    // Verificar aquí los detalles de la respuesta JSON si es necesario
                    done();
                });
        });
    });

    // Prueba la ruta GET /api/products/:productId
    describe('GET /api/products/:productId', () => {
        it('Debería devolver un producto por su ID', (done) => {
            // Sustituye ":productId" con un ID de producto válido para tu aplicación
            const productId = 'producto_id_valido';

            chai.request(app)
                .get(`/api/products/${productId}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    // Verificar aquí los detalles de la respuesta JSON si es necesario
                    done();
                });
        });
    });

    // Prueba la ruta POST /api/products
    describe('POST /api/products', () => {
        it('Debería agregar un nuevo producto', (done) => {
            const newProduct = {
                name: 'Nuevo Producto',
                price: 19.99,
                // Otros campos del producto
            };

            chai.request(app)
                .post('/api/products')
                .send(newProduct)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    // Verificar aquí los detalles de la respuesta JSON si es necesario
                    done();
                });
        });
    });

    // Prueba la ruta DELETE /api/products/:productId
    describe('DELETE /api/products/:productId', () => {
        it('Debería eliminar un producto por su ID', (done) => {
            // Sustituye ":productId" con un ID de producto válido para tu aplicación
            const productId = 'producto_id_valido';

            chai.request(app)
                .delete(`/api/products/${productId}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(204); // 204 indica que no hay contenido
                    done();
                });
        });
    });

});
