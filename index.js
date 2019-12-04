"use strict";

// TODO: typescript

const Twit = require("twit");
require("dotenv").config();

const { buildTweet } = require("./tweet-builder");

const t = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const SELF_TWITTER_ID = '1201734235620429824';
const NARAKU_TWITTER_ID = '1117199467759976450';

try {
    const stream = t.stream('statuses/filter', { follow: NARAKU_TWITTER_ID });
    console.log('listening...');

    stream.on('tweet', (tweet) => {
        console.log('tweet', tweet.id);

        // TODO: vérifier que c'est pas un RT
        // TODO: vérifier que l'autheur === Naraku
        if (tweet.in_reply_to_status_id === null) {
            console.log('replying to', tweet.id_str);

            const options = {
                in_reply_to_status_id: tweet.id_str,
                status: buildTweet(),
            };
            
            t.post('statuses/update', options)
                .then(() => console.log('replied to ', tweet.id_str))
                .catch(err => console.error('err', err));
        }
    });

    stream.on('error', (error) => {
        console.error('error', error);
    });
} catch (err) {
    console.error('err', err);
}
