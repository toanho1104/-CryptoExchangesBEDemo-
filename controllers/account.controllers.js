const { results } = require('../config')
const { Account, sequelize } = require('../models')

const getDetailAccount = async (req, res) => {
  const { id } = req.account
  try {
    const accountDetail = await Account.findByPk(id)
    res.status(200).send(results(true, undefined, {
      data: {
        displayName: accountDetail.displayName,
        email: accountDetail.email
      }
    }))
  } catch (error) {
    res.status(500).send(error)
  }
}
// const updateAccount = async (req, res) => {
//   const { id } = req.account
//   const { email, fullName, TypeID, stastusID } = req.body
//   try {
//     await Accounts.update(
//       { email, fullName, TypeID, stastusID },
//       {
//         where: {
//           id,
//         },
//       }
//     );
//     const [accountDetail] = await sequelize.query(`
//     SELECT Ac.id , Ac.email, Ac.fullName,Ac.avatar, Act.name as type, Acs.name as status, Act.name as type, Ac.createdAt, Ac.updatedAt FROM Accounts as Ac
//     INNER JOIN AccountTypes as Act
//     ON Ac.TypeID=Act.id
//     INNER JOIN AccountStastus as Acs
//     ON Ac.stastusID=Acs.id
//     WHERE Ac.id = ${id}
//     `)
//     res.status(200).send(results(true, null, { data: accountDetail[0] }));
//   } catch (error) {
//     res.status(500).send(error)
//   }
// }


module.exports = {
  getDetailAccount,
  // updateAccount
}