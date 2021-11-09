var roleModel = require('../models/Role');
const mongoose = require('mongoose');

exports.insert = function(req,res,next){
    var details = new roleModel({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name
    });
    details.save().then(
        doc =>
        {
            res.status('200').json({message: "Role Inserted!",status : 'success',data : doc})
        }
    ).catch(
        err=>{
            res.json({message : "Role Not Inserted!",status: 'fail',data : err})
        }
    )
}
exports.update = function(req,res){
    role_id = req.params.id;
    var newValues ={ $set: {name : req.body.name }}
    roleModel.findByIdAndUpdate(role_id,newValues,{"new" : true},function(err,result){
        if(err){
            console.log(err);
            res.send({message:"Error While Updating Data!",status:'fail'})
        }
        else{
            res.send({message:"Successfully Updated!",status : 'success',result})
        }
    })
}
exports.delete = function(req,res){
    roleModel.findByIdAndDelete(req.params.id).then((result)=>{
        if(!result){
            return res.status(404).send({message : "Not Found",status : "fail"})
        }
        res.send({message : "Role Deleted!",status : "success"});
    })
}