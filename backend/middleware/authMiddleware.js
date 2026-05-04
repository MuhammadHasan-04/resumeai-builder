import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  //console.log("Headers:", req.headers);
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken || !authorizationToken.startsWith("Bearer")) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authorizationToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    // console.log("Decoded JWT:", decoded);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export { authMiddleware };
