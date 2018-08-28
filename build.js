/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Flarum
 * Copyright (c) 2018 ReFlar
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const fs = require('fs');
const path = require('path');
const twemoji = require('twemoji/2/twemoji.npm');
const appRoot = require('app-root-path');
const getConfig = require('./src/config');

const outputPath = path.resolve(__dirname, 'generated/emojis.json');
const data = require('emojibase-data/en/data.json');

const alternative = {
    '👁️‍🗨️': '👁‍🗨',
};

module.exports = async () => {
    const config = await getConfig();
    let shortnames = config && config.shortnames;

    const twemojiFileNames = fs
        .readdirSync(appRoot + '/node_modules/twemoji/2/svg')
        .map(name => path.basename(name, '.svg'));

    const emojis = {};

    for (let e of data) {
        const emoji = alternative[e.emoji] || e.emoji;
        const emojiCode = getEmojiIconCode(emoji);

        if (!checkExistanceInTwemoji(emojiCode)) {
            console.error('Can not find', emoji, emojiCode);
            continue;
        }

        emojis[emojiCode] = e.shortcodes.concat(
            (shortnames && shortnames[emojiCode]) || []
        );
    }

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.writeFileSync(outputPath, JSON.stringify(emojis));

    function checkExistanceInTwemoji(code) {
        return twemojiFileNames.includes(code);
    }

    function getEmojiIconCode(emoji) {
        const U200D = String.fromCharCode(0x200d);
        return twemoji.convert.toCodePoint(
            emoji.indexOf(U200D) < 0 ? emoji.replace(/\uFE0F/g, '') : emoji
        );
    }
};
