const { results } = require("../../config");

const checkEmailExists = (Model) => async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    const checkEmail = await Model.findOne({ where: { email } });
    if (checkEmail) {
      res.status(409).send(results(409, false, 'Email already exists', null));
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const checkEmailNotExist = (Model) => async (req, res, next) => {
  const { email } = req.body;
  console.log('aaaaaaaaaaaaaaaaaaaaa', req.account);
  try {
    const checkEmail = await Model.findOne({ where: { email } });
    if (checkEmail) {
      next();
    } else {
      res.status(401).send(results(401, false, 'Email does not exist', null));
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const checkExist = (Model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const detail = await Model.findOne({ where: { id } });
    if (detail) {
      next();
    } else {
      res.status(404).send(results(404, false, `Item does not exist`, null));
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  checkEmailExists,
  checkExist,
  checkEmailNotExist
}