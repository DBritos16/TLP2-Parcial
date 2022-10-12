const router = require('express').Router();

const { register, login, putUser, deleteUser } = require('../controllers/users.controllers');
const validarJWT = require('../middlewares/validarJWT');


router.post('/register', register);

router.post('/login', login);

router.put('/user/edit', validarJWT, putUser);

router.put('/user/delete', validarJWT, deleteUser);

module.exports = router;