require("dotenv").config({ path: __dirname + "/.env" });
const {
  tClient,
  twitterClient,
  twitterBearer,
} = require("./src/twitterClient.js");
const TwitterApi = require("./src/TwitterApi.js");

const tweet = async () => {
  try {
    //Print my info
    let twitterApi = new TwitterApi();
    let myInfo = await twitterApi.getMyAccountInfo();
    console.log("My username is:", myInfo.username);
  } catch (e) {
    console.log("Error is:", e);
  }
};

tweet();
