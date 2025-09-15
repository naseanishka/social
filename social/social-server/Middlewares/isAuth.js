import jwt from 'jsonwebtoken'

const isAuth = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.userId = decoded.id; // Attach user ID to request object
        next();
    } catch (error) {
        return res.status(500).json({ message: "Unauthorized: Invalid token" });
    }
}
export default isAuth;