"use strict";

import Twit from "twit";

import logger from "./logger";

const t = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

export default {
	async tweet(status: string, inReplyToStatusId: string): Promise<void> {
		try {
			const options: Twit.Params = { in_reply_to_status_id: inReplyToStatusId, status };

			await t.post("statuses/update", options);

			logger.log("replied to %s", inReplyToStatusId);
		} catch (error) {
			logger.error("error while tweeting", error)
		}
	},
	watchUserTweets(userId: string): Twit.Stream {
		return t.stream("statuses/filter", { follow: userId });
	}
};