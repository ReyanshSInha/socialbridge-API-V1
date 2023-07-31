// importing cloudinary to upload the file to it 
const cloudinary = require("cloudinary").v2
// importing the builtin file system module to delete the temp files from the server 
const fs = require("fs")
// importing the user module to add the image url to the profile of the user
const User = require("../models/User")

exports.uploadIdCard = async (req, res) => {

    // adding in the checks so that empty requests are not sent 
    if(!req.files){
        // deletes the file form the tmp folder 
        fs.unlinkSync(req.files.image.tempFilePath)
        return res.status(400).json({
            success: false,
            message: "Please provide an image"
        })
    }

    if(req.files.image.mimetype.split("/")[0] !== "image"){
        // deletes the file form the tmp folder 
        fs.unlinkSync(req.files.image.tempFilePath)
        return res.status(400).json({
            success: false,
            message: "Please upload a image filetype"
        })
    }

    // console.log(req.files.image.tempFilePath)
    // console.log(req.files.image.name.split(".")[1])

    // creating a proper file path with extension 
    const filePathWithoutExtension = req.files.image.tempFilePath
    const fileExtension = req.files.image.name.split(".")[1]
    const filePath = `${filePathWithoutExtension}.${fileExtension}`
    console.log(filePath)


    // uploading the file to cloudinary
    try {
        const uploadResult = await cloudinary.uploader.upload(
            req.files.image.tempFilePath, {
                use_filename: true,
                folder: "verification_college_IDcard"
            }
        )
    
        console.log(req.body)
    
        const user = await User.findByIdAndUpdate(req.userPayload.id, {
            idCardUrl: uploadResult.secure_url 
        }, {new: true})
        
        // deletes the file form the tmp folder 
        fs.unlinkSync(req.files.image.tempFilePath)
        res.status(200).json({ 
            user: user,
            image: { src: uploadResult.secure_url } 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload you ID...please try again later"
        })
    }
    
}