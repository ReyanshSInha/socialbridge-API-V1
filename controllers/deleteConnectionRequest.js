const User = require("../models/User")

exports.deleteRequest = async (req, res) => {

    try{
        // const user = await User.findById(req.userPayload.id)
        console.log("User Payload " , req.userPayload)

        try {
           
            const removeConnectionRequest = await User.findByIdAndUpdate(req.userPayload.id, {
                $pull: { connectionRequests: req.params.userID }
            }, {new: true})

            res.status(200).json({
                success: true,
                data: removeConnectionRequest
            })
        } catch (error) {
            console.log(e)
        }
        

        

    }catch(e){
        return res.status(200).json({
            success: false,
            message: "Failed to delete connection request try again later"
    })
    }

}