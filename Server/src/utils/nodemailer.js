import dotenv from 'dotenv';
dotenv.config()
import nodemailer from 'nodemailer'

const transporter= nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

const sendEmail = async (mailOptions)=>{
    console.log("yaha print karvao",process.env.USER,process.env.PASS)
    try {
        console.log("yaha aa gya hu ma 23")
        const info = await transporter.sendMail(mailOptions);
        console.log("email sent",info.response)
        return info.response
    } catch (error) {
        console.log("error occured while sending email",error)
        throw error;
    }
}

export default sendEmail