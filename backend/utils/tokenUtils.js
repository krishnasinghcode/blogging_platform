import jwt from "jsonwebtoken";

export const generateTokens = (userId, email) => {
    const accessToken = jwt.sign(
        { id: userId, email },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};