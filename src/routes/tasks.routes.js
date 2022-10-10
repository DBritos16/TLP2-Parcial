const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const { getTask, postTask } = require('../controllers/tasks.controllers');


router.get('/task', validarJWT, getTask);

router.post('/task', validarJWT, postTask);

module.exports = router;