const nodemailer = require("nodemailer")
const {google} = require("googleapis")

require("dotenv").config()
// Create a transporter using Gmail SMTP

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const REDIRECT_URI = process.env.REDIRECT_URI


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


async function sendEmail(email, subject, body) {
    try {
        
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "verifyatsocialbridge@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'socialbridge <verifyatsocialbridge@gmail.com>',
            to: `${email}`,
            subject: `${subject}`,
            text: `${body}`,
            html: `<h1>${body}</h1>`
          };

          const result = await transport.sendMail(mailOptions)
          return result

    } catch (error) {
        return error
    }
}

module.exports =  sendEmail;

// sendEmail()
// .then(
//     (result) => {
//         res.status(200).json({
//             success: true,
//             message: "Mail sendt Successfully",
//             result: result
//         })
//     }
//     )
//     .catch(
//         (error) => {
//             res.status(500).json({
//                 success: false,
//                 message: "Mail could not be sent...try again later...",
//                 error: error.message
//             })
//         }
//         )


  