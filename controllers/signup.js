// importing the user model using which we will interact with the DB 
const User = require("../models/User")
// importing bcrypt to hash the user entered password 
const bcrypt = require("bcrypt")
require("dotenv").config()

// singup route handler
exports.signup = async (req, res) => {

    try {

        // getting data from request body 
        const {firstName, lastName, email, password, confirmPassword} = req.body

        // check if any of the input field is empty or not 
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All the fields must be filled properly"
            })
        }

        // console.log(`${password} ${confirmPassword}`)
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "password and confirm password must match"
            })
        }

        // if(!email.includes("@")){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid Email ID"
        //     })
        // }

        // check if the user already exist - (interact with the database using the User model)
        const existingUser = await User.findOne({email: email})
        // console.log/("existing user-")
        // console.log(existingUser)
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exist try logging in..."
            })
        }

        // hashing the password 

        let hashedPassword;

        try {
            
            hashedPassword = await bcrypt.hash(password, 10)

        } catch (error) {
            
            return res.status(500).json({
                success: false,
                message: "Error in hashing the password"
            })

        }

        console.log(hashedPassword)


        // creating an entry for user signup in the data base...
        try {

            console.log("user creation Started")
            try{
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword
                })
                console.log(user)

            }catch(e) {
                console.log(e)
            }
            console.log("userCreation")
            // console.log("userData" + user)

            // tell the admin that a new user has been registered
            try {
                // updating the number of verified user data for admin 
                // console.log("updating")
                const numberOfRegistrations = await User.findByIdAndUpdate('64ba76ed5b6c81c601b24283', {
                    $inc: { totalRegistrations: 1 }
                }, {new: true})
                // console.log(numberOfMatches.totalMatches)
                // console.log(numberOfRegistrations)
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Number of registration could not be upadted for admin"
                })
            }

            return res.status(200).json({
                success: true,
                // user: user,
                message: `User created successfully`
            })

        } catch (error) {
            
            return res.status(500).json({
                success: false,
                message: "User cannot be signedup please try again later..."
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User could not be registered please try again later"
        })
    }

}