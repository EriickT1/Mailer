const nodemailer = require('nodemailer');

const enviar = (to,subject,text) => {

return new Promise((resolve,reject)=>{

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'eriick1324@gmail.com',
    pass: "gjomwphifuermhao",
    },
    })
let mailOptions = {
    from: 'eriick1324@gmail.com',
    to,
    subject,
    text,
}
        

transporter.sendMail(mailOptions, (err, data) => { 
    if (err) {
        reject(err);
    }

    if (data) {
        resolve(data);
    }
})
})
};
module.exports = enviar;