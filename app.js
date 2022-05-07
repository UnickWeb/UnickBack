const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const errorHandler = require('./middleware/errorHandler')

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

routerApi(app);


/* 
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler) */;


module.exports = app;
