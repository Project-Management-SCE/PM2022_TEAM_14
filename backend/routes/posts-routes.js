const express = require('express');
const {check} = require('express-validator')

const postsControllers = require('../controllers/posts-controller');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


// Order matters !!!
router.get('/', postsControllers.getAllPosts)

router.use(checkAuth)

router.post('/',
    [
      check('title')
          .not()
          .isEmpty(),
        check('description')
            .isLength({min: 5}),
        check('address')
            .not()
            .isEmpty()

    ],
    postsControllers.createPost)

module.exports = router;