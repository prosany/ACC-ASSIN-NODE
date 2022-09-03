const fs = require("fs");
const path = require("path");
const { GET_USERS } = require("./getUsers");

module.exports = {
  STORE_USERS: async (user) => {
    try {
      const { dir } = path.parse(__dirname);
      const prevUsers = await GET_USERS();
      const updated = [...prevUsers, user];
      fs.writeFileSync(dir + "/database/users.json", JSON.stringify(updated));
      return true;
    } catch (error) {
      return error;
    }
  },
  UPDATE_USERS: async (user) => {
    try {
      const { dir } = path.parse(__dirname);
      const updated = [...user];
      fs.writeFileSync(dir + "/database/users.json", JSON.stringify(updated));
      return true;
    } catch (error) {
      return error;
    }
  },
};
