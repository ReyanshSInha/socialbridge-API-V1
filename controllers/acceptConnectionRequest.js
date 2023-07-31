// importing user model to store the accepted 
// user id in the matches section and
//  delete it from the request section

const User = require("../models/User")

exports.acceptRequest = async (req, res) => {

    try {
        //#TODO = uske matches mein tm apna id daloge
        // matchUserOne - jiska request tm accept kiye (id params mein aaya hai)
        console.log(req.userPayload.id)
        const matchUserOne = await User.findByIdAndUpdate(req.params.userID, {
            $addToSet: { matches: req.userPayload.id }
        }, {new: true})
        console.log(matchUserOne)


        //#TODO = apne matches mein tm uska id daloge
        // matchUserTwo - tmhara khud ka id 
        // console.log(req.userPayload.id)
        
        console.log(req.params.userID)
        const matchUserTwo = await User.findByIdAndUpdate(req.userPayload.id, {
            $addToSet: {matches: req.params.userID }
        }, {new: true})
        // console.log(matchUserTwo)

        // tell the admin that one match has been done 
        try {
            // updating the number of verified user data for admin 
            // console.log("updating")
            const numberOfMatches = await User.findByIdAndUpdate(process.env.ADMIN_ID, {
                $inc: { totalMatches: 1 }
            }, {new: true})
            // console.log(numberOfMatches.totalMatches)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

        // #TODO = apne requests mein se uska id hata doge
        // remove connection request
        const removeConnectionRequest = await User.findByIdAndUpdate(req.userPayload.id, {
            $pull: { connectionRequests: req.params.userID }
        }, {new: true})

        console.log(removeConnectionRequest)

        res.status(200).json({
            success: true,
            messagee: "Connection Request accepted succesfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            messagee: "Error in accepting the request try again later.."
        })
    }
    

}
