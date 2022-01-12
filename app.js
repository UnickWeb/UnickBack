const express = require('express');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/errorHandler')

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('mi server en express');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


module.exports = app;
