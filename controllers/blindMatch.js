// import the blind match collectoin from the data base 
const BlindMatch = require("../models/BlindMatch")
const User = require("../models/User")


exports.blindMatch = async (req, res) => {

    // const matchQue = await BlindMatch.create({})

    const matchQue = await BlindMatch.findById("64b8ca074595b3b1b5c8ecc0")

    if(matchQue.matches.length !== 0){

        try {
            // check if the user request the match is already in the match que or not
            // if yes then respond with a error 
           const alreadyInQue = matchQue.matches.includes(req.userPayload.id)
           console.log(alreadyInQue)
           if(alreadyInQue){
            return res.status(403).json({
                success: false,
                message: "User Already in que..."
            })
           }

        } catch (error) {
            return res.status(500).json({
                success: true,
                message: "Server error could not check the que.."

            })
        }

        try {
            const waitingUserId = matchQue.matches[0]
            // match que is not empty so match the users...
            const matchedWaiting = await User.findByIdAndUpdate(waitingUserId, {
                $addToSet: { blindMatches: req.userPayload.id }
            })

            // add this wating user to the blindmatch array of the requesting user 
            const matchedRequesting = await User.findByIdAndUpdate(req.userPayload.id, {
                $addToSet: { blindMatches: waitingUserId }
            }, {new: true})

            // remove the waitng user from the que 
            const removeWaiting = await BlindMatch.findByIdAndUpdate("64b8ca074595b3b1b5c8ecc0", {
                $pull: { matches:waitingUserId }
            })

            res.status(200).json({
                success: true,
                message: "user matched successfully",
                data: matchedRequesting
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",

            })
        }
        
    }else {

        try {
            // if que is empty then add user to que 
            const addedToQue = await BlindMatch.findByIdAndUpdate("64b8ca074595b3b1b5c8ecc0", {
                $addToSet: { matches: req.userPayload.id }
        }, {new: true})

        res.status(200).json({
            success: true,
            message: "User added to match que"
        })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error could not add user to match que.."
            })
        }
        
    }    
}