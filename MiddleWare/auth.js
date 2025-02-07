const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET; // Use the same secret key

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
   // console.log("Auth Header:", authHeader);  // Debugging: Log the header

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
   // console.log("Extracted Token:", token);  // Debugging: Log the token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token not found" });
    }

    // Verify the token using the jwtSecret
    console.log(token)
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err);  // Log the error for debugging
            return res.status(401).json({ message: "Invalid or malformed token" });
        }
        else{
    
        console.log("Decoded Token Data:", decoded);  // Log decoded token if verification is successful
        req.user = decoded;  // Attach decoded token data to the request
        next(); } // Proceed to the next middleware or route handler
    });
    
    
};

// Middleware to check the user role
exports.checkRole = (role) => {
    return (req, res, next) => {
        console.log("User Role from Token:", req.user);  // Log user details for debugging

        if (!req.user || !req.user.role) {
            return res.status(403).json({
                status: "error",
                message: "User role not found in token"
            });
        }

        if (req.user.role === role) {
            next();  // User has the required role, proceed
        } else {
            return res.status(403).json({
                status: "error",
                message: `Access denied. Required role: ${role}, but got: ${req.user.role}`
            });
        }
    };
};
