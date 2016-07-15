'use strict';
/* global describe, it, beforeEach */
const assert = require('assert');
const utils = require('../src/utils');

describe('utils', () => {
    describe('formatTime function', () => {
        it('should return with "00:00" if time 0', () =>
            assert.strictEqual(utils.formatTime(0), '00:00')
        );

        it('should return with "00:00" if time is NaN or infinite', () =>{
            assert.strictEqual(utils.formatTime(''), '00:00');
            assert.strictEqual(utils.formatTime(null), '00:00');
            assert.strictEqual(utils.formatTime(void 0), '00:00');
            assert.strictEqual(utils.formatTime(NaN), '00:00');
            assert.strictEqual(utils.formatTime(Infinity), '00:00');
            assert.strictEqual(utils.formatTime(-Infinity), '00:00');
        });

        it('should render properly the positive numbers', () =>{
            assert.strictEqual(utils.formatTime(1), '00:01');
            assert.strictEqual(utils.formatTime(10), '00:10');
            assert.strictEqual(utils.formatTime(65), '01:05');
        });

        it('should render properly the negative numbers', () =>{
            assert.strictEqual(utils.formatTime(-1), '-00:01');
            assert.strictEqual(utils.formatTime(-10), '-00:10');
            assert.strictEqual(utils.formatTime(-65), '-01:05');
        });
    })
});