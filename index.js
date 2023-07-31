const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
require("dotenv").config()
const cloudinary = require("cloudinary").v2
const fileUpload = require("express-fileupload")
// importing cors to send request from the frontend
const cors = require('cors');


// configering cloudinary 
try {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      })
      console.log("connected to cloud succesfully")
} catch (error) {
    console.log(error)
}

// Enable CORS
app.use(cors());
// using cookieParser to parse the token in the cookie 
app.use(cookieParser())
// using express.json to parse the body of the incoming reques 
app.use(express.json())
// setting up the file upload middleware to parse the incoming FileSystem
app.use(fileUpload({
    useTempFiles: true
}))


// this connects us to the external database
require("./config/dbConnect").connect()

// port on which the server is spun
const PORT = process.env.PORT || 4000;

// importing routes and mounting them
const user = require("./routes/user")

// app. use signifies that all types of request on the route /api/v1 has to go thorugh it
app.use("/api/v1", user)

// this spins up the server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})


// ####### Pending Issues #######
// #TODO = hide password and email in response of explore profiles
// #TODO: = show only verified accounts in the explore section
// #TODO: = the person logged in should not get his own profile in the explore/intention section
// #TODO = explore recomendation
// #TODO = Delete match request


// #TODO = report a user to admin - {
    // 1. admin get the report request with the reason 
    // 2. admin verifies the request
    // 3. admin accepts or decline the report
    //      if accepted then reported user verification gets cancelled
    //      if declined then nothing happens and the reporting user gets a mail 
    //         saying we found your report reason not good so no actoin is taken
// }






// ###### challenges faced ######
// 1) not being able to submit all the registration form details and idcard photo at once 

// 2) not being able to understand 
//    how to set token in the header even though i 
//    understood the getting part setting was still ambiguous



// completed ##########
// #TODO = verify the user from admin - {
// Three step process _ 
// 1: admin gets all the connection requests..
// 2: admin accepts or declines a user..
// 3: user recieves a accept or decline email..
// }

// #TODO = submit registration form
        // A two step process
            // 1) user submits the written docs 
            // 2) user submits Id card