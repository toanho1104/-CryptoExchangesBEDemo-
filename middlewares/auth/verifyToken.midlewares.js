const jwt = require("jsonwebtoken");
const { results, key } = require("../../config");

const authenticate = (req, res, next) => {
  const token = req.header('token')
  try {
    const decode = jwt.verify(token, key);
    req.account = decode;
    next();
  } catch (error) {
    res.status(401).send(results(false, 'you need to login'));
  }
}

const authorize = (arrRole) => (req, res, next) => {
  const { account } = req;
  if (arrRole.findIndex((type) => account.type === type) > -1) {
    next();
  } else {
    res.status(403).send(results(false, 'Limited access'));
  }
};

module.exports = {
  authenticate,
  authorize,
};