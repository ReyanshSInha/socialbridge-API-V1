// importing jsonwebtoken to setup login token 
const jwt = require("jsonwebtoken")

// importing bcrypt to verify password 
const bcrypt = require("bcrypt")

// importing env file for importing jwt secret 
require("dotenv").config()

// importing User model form the db file to search for the user details in the DB 
const User = require("../models/User")


// login route handler 
exports.login = async (req, res) => {
    try {
        
        // get data from the request body 
        const { email, password } = req.body

        // checking if any of the feild is blank 
        if(!email || !password){
            return res.status(401).json({
                success: false,
                messsage: "Email or Password feild cannot be empty"
            })
        }

        // finding the user details in the dattabase 
        const user = await User.findOne({email: email})
        // console.log(user)
        if(!user){
            return res.status(500).json({
                success: false,
                messsage: "User does not exist try signingup first"
            })
        }

        // now since the user exists in the
        // database and we have its data 
        // in the user variable lets match the passwrds

        const passwordVerified = await bcrypt.compare(password, user.password)
        console.log(passwordVerified)
        // if password matches then generate
        //  a jwt token with a payload of 
        // user id, email, and status 

        // creating a payload 
        const payload = {
            id: user._id,
            email: user.email,
            status: user.status
        }

        if(passwordVerified){
            console.log("password verification successful..")
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })
           
            console.log("token creation successful...")            
            console.log("token " + token)
            // user = user.toObject()
            user.password = undefined
            console.log(user)

            // setting up the cookie with options
            const options = {
                expires: new Date( Date.now() + (3 * 24 * 60 * 60 * 1000) ),
                // httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                user: user,
                token: token,
                message: "User logged in and token set in the header",
            })            

        }else{
            return res.status(403).json({
                success: false,
                message: "Incorrect Password"
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "cannot login user please try again later",
            error
        })
    }
    

}


