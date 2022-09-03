const { v4: uuidv4 } = require("uuid");

const model = {
  gender: "string",
  name: "string",
  contact: "object",
  address: "string",
  photoUrl: "string",
};

module.exports = {
  validSingleUser: async (req, res, next) => {
    let valid = 0;
    const user = req.body;
    const keys = Object.keys(user);
    for (let data of keys) {
      if (typeof user[data] === model[data]) {
        valid += 1;
      } else {
        return res.send({
          status: 0,
          message: `Validation error, ${data} must be ${model[data]}`,
        });
      }
    }
    if (valid === 5) {
      user.id = uuidv4();
      next();
    } else {
      return res.send({
        status: 0,
        message: "Validation error, Please provide a valid user.",
      });
    }
  },
  validUser: async (req, res, next) => {
    let valid = 0;
    const user = req.body;
    const keys = Object.keys(user);
    for (let data of keys) {
      if (typeof user[data] === model[data]) {
        valid += 1;
      } else {
        return res.send({
          status: 0,
          message: `Validation error, ${data} must be ${model[data]}`,
        });
      }
    }
    if (valid === 5) {
      next();
    } else {
      return res.send({
        status: 0,
        message: "Validation error, Please provide a valid user.",
      });
    }
  },
};
