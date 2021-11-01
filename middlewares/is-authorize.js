const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      const error = new Error("User not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      const error = new Error("User Not autenticated.");
      error.statusCode = 401;
      throw error;
    }
    req.id = decodedToken.id;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
