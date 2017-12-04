var MailClientBase = require('./base.js');
var sendgrid = require('sendgrid');
var helper = require('sendgrid').mail;

class MailClientSendgrid extends MailClientBase {
    constructor(opts) {
        super(opts);
        opts = opts || {};
        this.key = opts.key;
        this.sendgrid = sendgrid(opts.key);
    }

    send(from, to, subject, body, opts) {
        opts = opts || {};
        return new Promise((resolve, reject) => {
            var fromEmail = new helper.Email(from);
            var toEmail = new helper.Email(to);
            var content = new helper.Content(opts.contentType || 'text/plain', body);
            var mail = new helper.Mail(fromEmail, subject, toEmail, content);

            var request = this.sendgrid.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            this.sendgrid.API(request)
            .then(resolve)
            .catch(resolve);
        });
    }
}

module.exports = MailClientSendgrid;
