const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios').default;
const rwClient = require('./twitterClient');

dotenv.config();

const router = require('./routes/router.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const rateLimiter = require('./middleware/rateLimiter');
app.use(rateLimiter);

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err);
    })

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server is running at port ${port}`);
});

var since_id = null;
const params = {
    'media.fields': 'url',
    'expansions': 'author_id',
    'tweet.fields': "created_at",

}

const tweet = async()=>{
    try {
       // console.log("Asigala")
        if(since_id){
            params.since_id = since_id;
        }
        const jsTweets = await rwClient.v2.search('blocknewsv1', params);
        if(jsTweets){
            for await (const tweet of jsTweets) {
                //console.log(tweet);
                setData(tweet);
            }
            since_id = jsTweets.meta.newest_id;
        }
        setTimeout(tweet, 5000);
    } catch (e) {
        console.error(e)
    }
};

const setData = async(tweet)=>{
    try{
        const user = await rwClient.v2.user(tweet.author_id);
        tweet.username = user.data.username;
        tweet.user = user.data.name;
        tweet.decisionTaken = false;
        tweet.decision = false
        tweet.timer = tweet.created_at;
        // var time = new Date(tweet.created_at);
        // tweet.timer = time.setMinutes(time.getMinutes()+20);
        // console.log(tweet);
        const response = await axios.post("http://localhost:5000/post", tweet);
        console.log(response.status);
    } catch(e){
        console.error(e);
    }
}

tweet();