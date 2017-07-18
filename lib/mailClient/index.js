var MailClientSendgrid = require('./sendgrid');

exports.get = function(type, opts) {
    if(type === 'sendgrid') return new MailClientSendgrid(opts);
}