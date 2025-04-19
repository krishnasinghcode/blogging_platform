import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Signup controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log(name,email,password); //test
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({ message: "Signup successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Signup Unsuccessful!" });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Generating JWT token
        const secretKey = process.env.JWT_SECRET || "fallbackSecretKey";
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            secretKey,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful!",
            token,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Login unsuccessful!" });
    }
};
