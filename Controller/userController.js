const { validationResult} = require('express-validator'); 
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");



exports.SingIn = async (req, res) => {
    try {
        // Use the validation schema directly in the route
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        // Sign in logic
        const user = await User.SignIn(req.body.email, req.body.password);

        // Generate JWT token with email and role
        const token = jwt.sign(
            { email: user.Email, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "Login successful", token });
    } catch (error) {
        const errorMessage =
            error.message === "User not found" || error.message === "Invalid password"
                ? "Invalid email or password"
                : "Login Failed";

        console.error("Login error:", error);
        return res.status(401).json({ error: errorMessage });
    }
};


