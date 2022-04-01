const express = require('express');
const {check} = require('express-validator')

const postsControllers = require('../controllers/posts-controller');
const router = express.Router();



// Order matters !!!
router.get('/', postsControllers.getAllPosts)


module.exports = router;