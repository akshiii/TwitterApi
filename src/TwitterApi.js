require("dotenv").config({ path: __dirname + "/.env" });
const { tClient, twitterClient, twitterBearer } = require("./twitterClient.js");

class TwitterApi {
  newTweets = [];
  myData = "";

  constructor() {
    this.newTweets = [];
    this.myData = "";
  }

  async createNewTweet(text) {
    const newTweet = await twitterClient.v2.tweet(text);
    this.newTweets.push(newTweet.id);
    return newTweet.data;
  }

  async createNewTweetWithPoll(text, pollDuration, options) {
    const { data: createdTweet } = await twitterClient.v2.tweet(text, {
      poll: {
        duration_minutes: pollDuration,
        options: options,
      },
    });
    this.newTweets.push(createdTweet.id);
    return createdTweet;
  }

  async getMyAccountInfo() {
    const meUser = await twitterClient.v2.me({
      expansions: ["pinned_tweet_id"],
    });
    this.myData = meUser.data;
    return meUser.data;
  }

  async deleteTweet(id) {
    let tweets = await twitterClient.v2.deleteTweet(id);
    return tweets.data.deleted;
  }
}

module.exports = TwitterApi;
