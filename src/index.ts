"use strict";

import Twit from "twit";

require("dotenv").config();

import logger from "./logger";
import bot from "./bot";
import { buildTweet } from "./tweet-builder";

const SELF_TWITTER_ID = "1201734235620429824";
const NARAKU_TWITTER_ID = "1117199467759976450";

const stream = bot.watchUserTweets(NARAKU_TWITTER_ID);
logger.log("waiting for new tweets from ", NARAKU_TWITTER_ID);

stream.on("tweet", (tweet: Twit.Twitter.Status) => {
	logger.log("new tweet %s from %s", tweet.id_str, tweet.user.id_str);

	const isStandaloneStatus = tweet.in_reply_to_status_id === null;
	const isStatusFromNaraku = tweet.user.id_str === NARAKU_TWITTER_ID;
	const isNotRetweet = !tweet.hasOwnProperty("retweeted_status");
	const shouldReplyToStatus = isStandaloneStatus && isStatusFromNaraku && isNotRetweet;
	if (shouldReplyToStatus) {
		logger.log("replying to", tweet.id_str);

		bot.tweet(buildTweet(), tweet.id_str);
	}
});

stream.on("error", (error) => {
	logger.error("stream error", error);
});
