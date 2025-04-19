import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization'); // Get token from frontend request

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        // Remove "Bearer " prefix if present
        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

        // Verify JWT using the secret key from environment variables
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        // Attach user details to request
        req.user = verified;
        console.log(verified)
        next(); // Proceed to the next middleware
    } catch (err) {
        console.log(`JWT Verification Error: ${err.message}`);

        res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};
