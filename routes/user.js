const express = require("express")
const router = express.Router()

// signup
const  {signup}  = require("../controllers/signup")
router.post("/signup", signup)


// login
const {login} = require("../controllers/login")
router.post("/login", login)

// explore 

const { explore } = require("../controllers/explore")
const { authN, authZ } = require("../middlewares/authorization")
router.get("/explore",authN,authZ, explore)

// get a single profile data
const { getProfile } = require("../controllers/profile")
router.get("/explore/:userID", authN, getProfile)

// registration form submission and idcard upload for verification 
// step 1: get ID card 
const { uploadIdCard } = require("../controllers/uploadIdCard")
router.post("/registration/upload",authN, uploadIdCard)

// the uploading of idcard and updation of registration data could not be done in one route 
// because of not being able to send both files and body in one request in {postman}
// step 2: get all the data from the user update profile
const { updateUserInfo } = require("../controllers/updateUserInfo")
router.post("/updateUserInfo",authN, updateUserInfo)

// step 3: send verification request to the admin
const { sendVerificationRequest } = require("../controllers/sendVerificationRequest")
router.post("/sendVerificationRequest", authN, sendVerificationRequest)

// routes for admin
// get all data 
// const { getAllDataForAdmin } = require("../controllers/getAllDataForAdmin")
// router.get("/getAllDataForAdmin",authN, getAllDataForAdmin)
// no need for this as we have intercepted the request for the explore page adn sent back admin data 
// if we are able to switch frontend according to that as well then no need for another route 

// get verification requests for admin 
const {getVerificationRequests} = require("../controllers/verificationRequests")
router.get("/getVerificationRequests", authN, getVerificationRequests)


// accept verification request
const { acceptVerificationRequest } = require("../controllers/acceptVerificationRequest")
router.post("/acceptVerificationRequest/:userID", authN, acceptVerificationRequest)

// delete verification request
const { deleteVerificationRequest } = require("../controllers/deleteVerificationRequest")
router.post("/deleteVerificationRequest/:userID", authN, deleteVerificationRequest)

// sending and accepting connection requests
// send connect request
const { connectionRequest } = require("../controllers/connectionRequest")
router.post("/sendConnectionRequest/:userID",authN, connectionRequest)

// get pending connection requests 
const { getConnectionRequests } = require("../controllers/getConnectionRequests")
router.get("/viewConnectionRequests",authN, getConnectionRequests)

// accept connection request
const { acceptRequest } = require("../controllers/acceptConnectionRequest")
router.post("/acceptConnectionRequest/:userID",authN, acceptRequest)

// delete connection request..pending
const { deleteRequest} = require("../controllers/deleteConnectionRequest")
router.post("/deleteConnectionRequest/:userID", authN, deleteRequest)

// get all of your matches
const { getMatches } = require("../controllers/getMatches")
router.get("/getMatches",authN, getMatches)

// setup blind match route
const { blindMatch } = require("../controllers/blindMatch")
router.post("/blindMatch", authN ,blindMatch)

// view blind matches...
const { getBlindMatchData } = require("../controllers/getBlindMatchData")
router.get("/getBlindMatchData", authN, getBlindMatchData)

//get admin data
const { getAdminData } = require("../controllers/getAdminData")
router.get("/getAdminData", authN, getAdminData)

// logout user
const { logout } = require("../controllers/logout")
const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport")
router.post("/logout", authN, logout)

module.exports = router