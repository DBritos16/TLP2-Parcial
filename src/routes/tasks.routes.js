const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const { getTask, postTask, putTask, deleteTask, getSpecificTask } = require('../controllers/tasks.controllers');


router.get('/task', validarJWT, getTask);

router.get('/task/:id', validarJWT, getSpecificTask);

router.post('/task', validarJWT, postTask);

router.put('/task/:id', validarJWT, putTask);

router.delete('/task/:id', validarJWT, deleteTask);

module.exports = router;