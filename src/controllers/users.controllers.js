const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const generarJWT = require('../helpers/generarJWT');
const ctrl = {};

ctrl.register = async (req, res) => {

    try {
        const { username, email, password } = req.body

        if(username&&email&&password){
            res.status(400).json({
                msg: 'Try again'
            })
        }

        const newPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            username, email, password: newPassword
        });

        await newUser.save();

        res.json({
            msg: 'User created'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: ''
        })
    }

}


ctrl.login = async (req, res)=>{
    
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            res.status(404).json({
                msg: 'No user found'
            })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if(!passwordIsValid){
            res.status(400).json({
                msg: 'Password incorrect'
            })
        }

        const token = await generarJWT({uid: user._id})
     
        res.json({
            msg: 'Successful login',
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Authentication error'
        })
    }
}

module.exports = ctrl;