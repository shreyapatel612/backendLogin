var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var userController = require('../controllers/users');
var jwt = require('jsonwebtoken');
var Auth = require('../middleware/auth');
var userModel = require('../models/User');

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/adduser',userController.add_user);
router.put('/editprofile/:userId',userController.updateuser);
router.get('/logout',userController.logout);
router.get('/getuser/:id',userController.getuserById);
router.delete('/delete/:id',userController.delete);
router.get('/',function(req,res){
  userModel.find({},function(err,data){
    res.send({message:"Successfully Fetch All Users",status : 'success',data : data});
  })
})


module.exports = router;
