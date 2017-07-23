var sendAndRecordMail = require('../');

var mongodb = require('mongodb');
mongodb.connect("mongodb://127.0.0.1:27017/sendMailLogs", function(error, db) {
    var storage = sendAndRecordMail.storage.get('mongodb', {client: db, collection: 'mailrecord'});
    var mailClient = sendAndRecordMail.mailClient.get('sendgrid', {key: 'your-key'});
    var sendAndRecord = new sendAndRecordMail.sendAndRecord(storage, mailClient, console.log, {});
    sendAndRecord.sendMail('shemna.k.beevi@gmail.com', 'beevishemna@gmail.com', 'Testing..', 'Hi....');
});
