// importing the User model to send request to the admin 
const User = require("../models/User")
require("dotenv").config()

exports.sendVerificationRequest = async (req, res) => {
    try {
        const Admin = await User.findByIdAndUpdate(process.env.ADMIN_ID, {
            $addToSet: { verificationRequests: req.userPayload.id }
        }, {new: true})
    
        res.status(200).json({
            success: true,
            Admin: Admin,
            message: "verification request sent succesfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "could not send verification request please try again later..."
        })
    }

    
    

}