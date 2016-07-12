'use strict';
/* global describe, it, beforeEach */
const assert = require('assert');
const utils = require('../src/utils');

describe('utils', () => {
    describe('formatTime function', () => {
        it('should be return with "00:00" if time 0', () =>
            assert.strictEqual(utils.formatTime(0), '00:00')
        );

        it('should be return with "00:05" if time 5e3', () =>
            assert.strictEqual(utils.formatTime(5e3), '00:05')
        );

        it('should be return with "00:10" if time 1e4', () =>
            assert.strictEqual(utils.formatTime(1e4), '00:10')
        );

        it('should be return with "01:05" if time 6.5e4', () =>
            assert.strictEqual(utils.formatTime(6.5e4), '01:05')
        );
    })
});