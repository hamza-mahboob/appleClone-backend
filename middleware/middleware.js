import jwt from "jsonwebtoken";

export const authWithToken = async (req, res, next) => {
    try {
        req.headers.authorization && req.headers.authorization.startsWith("Bearer");
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "Token Invalid.Try again" });
        }
        jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(403).json({ message: "You are not autheticated" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
