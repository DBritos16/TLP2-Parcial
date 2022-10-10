const Task = require('../models/tasks.models');
const ctrl = {};

ctrl.getTask = async (req, res) => {

    try {
        const uid = req.user._id;

        if (!uid) {
            res.status(400)({
                msg: 'No ID received'
            })
        }

        const getTask = await Task.find({ userId: uid })

        res.json(getTask);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'An error has ocurred'
        })
    }
}


ctrl.postTask = async (req, res) => {

    try {
        const { title, description } = req.body;
        const uid = req.user._id;

        if (!uid) {
            res.status(400)({
                msg: 'No ID received'
            })
        }

        if (!title && !description) {
            res.status(400).json({
                msg: 'Fill the fields'
            })
        }

        const newTask = new Task({
            title, description, userId: uid
        })

        await newTask.save();

        res.json({
            msg: 'Task created'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error to created task'
        })
    }


}

module.exports = ctrl;