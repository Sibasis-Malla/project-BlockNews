const tweetData = require('../model/tweetData');

const postTweet = (req,res) => {
    const tweet = new tweetData({
        id: req.body.id,
        author_id: req.body.author_id,
        text: req.body.text,
        user: req.body.user,
        username: req.body.username,
        decisionTaken: req.body.decisionTaken,
        decision: req.body.decision,
        timer: req.body.timer
    })
    tweet.save((err, tweets)=>{
        if(err){
            res.send(err);
        }
        res.json(tweets);
    })
};

module.exports = postTweet;