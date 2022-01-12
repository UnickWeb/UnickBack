const express = require('express');
const userService = require('../services/userService');

const router = express.Router();
const service = new userService();


router.post('/', (req, res) => {
  const bodyUser = req.body;
  service.addUser(bodyUser);

  res.status(201).json(bodyUser);

});

router.patch('/:id', (req, res) => {

  const bodyUser = req.body;
  const { id } = req.params;

  const updateUser = service.updateUser(id, bodyUser);
  res.json(updateUser)

});

router.get('/', async (req, res) => {
  try {
    const users = await service.getAll();
    console.log(users);

    res.json(users)

  } catch (error) {
    next(error);
  }
});

router.get('/:idUsers', async (req, res, next) => {
  try {
    const { idUsers } = req.params;
    const userOne = await service.getOne(idUsers);
    res.status(200).json(userOne)
  } catch (error) {
    /*  res.status(404).json({
       message: error.message
     }) */
    next(error);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const users = service.deleteUser(id);
  res.json(users)
});





module.exports = router;
