const { results } = require("../../config");
const { Account } = require("../../models");

const checkStatus = (arrStatus) => (req, res, next) => {
  const { user } = req;
  if (arrRole.findIndex((role) => user.role === role) > -1) {
    next();
  } else {
    res.status(401).send(results(401, false, "Unverified account", null));
  }
};
const checkStatusAccount = (arrStatus) => async (req, res, next) => {
  const { id, type, status } = req.account;
  try {
    const accountDetail = await Account.findByPk(id);
    if (arrStatus.findIndex((status) => accountDetail.status === status) > -1) {
      next();
    } else {
      res.status(401).send(results(401, false, "Invalid request", null));
    }
  } catch (error) {
    res.status(500).send(error);
  }

};
module.exports = {
  checkStatusAccount
}