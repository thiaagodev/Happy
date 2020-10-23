import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const {host, port, user, pass} =  require('./mail.json'); 

const transport = nodemailer.createTransport({
    host,
    port, 
    auth: {
      user,
      pass 
    }
});

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./resources/mail/'),
  extName: '.html',
}));

module.exports = transport;