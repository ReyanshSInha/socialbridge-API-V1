const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: false,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: "NotVerified",
        enum: ["Admin", "Verified", "NotVerified"],   
    },

    connectionRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    matches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    blindMatches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    course: {
        type: String,
        default: "B.Tech",
        enum: ["B.Tech", "M.Tech", "Design", "PhD" ]
    },

    branch: {
        type: String,
        default: "Chemical Engg"
    },

    avatar: {
        type: Number,
        default: -1,
    },

    dateOfBirth: {
        type: String,
    },

    phoneNumber: {
        type: String,
    },

    instagramHandle: {
        type: String,
    },

    linkedinHandle: {
        type: String,
    },

    registration: {
        type: Boolean,
        default: false
    },

    idCardUrl: {
        type: String,
    },

    QuestionOne: {
        type: String,
        default: "User has not answered this question"
    },

    QuestionTwo: {
        type: String,
        default: "User has not answered this question"

    },

    QuestionThree: {
        type: String,
        default: "User has not answered this question"

    },

    QuestionFour: {
        type: String,
        default: "User has not answered this question"

    },

    QuestionFive: {
        type: String,
        default: "User has not answered this question"

    },
    QuestionSix: {
        type: String,
        default: "User has not answered this question"

    },

    

    QuestionSeven: {
        type: String,
        default: "User has not answered this question"

    },

    QuestionEight: {
        type: String,
        default: "User has not answered this question"

    },

    interestOne: {
        type: String,
        default: "none"
    },

    interestTwo: {
        type: String,
        default: "none",
    },

    interestThree: {
        type: String,
        default: "none",
    },

    interestFour: {
        type: String,
        default: "none"
    },

    // admin properties

    verificationRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    totalMatches: {
        type: Number,
    },

    totalRegistrations: {
        tyoe: Number,
    },

    totalVerifiedUsers: {
        type: Number,
    }



    
})


module.exports = mongoose.model("user", userSchema)