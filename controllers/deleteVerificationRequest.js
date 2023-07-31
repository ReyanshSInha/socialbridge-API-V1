// importing User model to get admin data and remove the verification request from there

const User = require("../models/User")
require("dotenv").config()
// importing the mail sending function 
const sendEmail = require("./sendEmail")

exports.deleteVerificationRequest = async (req, res) => {

    try {

        const userWhoseRequestIsBeingDeleted = await User.findById(req.params.userID)

        // send decline email 
        let email = userWhoseRequestIsBeingDeleted.email
        // console.log(email)
        const subject = "Account Verification Request Declined"
        const body = "We're sorry to say that your account cannot be verified due to inappropriate data you've submitted..try submitting the request again..."
        email = "sakshi.ranjan0502@gmail.com"
        console.log(email)
        try {
            const sendMail = await sendEmail(email,subject, body )
            console.log(sendMail)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "error in sending mail"
            })
        }
        

        // removing the verification request from the admin 
        const removeVerificationRequest = await User.findByIdAndUpdate(process.env.ADMIN_ID, {
            $pull: { verificationRequests: req.params.userID }
        }, {new: true})

        res.status(200).json({
            success: true,
            upadtedAdminData: removeVerificationRequest,
            message: "verificaton request declined succesfully.."
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "could not decline verification request please try again later..."
        })

    }

}