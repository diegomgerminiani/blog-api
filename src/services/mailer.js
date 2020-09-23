const path = require('path')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({ 
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

transport.verify(function(error, success) {
    if (error) {
        console.log(`
            Não foi possível realizar a conexão SMTP.
            Por favor, verifique suas credenciais...

            ${error}
        `);
    } else {
        console.log("Conexão SMTP Estabelecida com sucesso!");
    }
  });

transport.use('compile', hbs({
    viewEngine: {
        extName: '.html',
        defaultLayout: null,
        partialsDir: path.resolve('./src/resources/mails/'),
        layoutsDir: path.resolve('./src/resources/mails/'),
    },
    viewPath: path.resolve('./src/resources/mails/'),
    extName: '.html'
}));

module.exports = transport;