const jwt = require("jsonwebtoken");

const Adminauthentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.split(" ")[1], "masai", (err, decoded) => {
        console.log(decoded)
        // next();
      if (decoded) {
        console.log(decoded)
        req.body.userID = decoded.userID;
        next();
      } else {
        res.status(401).send({ message: "Please Login First" });
      }
    });
  } else {
    res.status(401).send({ message: "Please Login First" });
  }
};

module.exports = {
    Adminauthentication,
};