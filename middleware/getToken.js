const jwt = require("jsonwebtoken");
const token = (req) => {
  const receivedJwt = req.headers["authorization"].split(" ")[1];
  const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
  return decodedJwt;
};

module.exports = token;
