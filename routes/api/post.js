const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { postRequest } = require('../../controllers/postController');

router.post('/addPost', auth, postRequest);

module.exports = router;