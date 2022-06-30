const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/home/', userController.view);
router.post('/home/', userController.find);
router.get('/home/adduser', userController.form);
router.post('/home/adduser', userController.create);
router.get('/home/edituser/:id', userController.edit);
router.post('/home/edituser/:id', userController.update);
router.get('/home/viewuser/:id', userController.viewall);
router.get('/home/:id',userController.delete);
  
module.exports = router;