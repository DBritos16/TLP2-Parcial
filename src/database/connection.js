const {connect} = require('mongoose');

const connectDB = async ()=>{
    try {
        connect(process.env.MONGODB_URI);

        console.log('BD connected');

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;