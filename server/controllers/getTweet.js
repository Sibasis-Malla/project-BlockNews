const tweetData = require('../model/tweetData');

const getTweet = (req,res) => {
    tweetData.find({}, (err, tweets)=>{
        res.json(tweets);
    })
}

module.exports = getTweet;