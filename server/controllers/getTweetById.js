const tweetData = require('../model/tweetData');

const getTweetById = (req,res) => {
    tweetData.find({id: req.params.id}, {_id: 0, __v: 0}, (err,data)=>{
        if(err){
            res.json(err);
        }
        res.json(data);
    });
};

module.exports = getTweetById;