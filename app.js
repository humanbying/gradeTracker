require('dotenv').config();
const PORT = process.env.PORT || 8000;


//REQUIRE
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/assignments', require('./routes/assignments'));


app.listen(PORT, err => {
  console.log(err || `System listening on port ${PORT}`);
});
