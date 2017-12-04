var SendAndRecord = function(storage, mailClient, logger, options) {
    this.logger = logger;
    this.storage = storage;
    this.options = options;
    this.mailClient = mailClient;
};

SendAndRecord.prototype.sendMail = function(from, to, subject, body, options) {
    return new Promise((resolve, reject) => {
        var sendOpts = {
            to: to,
            from: from,
            subject: subject,
            body: body,
        };
        this.mailClient.send(from, to, subject, body, options)
        .then((sendResult) => {
            return  this.storage.save(sendOpts, sendResult, options);
        })
        .then(resolve)
        .catch(reject)
    });
}

exports = module.exports = SendAndRecord;
