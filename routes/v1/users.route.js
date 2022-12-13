const express = require('express');
const usersController = require('../../controllers/users.controllers');

const router = express.Router();

router.route('/all')
    .get(usersController.getAllUsers);

router.route('/random')
    .get(usersController.getRandomUser);

router.route('/save')
    .post(usersController.saveUser);

router.route('/update')
    .patch(usersController.updateUser);

router.route('/delete')
    .delete(usersController.deleteUser);

module.exports = router;