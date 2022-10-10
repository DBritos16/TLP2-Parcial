//Import dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./database/connection');
require('dotenv').config()

//Init express
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.set('PORT', process.env.PORT || 5000)
connectDB();

//routes
app.use(require('./routes/users.routes'));
app.use(require('./routes/tasks.routes'));


//PORT
app.listen(app.get('PORT'), (err)=>(err)?console.log(`An error has occurred: ${err}`):console.log(`Server running on port ${app.get('PORT')}`))