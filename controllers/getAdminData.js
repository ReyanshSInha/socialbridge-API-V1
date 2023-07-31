require("dotenv").config()
const User = require("../models/User")

exports.getAdminData = async (req, res) => {
    console.log("Admin route activated")
        try {
            const verificationRequestData = []

            const Admin = await User.findById(process.env.ADMIN_ID, "firstName lastName email totalMatches totalRegistrations totalVerifiedUsers verificationRequests")
         // console.log(Admin)
            for(let i = 0; i < Admin.verificationRequests.length; i++){
                const requestingUser = await User.findById(Admin.verificationRequests[i])
                verificationRequestData.push(requestingUser)
            }
            console.log(verificationRequestData)
        res.status(200).json({
            success: true,
            AdminData: Admin,
            verificationRequests: verificationRequestData,
            message: "Admin data retrieved succesfully..."
         })
        } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "could not get admin data please try again later"
        })
    }
}