const mongoose = require("mongoose")

const blindMatchSchema = new mongoose.Schema({
    matches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
})


module.exports = mongoose.model("blindMatch", blindMatchSchema)