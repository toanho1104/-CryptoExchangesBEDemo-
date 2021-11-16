const { sequelize, Account } = require("../models");
const bcryptjs = require('bcryptjs');
const { results, key, mailKey, smg } = require("../config");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(mailKey);

const sigin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await Account.create({ email, password: hashPassword, type: "user", });
    const payload = {
      id: newUser.id,
      type: newUser.type,
      status: newUser.status,
    }
    const token = jwt.sign(payload, key)
    res.status(200).send(results(200, true, "Account successfully created", { token }));
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
        const token = jwt.sign(payload, key)
        if (accountLogin.type !== null) {
          res.status(200).send(results(200, true, 'login success', { token }))
        } else {
          res.status(401).send(results(401, false, 'unconfirmed email account;', { token }))
        }
      } else {
        res.status(401).send(results(401, false, "password don't match", null))
      }
    } else {
      res.status(401).send(results(401, false, "email don't match", null))
    }
  } catch (error) {
    res.send(error)
  }

}

const verifyAccountSendOTP = async (req, res) => {
  const { id } = req.account
  try {
    const accountDetail = await Account.findByPk(id);
    const secretKey = speakeasy.generateSecret({ length: 20 });
    await Account.update({ secretKey: secretKey.base32 }, {
      where: {
        id
      }
    });
    var otp = speakeasy.totp({
      secret: secretKey.base32,
      encoding: 'base32',
      step: 60
    });
    await sgMail.send(smg(accountDetail.email, otp));

    res.send(results(200, true, 'check your email'))
  } catch (error) {
    res.status(500).send(error)

  }
}
const verifyAccountGetOTP = async (req, res) => {
  const { id } = req.account
  const { otp } = req.body
  try {
    const accountDetail = await Account.findByPk(id);
    console.log(accountDetail.secretKey)
    const otpValidates = speakeasy.totp.verify({
      secret: accountDetail.secretKey,
      encoding: 'base32',
      token: otp,
      step: 60
    });
    console.log("otp", otpValidates)
    if (otpValidates) {
      await Account.update({ status: "lv1" }, {
        where: {
          id
        }
      });
      const payload = {
        id: accountDetail.id,
        type: accountDetail.type,
        status: accountDetail.status,
      }
      const token = jwt.sign(payload, key)
      res.status(200).send(results(200, true, "successful confirmation", { token }))
    } else {
      res.status(401).send(results(401, false, "validation failure"))
    }

  } catch (error) {
    res.status(500).send(error)

  }
}


module.exports = {
  login,
  sigin,
  verifyAccountSendOTP,
  verifyAccountGetOTP
}
