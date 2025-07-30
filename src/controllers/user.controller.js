import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log("Register endpoint hit");
    console.log("Request body:", req.body);

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Request body missing or not parsed. Please send application/json data."
        });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    console.log("Dudaram Choudhary", email);

    res.status(200).json({
        success: true,
        message: "User registered",
        data: { email }
    });
});

export { registerUser };