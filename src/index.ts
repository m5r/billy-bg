"use strict";

import Twit from "twit";

require("dotenv").config();

import logger from "./logger";
import { buildTweet } from "./tweet-builder";

const t = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const SELF_TWITTER_ID = "1201734235620429824";
const NARAKU_TWITTER_ID = "1117199467759976450";

try {
	const stream = t.stream("statuses/filter", { follow: NARAKU_TWITTER_ID });
	logger.log("listening...");

	stream.on("tweet", (tweet) => {
		logger.log("tweet", tweet.id);

		// TODO: vérifier que c'est pas un RT
		// TODO: vérifier que l'autheur === Naraku
		if (tweet.in_reply_to_status_id === null) {
			logger.log("replying to", tweet.id_str);

			const options = {
				in_reply_to_status_id: tweet.id_str,
				status: buildTweet(),
			};

			t.post("statuses/update", options)
				.then(() => logger.log("replied to ", tweet.id_str))
				.catch(err => logger.error("err", err));
		}
	});

	stream.on("error", (error) => {
		logger.error("error", error);
	});
} catch (err) {
	logger.error("err", err);
}
