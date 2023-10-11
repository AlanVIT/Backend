import { Router } from 'express';
import passport from 'passport';
import { validarToken } from '../utils/utils.js';
import { UsersController } from '../controllers/users.controller.js';
import uploader from '../utils/multer.js';

const router = Router();
const usersController = new UsersController();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/authFailureRegister', failureFlash: true }), async (req, res) => {
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        birthDate: req.user.birthDate,
        userRole: 'user'
    };
    res.send({ status: 1, msg: "Nuevo usuario registrado" });
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/authFailureLogin', failureFlash: true }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 0, msg: 'Error' });
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        birthDate: req.user.birthDate,
        userRole: req.user.userRole
    };
    res.send({ status: 1, msg: 'El usuario inició sesión con éxito', user: req.session.user });
});

router.post('/resetpassword', passport.authenticate('resetPassword', { failureRedirect: '/api/sessions/authFailureReset', failureFlash: true }), async (req, res) => {
   usersController.sendEmail(req.user.email)
    res.send({ status: 1, msg: 'Contraseña restablecida con éxito. Será redirigido a la página de inicio de sesión' });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({ status: 1, msg: 'Usuario desconectado con exito ' });
});

// Agregar ruta current
router.get('/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send({ status: 1, user: req.session.user });
    } else {
        res.status(401).send({ status: 0, msg: 'No hay sesión iniciada' });
    }
});
// _____________________

router.get('/authFailureRegister', (req, res) => {
    const error = req.flash('error')[0];
    res.status(400).send({ status: 0, msg: error });
});

router.get('/authFailureLogin', (req, res) => {
    const error = req.flash('error')[0];
    res.status(400).send({ status: 0, msg: error });
});

router.get('/authFailureReset', (req, res) => {
    const error = req.flash('error')[0];
    res.status(400).send({ status: 0, msg: error });
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/githubFailure' }), async (req, res) => {
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        userRole: req.user.userRole
    };
    res.redirect('/products');
});

router.get('/githubFailure', (req, res) => {
    res.status(400).send({ status: 0, msg: 'Fallo de autenticación de Github' });
});

router.post('/pass-change/:token', validarToken, async (req, res) => {

    const { password } = req.body;
    const { email } = req;
    const hashedPassword = createHash(password);
    const user = { email, password: hashedPassword };
    await usersController.updateUser(user); // TODO: crear metodo en el controller
    res.send({ message: 'Password changed!' });
});

router.get('/premium/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersController.updateUserRole(uid);
        res.send({ message: 'User premium updated!', user });
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.post('/:uid/documents', uploader('documents').array('documents'), async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersController.updateUserDocuments(uid, req.files);
        res.send({ message: 'User documents updated!', user });
    } catch (e) {
        res.json({ error: e.message });
    }
});
export default router;