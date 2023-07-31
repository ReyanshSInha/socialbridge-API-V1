const mongoose = require("mongoose")
require("dotenv").config()

exports.connect = async () => {

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("DB connected successfully") })
    .catch((error) => {
        console.log("DB connection failed")
        console.error(error)
        process.exit(1)
    })

}