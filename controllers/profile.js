// importing database to get a single profile
const User = require("../models/User")

exports.getProfile = async (req, res) => {

    try {
        const profile = await User.findById(req.params.userID)

        return res.status(200).json({
            success: true,
            data: profile
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong...try again later..."
        })
    }

    

}