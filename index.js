const express = require('express');
const faker = require('faker');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/errorHandler')

const mongoose = require('mongoose');

const user = 'admin';
const password = '201410509Unick';
const bd = 'testDb'
const uri = `mongodb+srv://${user}:${password}@unick-tets.rznrs.mongodb.net/${bd}?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => { console.log('Base de datos conectada'); })
  .catch((e) => { console.log(e); })



const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('mi server en express');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.warn('mi port es ' + port);
})



