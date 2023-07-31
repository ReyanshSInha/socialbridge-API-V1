// importing JsonWebToken to get the payload 
// from the incoming token which was parsed in the cookie parser 
const jwt = require("jsonwebtoken")


// using dot env to get the secret key 
// to convert the token and get the payload 
require("dotenv").config()

// importing user model to send back limited data to notverified users 
const User = require("../models/User")


// creating a auth  middleware to check if the user has the token or not 
// if the user has the toekn which means that user has logged in
exports.authN = (req, res, next) => {

    try {

        const bearerToken = req.headers.authorization;
        console.log("beraer token " + bearerToken)
        let token;
        if (bearerToken) {
            token = bearerToken.split(' ')[1];
            // req.token = token;
        }
        

        console.log("Token in the auth middleware" + token)


        // token is not present 
        if(!token){
            return res.status(400).json({
                success: false,
                message: "User is not logged in - token missing",
            })
        }

        // if token is present 
        // verify the token and get the payload 
        try {
            
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload)
            req.userPayload = payload

        } catch (error) {
            
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })

        }
        next()


    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        })
    }

}

exports.authZ = async (req, res, next) => {

    console.log(req.userPayload)
    const {status} = req.userPayload
    console.log(status)

    if(status === "NotVerified"){
        
        User.find({ status: "Verified"  }, "firstName lastName course avatar branch QuestionOne")
        .then((Data) => {
            console.log(Data)
            return res.status(200).json({
                success: true,
                data: Data,
                message: "You are getting limited data since you are not verified"
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: "Error in getting profiles"
            })
        })
        
        
        
        

    }

    if(status === "Verified"){
        
        next()
    }

    if(status === "Admin"){
        // console.log("Admin route activated")
        try {
            const verificationRequestData = []

            const Admin = await User.findById(process.env.ADMIN_ID, "firstName lastName email totalMatches totalRegistration totalVerifiedUsers verificationRequests")
         // console.log(Admin)
            for(let i = 0; i < Admin.verificationRequests.length; i++){
                const requestingUser = await User.findById(Admin.verificationRequests[i])
                verificationRequestData.push(requestingUser)
            }
            console.log(verificationRequestData)

         next()
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "could not get admin data please try again later"
            })
        }
    }

}