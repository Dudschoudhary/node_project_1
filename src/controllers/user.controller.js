import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import { User } from "../models/user.modal.js";

import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

    // get use details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images
    // check for avtar
    // upload them to cloudinaryy
    // cleater user object - create entry in db
    //  remove password and refresh token field from response 
    // check for user creation 
    // return response

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Success",
        // receivedEmail: email,
        bodyReceived: req.body
    });
    const {email, fullName, username, password} = req.body
    console.log("Dudaram Choudhary",email);

    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files.coverImage[0]?.path;


    if(!avatarLocalPath) {
        throw new ApiError(400, "Avtar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user  = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refereshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "somthing went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registerd successfully")
    )
});
export { registerUser };
