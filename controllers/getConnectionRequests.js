// importing user model so that we 
// can get the data of the users 
// who requested to connect 

const User = require("../models/User");

exports.getConnectionRequests = async (req, res) => {

    try {
        const user = await User.findById(req.userPayload.id)

        // console.log(user.connectionRequests.length);

        const requestingUserData = []

        for(let i = 0; i < user.connectionRequests.length; i++){

            const requestingUser = await User.findById(user.connectionRequests[i])
            requestingUserData.push(requestingUser)

        }
        // console.log(requestingUserData)
        // console.log(requestingUserData.length)

        return res.status(200).json({
            success: true,
            ConnectionRequests: requestingUserData,
            message: "Fetching of conenction requests done successfully.."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting conection requests please try again later"
        })
    }

    

}