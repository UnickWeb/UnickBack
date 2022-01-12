const app = require('./app');
const mongoose = require('mongoose');
const port = 3000;
require('dotenv').config();


const user = 'admin';
const password = '201410509Unick';
const bd = 'testDb'

//String de coneccion con variables de entorno
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@unick-tets.rznrs.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

//String de coneccion con variables locales
/*const uri = `mongodb+srv://${user}:${password}@unick-tets.rznrs.mongodb.net/${bd}?retryWrites=true&w=majority`; */


mongoose.connect(uri)
  .then(() => {

    console.log('Base de datos conectada');
    app.listen(port, () => {
      console.warn('mi port es ' + port);
    })
  })
  .catch((e) => { console.log(e); })




