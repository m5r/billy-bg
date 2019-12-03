"use strict";

// TODO: typescript

const Twit = require("twit");
require("dotenv").config();

const t = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const SELF_TWITTER_ID = '1201734235620429824';
const NARAKU_TWITTER_ID = '1117199467759976450';

function getRandomInt(min, max) {
    const intMin = Math.ceil(min);
    const intMax = Math.floor(max);
    return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
}

function getQuestionMarks() {
    return '?'.repeat(getRandomInt(1,6));
}

function getPossibleSpace() {
    return Math.random() > 0.5 ? ' ' : '';
}

function getPossibleSurname() {
    const roll = Math.random();
    
    if (roll < 1 / 3) {
        return ' bg';
    } else if (roll < 2 / 3) {
        return ' frérot';
    } else {
        return '';
    }
}

function getPossibleStp() {
    return Math.random() > 0.5 ? ' stp' : '';
}

function buildTweet() {
    return 'Billy' + getPossibleSurname() + getPossibleStp() + getPossibleSpace() + getQuestionMarks();
}

try {
    const stream = t.stream('statuses/filter', { follow: NARAKU_TWITTER_ID });
    console.log('listening...');

    stream.on('tweet', (tweet) => {
        console.log('tweet', tweet.id);

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
