const {Schema, model} = require('mongoose');

const NewTask = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
}, {versionKey: false, timestamps: true});

module.exports = model('tasks', NewTask);