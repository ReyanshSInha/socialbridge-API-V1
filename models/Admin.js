const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    pendingRequests: [{
        type: mongoose.Schema.Types.ObjectId,
    }],

    totalMatches: {
        type: Number,
    },

    totalRegistraton: {
        type: Number,
    },

    totalVerifiedUser: {
        type: Number,
    }

    

})

module.exports = mongoose.model("Admin", adminSchema)