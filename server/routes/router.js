const router = require('express').Router();
const getTweetById = require('../controllers/getTweetById');
const postTweet = require('../controllers/postTweet');
const getTweet = require('../controllers/getTweet');
const resolveTweet = require('../controllers/resolveTweet');

router.get('/get', getTweet);
router.get('/get/:id', getTweetById);   
router.post('/post', postTweet);
router.put('/answer/:id', resolveTweet);

module.exports = router;