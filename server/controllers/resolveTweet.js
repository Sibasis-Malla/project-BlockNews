const tweetData = require('../model/tweetData');
const rwClient = require('../twitterClient');

const resolveTweet = (req,res) => {
    tweetData.findOne({id: req.params.id}, async(err, data)=>{
        if(err){
            console.log(err);
        }
        if(!data) res.status(400).json({message: "Tweet Not Found"});
        const ndecision = req.body.decision;
        if(ndecision){
            data.decision = ndecision;
            data.decisionTaken = true;
            const decision = await rwClient.v2.reply("Decision taken on "+req.params.id+" to be "+req.body.decision, req.params.id);
        }
        else{
            res.status(201).json({message: "Tweet Not Replied decision not found"})
        }
        data.save();
        res.status(200).json({message: "Tweet Updated and replied", replyDecision: req.body.decision})
    })
}

module.exports = resolveTweet;