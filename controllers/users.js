
const mongoose = require('mongoose');
var userModel = require('../models/User');
var roleModel = require('../models/Role');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { name } = require('ejs');


exports.register = function(req,res,next){

    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            return res.json({"message": "password issue"});
        }else{
    var details = new userModel({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        password : hash,
        email : req.body.email,
        roleid : req.body.roleid
    });
    details.save().then(
        doc =>
        {
            res.status('200').json({message: "User Created!",status : 'success',data : doc})
        }
    ).catch(
        err=>{res.json({message : "User Not Created!",status: 'fail',data : err})}
    )
        }
})
}

exports.login = function(req,res,next){
    userModel.findOne({ email : req.body.email },function(err,result){
        if(!result){
            res.send({message : "Email And Password Did Not Match",status: 'fail'});
        }
        else
        {
            if(!bcrypt.compareSync(req.body.password, result.password)){
                res.send( { message : "The password is invalid",status: 'fail'});
            }
            else{
                var token = jwt.sign({name : req.body.name , password : req.body.password},'secret');
                result['token'] = token;
                res.send({message : "login successfully!",status:'success',data : result,token : token});
            }
        }
    })
}


exports.add_user = function(req,res,next){
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            return res.json({"message": "password issue"});
        }else{
    var details = new userModel({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        password : hash,
        email : req.body.email,
        roleid : req.body.roleid
    });
    details.save().then(
        doc =>
        {
            res.status('200').json({message: "User Created!",status : 'success',data : doc})
        }
    ).catch(
        err=>{res.json({message : "User Not Created!",status: 'fail',data : err})}
    )
        }
})
}

exports.update = function(req,res,next){ 
   user_id = req.params.userId;
   bcrypt.hash(req.body.password,10,function(err,hash){
       if(!err){
           var newValues ={ $set: {name : req.body.name, password : hash, email : req.body.email} };
           userModel.findByIdAndUpdate(user_id,newValues,{"new" : true},function(err,result){
               if(err){
                   res.send({message:"Error While Updating Data!",status:'fail'})
               }
               else{
                   res.send({message:"Successfully Updated!",status : 'success',result})
               }
           })
       }else{
           res.send({message:"Password Not Proper!",status:'Fail'});
       }
   })
}

exports.getuserById = function(req,res,next){
    userModel.findById(req.params.id ,function(err,result){
        if(err){
            res.send({message:"Error in getting data",status:'fail'})
        }else{
            res.send({message:"Successfully Data Fetched",status:'success',data:result})
        }
    })
}

exports.delete= function(req,res,next){
    userModel.findByIdAndDelete(req.params.id).then((result)=>{
        if(!result){
            return res.status(404).send({message : "Not Found",status : "fail"})
        }
        res.send({message : "User Deleted!",status : "success"});
    })
}

exports.logout = function(req,res,next){
    req.session.destroy(function (err) {
        res.send({message:"Successfully Logout! ",status:'success'})
    })
}

