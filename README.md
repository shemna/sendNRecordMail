SendNRecordMail ids used to send mails with a mail client and record the activity in db with status

Current supported mail sender is sendgrid and db is mongo.

Usage:

    var sendNRecordMail = require('sendNRecordMail');
    var mongodb = require('mongodb');
    mongodb.connect(config.mongo.uri, function(error, db) {
        var storage = sendNRecordMail.storage.get('mongodb', {client: db});
        var mailClient = sendNRecordMail.mailClient.get('sendgrid', {key: '<your key>'});
        var mailTracker = new sendNRecordMail.sendAndRecord(storage, mailClient, console.log, {});
        mailTracker.sendMail(sendAddress, options.fromEmail || config.returnEmailAddress, emailSubject, body, options); 
    });

