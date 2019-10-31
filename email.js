var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'Gmail',
    auth: {
        user: 'maletaveras1@gmail.com',
        pass: 'Salinger98'
    }
});

module.exports = function sendEmail(receive,message,subject){
    var mailOptions = {
        from: 'maletaveras@gmail.com',
        to: receive,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

