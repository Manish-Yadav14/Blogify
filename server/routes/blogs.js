const express = require('express');
const router = express.Router();
const {updateBlog,getBlogs,updateProfileAndSlug} = require('../controllers/blogs')

router.route('/updateBlog').post(updateBlog);
router.route('/getBlogs').post(getBlogs);
router.route('/updateProfile').post(updateProfileAndSlug);
module.exports = router;