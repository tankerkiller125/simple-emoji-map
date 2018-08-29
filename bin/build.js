const build = require('../build');

process.stdout.write(
    '\u001b[96m\u001b[1mGenerating simple emoji map...\u001b[0m'
);

build().then(({ ignored, used }) => {
    console.log('\u001b[96m\u001b[1m 👍\u001b[0m');

    if (ignored.length) {
        console.warn(
            `\u001b[96m-> Used (${used.length}):`,
            ...used.slice(0, 10)
        );
        console.warn(
            `\u001b[96m-> Ignored (${ignored.length}):`,
            ...ignored.slice(0, 10)
        );
    }

    console.log();
});
