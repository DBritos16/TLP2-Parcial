const router = require('express').Router();

const { register, login } = require('../controllers/users.controllers');


router.post('/register', register);

router.post('/login', login);

router.put('/user/edit');

router.delete('/user/delete');

module.exports = router;