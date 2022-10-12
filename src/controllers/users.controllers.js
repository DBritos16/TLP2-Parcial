const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const generarJWT = require('../helpers/generarJWT');
const { updateOne, findByIdAndUpdate } = require('../models/tasks.models');
const ctrl = {};

ctrl.register = async (req, res) => {

    try {
        const { username, email, password } = req.body

        if(!username&&!email&&!password){
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
            msg: 'An error has ocurred'
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

        if (!user.isActive) {
            res.status(400).json({
                msg: 'User is inactive'
            });
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

ctrl.putUser = async (req, res)=>{
    try {
        const {username, email, password} = req.body

        const newPassword = bcrypt.hashSync(password, 10);

        const updateUser = await User.updateOne({_id: req.user._id}, {
            username, email, password: newPassword
        })

        if(!updateUser){
            res.status(400).json({
                msg: 'Error to update user'
            })
        }

        res.json({
            msg: 'User has been update'
        })

    
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'An error has ocurred'
        })
    }
}

ctrl.deleteUser = async (req, res)=>{
    try {
        const deleteUser = await User.findByIdAndUpdate(req.user.id, {
            $set: {
                isActive: false
            }
        });

        if(!deleteUser){
            res.status(400).json({
                msg: 'Error to delete user'
            })
        }

        res.json({
            msg: 'User has been delete'
        })

    } catch (error) {
        
    }
}




module.exports = ctrl;