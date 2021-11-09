var express = require('express');
var router = express.Router();
var postMessageModel = require('../models/PostMessage');
const mongoose = require('mongoose');
const postController = require("../controllers/posts");


router.post('/',postController.createposts);
router.get('/',postController.getPosts);
router.patch('/:id',postController.updatePost);
router.delete('/:id',postController.deletePost);
router.patch('/:id/likePost',postController.likePost);

module.exports = router;