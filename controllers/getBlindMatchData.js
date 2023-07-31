// importing the user db model to get the blind match data 
const User = require("../models/User")


exports.getBlindMatchData = async (req, res) => {

    try {
        const user = await User.findById(req.userPayload.id)

        // console.log(user.connectionRequests.length);

        const requestingUserData = []

        for(let i = 0; i < user.blindMatches.length; i++){

            const requestingUser = await User.findById(user.blindMatches[i], "_id avatar firstName lastName")
            requestingUserData.push(requestingUser)

        }
        // console.log(requestingUserData)
        // console.log(requestingUserData.length)

        return res.status(200).json({
            success: true,
            blindMatches: requestingUserData,
            message: "Fetching of Blind matches data done successfully.."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting blind match data.. please try again later"
        })
    }

    

}