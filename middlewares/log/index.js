const logFeature = (message) => (req, res, next) => {
  console.log('========================');
  console.log(message);
  console.log('========================');
  next();
};

module.exports = {
  logFeature,
};