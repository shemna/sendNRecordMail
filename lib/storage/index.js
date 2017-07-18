var StorageMongodb = require('./mongodb');

exports.get = function(type, opts) {
    if(type === 'mongodb') return new StorageMongodb(opts);
}