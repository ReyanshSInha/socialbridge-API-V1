// importing user model to interact with the data base and put the id of the 
// connection requesting user in the connection request array of the requested user
const User = require("../models/User")


exports.connectionRequest = async (req, res) => {

    // console.log(req.userPayload.id)
    // console.log(req.params.userID)

    // send connection request and upadate the 
    // connection requests array of the recieving user
    const userProfile = await User.findById(req.params.userID)
     const alreadyMatched = userProfile.matches.includes(req.userPayload.id)
     console.log("already matched", alreadyMatched)

     if(alreadyMatched){
        return res.status(401).json({
            success: false,
            message: "Connot send connection request, user already matched.."
        })
     }

    try {
        const userRecievingRequest = await User.findByIdAndUpdate(req.params.userID, {
            $addToSet: { connectionRequests: req.userPayload.id }
        }, {new: true}) 
        console.log(userRecievingRequest)
        res.status(200).json({
            success: true,
            message: "connection request sent successfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to send connection request at the moment try again later"
        })
    }
    

}