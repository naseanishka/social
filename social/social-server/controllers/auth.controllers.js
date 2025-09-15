// 3 steps : Sign-up, Sign-in, Sign-out
// Create 3 controllers for each of these functionalities
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

// Importing user model
import User from "../models/user.model.js";

// 4 fields for Sign-in - email, password, name, userName and they all shd be checked that they dont exist already

export const signUp = (async (req, res) => {
    const { name, userName, email, password } = req.body;

    try {
        // check if user already exists
        // Validate User Data

        if (!name || !userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate Email

        const existingUserEmail = await User.findOne({ email });
        // this return a boolean value

        if (existingUserEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Validate Username

        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Both checks passed
        // password should be hashed before saving to DB
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Now create user after all this checks
        // Use the model, add data to it and save it to DB

        // creating a user
        const newUser = await User.create({ name, userName, email, password: hashedPassword });
        const token = await genToken(newUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true, // cookie cannot be accessed only on HTTP requests (by client-side scripts),
            sameSide: "strict", // cookie will only be sent in requests originating from the same site, 
            maxAge: 30 * 24 * 60 * 60 * 1000 // cookie will expire after 30 days
        })


        res.status(201).send(newUser);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})
export const signIn = (async (req, res) => {
    // username and password
    // need to check if user exists
    // use bcrypt to compare passwords
    // if all good, send user data
    const { userName, password } = req.body;
    // console.log(req.body);
    try {
        if (!userName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ userName });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // User exists, now compare passwords
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await genToken(existingUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true, // cookie cannot be accessed only on HTTP requests (by client-side scripts),
            sameSide: "strict", // cookie will only be sent in requests originating from the same site, 
            maxAge: 30 * 24 * 60 * 60 * 1000 // cookie will expire after 30 days
        })
        // All good, send user data
        res.status(200).json({ message: "User logged in" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
})


// CSRF 