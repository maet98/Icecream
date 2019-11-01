var nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    //service: 'Ex: Gmail',
    //auth: {
        //user: '{Insert email here}',
        //pass: '{Insert password here}'
    //}
});
/**
 * @author Miguel Estevez
 * @description Se encarga de enviar un email
 * @param receive persona que va a recibir el email
 * @param message mensaje que estara en el cuerpo del email
 * @param subject el asunto del email.
 */
module.exports = function sendEmail(receive,message,subject){
    var mailOptions = {
        //from: '{email here}',
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

