"use strict";

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

export function buildTweet() {
    return 'Billy' + getPossibleSurname() + getPossibleStp() + getPossibleSpace() + getQuestionMarks();
}