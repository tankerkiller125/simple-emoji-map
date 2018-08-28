process.stdout.write(
    '\u001b[96m\u001b[1mGenerating simple emoji map...\u001b[0m'
);

require('../build').then(() =>
    console.log('\u001b[96m\u001b[1m 👍\u001b[0m\n')
);
