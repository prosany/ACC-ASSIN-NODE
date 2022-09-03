const fs = require("fs");
const path = require("path");

module.exports = {
  GET_USERS: async () => {
    try {
      const { dir } = path.parse(__dirname);
      const data = fs.readFileSync(dir + "/database/users.json", "utf-8");
      const users = JSON.parse(data);
      return users;
    } catch (error) {
      return error;
    }
  },
};
