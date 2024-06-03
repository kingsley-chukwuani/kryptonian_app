// cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 }); // 5 minutes TTL

module.exports = cache;
