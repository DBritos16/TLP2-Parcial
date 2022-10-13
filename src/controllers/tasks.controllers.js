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

        if(!getTask){
            res.status(404).json({
                msg: 'Task not found'
            })
        }

        res.json(getTask);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'An error has ocurred'
        })
    }
}

ctrl.getSpecificTask = async (req, res)=>{
    try {
        const id = req.params.id;

        if(!id){
            res.status(404).json({
                msg: 'No ID received'
            })
        }

        const getTask = await Task.findById(id);

        if(!getTask){
            res.status(404).json({
                msg: 'Task not found'
            })
        }

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

ctrl.putTask = async (req, res)=>{
    try {
        const {title, description} = req.body;
        const id = req.params.id;

        if(!id){
            res.status(404).json({
                msg: 'No ID received'
            })
        }

        const updateTask = await Task.updateOne({_id: id, userId: req.user._id},{title, description});

        if(!updateTask){
            res.status(400).json({
                msg: 'Error to update task'
            })
        };

        res.json({
            msg: 'Task has been update'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'An error has ocurred'
        })
    }
}

ctrl.completeTask = async(req, res)=>{
    try {
        const id = req.params.id

        if(!id){
            res.status(400).json({
                msg: 'No id received'
            })
        }

        const completeTask = await Task.updateOne({_id: id, userId: req.user.id},{isDone: true});

        if(!completeTask){
            res.status(400).json({
                msg: 'Error to complete task'
            })
        }

        res.json({
            msg: 'Task complete'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'An error has ocurred'
        })
    }
}

ctrl.deleteTask = async (req, res)=>{
    try {
        const id = req.params.id

        if(!id){
            res.status(404).json({
                msg: 'No ID received'
            })
        }

        const deleteTask = await Task.deleteOne({_id: id, userId: req.user._id});

        if(!deleteTask){
            res.status(400).json({
                msg: 'Error to delete task'
            });
        }

        res.json({
            msg: 'Task has been delete.'
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'An error has ocurred'
        })
    }
}


module.exports = ctrl;