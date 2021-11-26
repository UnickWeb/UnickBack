const boom = require('@hapi/boom');
const faker = require('faker');
const { param } = require('../routes/productsRouter');

class userService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 1000);
    });

  }

  async getOne(id) {

    const getUser = this.users.find(elem => elem.id == id);
    if (!getUser) {
      /*  throw new Error('user not found'); */
      throw boom.notFound('product not found');

    }
    return getUser;

    /*    return new Promise((resolve, reject) => {
         resolve(this.users.find(elem => elem.id == id));
       }) */

  }

  async addUser(user) {
    return this.users.push(user);
  }

  async updateUser(id, params) {

    const userUpdate = this.users.find(elem => elem.id == id);
    return Object.assign(userUpdate, params)

  }

  async deleteUser(id) {

    const indexUser = this.users.findIndex(elem => elem.id == id);
    this.users.splice(indexUser, 1)
    return this.users;

  }

}

module.exports = userService;
