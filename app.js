const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');


const app = express();
const notesRoute = require('./routes/notes');


// Settings
app.set('port', process.env.PORT || 3300);


// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.json()); // Parse json
app.use('/notes', notesRoute);


// Connecting to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))


// Listen on a specific port
app.listen(app.get('port'), () => {
    console.log(`Server listening on port: ${app.get('port')}`);
})