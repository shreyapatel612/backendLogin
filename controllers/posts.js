var postMessageModel = require('../models/PostMessage');
var mongoose = require('mongoose');
const PostMessage = require('../models/PostMessage');

exports.getPosts = async (req,res)=>{
   try{
       const postMessages = await PostMessage.find()
        console.log(postMessages);
        res.status(200);
        res.send({message : "Succesfully fetched",status : "success",data : postMessages});
   }catch(error){
       console.log(error);
        res.status(404);
        res.send({message:"Error in getting post",status : fail});
   }
}


exports.createposts = async (req,res)=>{
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        res.status(200);
        res.send({message : "Succesfully created",status : "success",data : newPost});
    }catch(error){
        console.log(error);
        res.status(404);
        res.send({message:"Error in creating post",status : fail});
    }
}

exports.updatePost = async (req,res) =>{
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.deletePost= function(req,res,next){
    PostMessage.findByIdAndDelete(req.params.id).then((result)=>{
        if(!result){
            return res.status(404).send({message : "Not Found",status : "fail"})
        }
        res.send({message : "User Deleted!",status : "success"});
    })
}

exports.likePost = async (req,res) =>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}  