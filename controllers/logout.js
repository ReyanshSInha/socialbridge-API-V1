// creating a route where 
// sending a post request deletes user tokens 

exports.logout = async (req, res) => {

    try {
        
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logged Out Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "There was some problem loggin user out try again later.."
        })
    }

}