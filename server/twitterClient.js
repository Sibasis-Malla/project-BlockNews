const {TwitterApi} = require("twitter-api-v2");

const client = new TwitterApi({
    appKey: "0zAheBV2T6orGHC5ggaZHpgPq",
    appSecret: "Xang5YgoUdZJaxnvFEwVHtveLm329pMMVJzBoOJtenCCdyoAGF",
    accessToken: "1463405061745221636-eW8ck7h6CzADNwQ51fW3AT9bv67ucm",
    accessSecret: "mDNmKysYe1tBXGbrAFfnqvoQAu3eRcxJgS3SHPkzlSNhC"
})

const rwClient = client.readWrite

module.exports = rwClient;