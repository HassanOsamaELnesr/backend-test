const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;


exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log("Auth Header:", authHeader); 

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("Extracted Token:", token); 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token not found" });
    }

    console.log(token)
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(401).json({ message: "Invalid or malformed token" });
        }
        else {

            console.log("Decoded Token Data:", decoded);
            req.user = decoded;
            next();
        }
    });


};


exports.checkRole = (role) => {
    return (req, res, next) => {
        console.log("User Role from Token:", req.user);

        if (!req.user || !req.user.role) {
            return res.status(403).json({
                status: "error",
                message: "User role not found in token"
            });
        }

        if (req.user.role === role) {
            next();
        } else {
            return res.status(403).json({
                status: "error",
                message: `Access denied. Required role: ${role}, but got: ${req.user.role}`
            });
        }
    };
};
