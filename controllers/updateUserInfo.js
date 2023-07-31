const User = require("../models/User")
// importing cloudinary to upload the file to it 
const cloudinary = require("cloudinary").v2
// importing the builtin file system module to delete the temp files from the server 
const fs = require("fs")

exports.updateUserInfo = async (req, res) => {
    

    try {
        const user = await User.findByIdAndUpdate(req.userPayload.id, {

            QuestionOne: req.body.questionOne,
            QuestionTwo: req.body.questionTwo,
            QuestionThree: req.body.questionThree,
            QuestionFour: req.body.questionFour,
            QuestionFive: req.body.questionFive,
            QuestionSix: req.body.questionSix,
            QuestionSeven: req.body.questionSeven,
            QuestionEight: req.body.questionEight,
            avatar: req.body.avatar,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phone,
            registration: req.body.registration,
            instagramHandle: req.body.instagram,
            linkedinHandle: req.body.linkedIn,
            interestOne: req.body.interestOne,
            interestTwo: req.body.interestTwo,
            interestThree: req.body.interestThree,
            interestFour: req.body.interestFour,
            course: req.body.course,
            branch: req.body.branch
    
        }, {new: true})
    
        res.status(200).json({
            success: true,
            updatedUser: user,
            message: "User profile updated successfully..."
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "User profile could not be updated...try again later.."
        })

    }

    


}
