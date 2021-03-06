"use strict";

import Twit from "twit";

require("dotenv").config();

import logger from "./logger";
import bot from "./bot";
import buildTweet from "./tweet-builder";

const SELF_TWITTER_ID = "1201734235620429824";
const NARAKU_TWITTER_ID = "1117199467759976450";

const watchedUser = process.env.TWITTER_USER_ID ?? NARAKU_TWITTER_ID;
const stream = bot.watchUserTweets(watchedUser);
logger.log("waiting for new tweets from %s", watchedUser);

stream.on("tweet", async (tweet: Twit.Twitter.Status) => {
	logger.log("new tweet %s from %s", tweet.id_str, tweet.user.id_str);

	const isStandaloneStatus = !tweet.hasOwnProperty("in_reply_to_status_id") || tweet.in_reply_to_status_id === null;
	const isStatusFromWatchedUser = tweet.user.id_str === watchedUser;
	const isNotRetweet = !tweet.hasOwnProperty("retweeted_status");
	const shouldReplyToStatus = isStandaloneStatus && isStatusFromWatchedUser && isNotRetweet;
	if (shouldReplyToStatus) {
		logger.log("replying to", tweet.id_str);

		bot.tweet(`@${tweet.user.screen_name} ${buildTweet()}`, tweet.id_str);
	}
});

stream.on("error", (error) => {
	logger.error("stream error", error);
});
