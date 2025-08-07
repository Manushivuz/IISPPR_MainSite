import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; // Assuming you have an Admin model defined



const generateToken = (admin) => {
    if (!admin || !admin._id || !admin.email || !admin.role) {
        throw new Error("Invalid admin data for token generation");
    }
    return jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET);
}

const signUp = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(409).json({ message: "Admin with this email or username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        await newAdmin.save();
        return res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Sign up error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(admin);
        return res.status(200).json({ token, admin });
    } catch (error) {
        console.error("Sign in error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { signUp, signIn };