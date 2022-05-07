//aqui estaran la mayoria de paths para la integracion con paypal
require('dotenv').config();

const PAYPAL_API_CLIENT = 'Acdnt8IQirBB4IoxDCtVcQ6u0KL8CLvgxEinVvPfr9pBrrRbvgpipISJzrH2i6k3kSfCwFnbmPAK1EC8'

const PAYPAL_API_SECRET = 'EKbshKXxcwLqrReYpbR-rhGbE65GGET0g5XLDtKR5JYhnukmDD6SqYZM8xtSJMTyF79z9X_jVKWsCsE-'

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'

const HOST = 'http://localhost:3001/api/v1/'

const SECRETTOKEN = process.env.SECRETTOKEN

module.exports = {
   PAYPAL_API_CLIENT,
   PAYPAL_API_SECRET,
   PAYPAL_API,
   HOST,
   SECRETTOKEN

}

