// importing User model to interact with the
// db and get all the matches data of a user 

const User = require("../models/User")

exports.getMatches = async (req, res) => {

    try {
        const user = await User.findById(req.userPayload.id)

        // console.log(user.connectionRequests.length);

        const matchesData = []

        for(let i = 0; i < user.matches.length; i++){

            const matchedUser = await User.findById(user.matches[i])
            matchesData.push(matchedUser)

        }
        // console.log(matchesData)
        // console.log(matchedUser.length)

        return res.status(200).json({
            success: true,
            Matches: matchesData,
            message: "Fetching of Matches done successfully.."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting Matches please try again later"
        })
    }


}