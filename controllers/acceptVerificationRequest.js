// importing the User model to change the verification status of teh requesting profile 
const User = require("../models/User")
require("dotenv").config()

// importing the send mail function to send the acceptance mail 
const sendEmail = require("./sendEmail")


exports.acceptVerificationRequest = async (req, res) => {
    console.log(sendEmail)
    try {
        
        const updatedVerificatinoStatus = await User.findByIdAndUpdate(req.params.userID, {
            status: "Verified"
        }, {new: true})

        // console.log(updatedVerificatinoStatus)
        try {
            // updating the number of verified user data for admin 
            console.log("updating")
            const numberOfVerfiedUsers = await User.findByIdAndUpdate(process.env.ADMIN_ID, {
                $inc: { totalVerifiedUsers: 1 }
            }, {new: true})
            console.log(numberOfVerfiedUsers.totalVerifiedUsers)

            // send acceptance email 
            let email = updatedVerificatinoStatus.email
            console.log(email)
            const subject = "Account verified"
            const body = "Congratsss....Your social bridge account has been verified, now you can view and send connection request to others..login to continue..."
            email = "reyanshsinha19@gmail.com"
            console.log(email)
            const sendMail = await sendEmail(email,subject, body )
            console.log(sendMail)

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        

        // console.log(numberOfVerfiedUsers)

        // removing the verification request from teh admin 

        const removeVerificationRequest = await User.findByIdAndUpdate(process.env.ADMIN_ID, {
            $pull: { verificationRequests: req.params.userID }
        }, {new: true})

        res.status(200).json({
            success: true,
            upadtedUserData: updatedVerificatinoStatus,
            updateAdminData: removeVerificationRequest,
            message: "User Verified succesfully..."
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "Could not accept verification request at the moment try again later..."
        })

    }

}



