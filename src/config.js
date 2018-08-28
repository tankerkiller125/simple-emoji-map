const cosmiconfig = require('cosmiconfig');
const { name } = require('../package.json');

const explorer = cosmiconfig(name, {
  searchPlaces: [
      ".simple-emoji-map",
      ".simple-emoji-map.json",
    ],
});

module.exports = () => explorer.search().then(e => e && e.config);
