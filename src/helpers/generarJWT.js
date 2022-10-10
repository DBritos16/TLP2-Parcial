const jwt = require('jsonwebtoken');

const generarJWT = (uid)=>{
    return new Promise((resolve, reject) => {
        jwt.sign(uid, process.env.SECRET,{
            expiresIn: 60*60
        }, (err, token)=>{
            (err)?reject(err):resolve(token);
        })
    }) 
}

module.exports = generarJWT;

