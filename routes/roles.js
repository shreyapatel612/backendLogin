var express = require('express');
var router = express.Router();
var roleModel = require('../models/Role');
const mongoose = require('mongoose');
const roleController = require("../controllers/roles");


router.post('/insert',roleController.insert);

router.get('/',function(req,res){
    roleModel.find({},function(err,data){
        res.send({status : 'success',message: "Successfully Fetch Roles",data :data});
    })
});
router.put('/update/:id',roleController.update);
router.delete('/delete/:id',roleController.delete);

module.exports = router;