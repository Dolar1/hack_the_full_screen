var nodemailer = require("nodemailer");
const dotenv = require('dotenv');
require('dotenv').config()

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD
    }
});

let maillist = [
  process.env.SEND_TO_1,
  process.env.SEND_TO_2,
  process.env.SEND_TO_3,
  process.env.SEND_TO_4,
  process.env.SEND_TO_5,
];

const sendMail = async(file)=>{

		let mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: maillist,
            subject: 'Help me brother in coding the solutions plz',
            text: 'Your one help can make me crack the compnay brother please i will remember your help..!!',
            attachments: [
               {
                filename: 'Question_from_Contest.png',
                path:`${file}`
               }
            ]
        };

        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                 console.log(`Error occurs`.bgRed.bold.italic.underline);
            }else{
             console.log(`Email sent!!!`.bold.italic.underline);
            }
        });

}

module.exports = sendMail;
