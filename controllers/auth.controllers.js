const { sequelize, Account } = require("../models");
const bcryptjs = require('bcryptjs');
const { results, key } = require("../config");
const jwt = require("jsonwebtoken");

const sigin = async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await Account.create({ email, password: hashPassword, displayName, type: null, stastus: null });
    res.status(200).send(results(true, null, newUser));
  } catch (error) {
    res.status(500).send(error)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const accountLogin = await Account.findOne({ where: { email } })
    if (accountLogin) {
      const isAuth = bcryptjs.compareSync(password, accountLogin.password)
      if (isAuth) {
        const payload = {
          id: accountLogin.id,
          type: accountLogin.name,
        }
        console.log(payload)
        const token = jwt.sign(payload, key)
        res.status(200).send(results(true, 'login success', { token }))
      } else {
        res.status(401).send(results(false, "password don't match", null))
      }
    } else {
      res.status(401).send(results(false, "email don't match", null))
    }
    res.status(200).send({ accountLogin })
  } catch (error) {
    res.send(error)
  }

}

module.exports = {
  login,
  sigin
}
