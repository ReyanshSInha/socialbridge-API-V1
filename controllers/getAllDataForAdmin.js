// import user model to get the admin data 

const User = require("../models/User")

require("dotenv").config()

exports.getAllDataForAdmin = async (req, res) => {

    try {
        const Admin = await User.findById(process.env.ADMIN_ID, "firstName lastName email totalMatches totalRegistration totalVerifiedUsers verificationRequests")
     // console.log(Admin)
    res.status(200).json({
        success: true,
        AdminData: Admin,
        message: "Admin data retrieved succesfully..."
     })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "could get admin data please try again later"
        })
    }
    

}