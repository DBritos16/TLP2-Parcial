const router = require('express').Router();
const validarJWT = require('../middlewares/validarJWT');

const { getTask, postTask, putTask, deleteTask, getSpecificTask, completeTask } = require('../controllers/tasks.controllers');


router.get('/task', validarJWT, getTask);

router.get('/task/:id', validarJWT, getSpecificTask);

router.post('/task', validarJWT, postTask);

router.put('/task/:id', validarJWT, putTask);

router.put('/task/complete/:id', validarJWT, completeTask);

router.delete('/task/:id', validarJWT, deleteTask);

module.exports = router;