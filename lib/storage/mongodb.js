const StorageBase = require('./base.js');
const _ = require('lodash');

class StorageMongodb extends StorageBase {
    constructor(opts) {
        super(opts);
        this.client = opts.client;
        this.collection = opts.collection || 'mailrecords';
    }

    save(sendOpts, sendResult, options) {
        options = options || {};
        new Promise((resolve, reject) => {
            this.client.collection(this.collection, function(err, collection){
                if(err instanceof Error) return reject(err);

                // build doc from array values
                const doc = _.pick(sendOpts, ['from', 'to', 'subject', 'body']);
                doc.date = new Date().toString();
                doc.result = sendResult;
                doc.sourceUrl = options.source;
                doc.more = _.omit(options, ['source', 'fromAddress'])

                // update document
                collection.insert(doc, function(err){
                    if(err instanceof Error) return reject(err);
                    resolve(undefined);
                });
            });
        })
    }
}

module.exports = StorageMongodb;