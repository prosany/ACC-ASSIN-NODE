const { GET_USERS } = require("../helpers/getUsers");
const GET_RANDOM = require("../helpers/getRandom");
const { success, failed } = require("../helpers/messages");
const { STORE_USERS, UPDATE_USERS } = require("../helpers/saveUser");

module.exports = {
  randomUser: async (req, res, next) => {
    try {
      const users = await GET_USERS();
      const random = await GET_RANDOM(users);
      if (!random) {
        res.status(500).send(failed("Get a random user was failed.", {}));
      }
      res
        .status(200)
        .send(success("Get a random user was successful.", random));
    } catch (error) {
      next(error);
    }
  },
  allUsers: async (req, res, next) => {
    try {
      const { limit } = req.query;
      let users = await GET_USERS();
      // Limit users
      if (limit <= 0) {
        res
          .status(400)
          .send(
            failed("Opps! You need to choose atleast 1 user for limit to work.")
          );
      } else if (limit > 0) {
        users = users.slice(0, limit);
      }

      if (!users) {
        res.status(500).send(failed("Get all user was failed.", {}));
      }
      res
        .status(200)
        .send(
          success(
            limit && users.length >= limit
              ? `Get ${limit} user was successful.`
              : "Get all the users was successful.",
            users
          )
        );
    } catch (error) {
      next(error);
    }
  },
  saveUser: async (req, res, next) => {
    try {
      const response = await STORE_USERS(req.body);
      if (response) {
        res.status(201).send(success("Save a user was successful."));
      } else {
        res.status(500).send(failed("Save a user was failed."));
      }
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await GET_USERS();
      const slectedUser = await users.find((user) => user.id === id);
      if (!slectedUser) {
        return res.status(401).send(failed("User id not found."));
      }
      const filtered = await users.filter((user) => user.id !== id);
      const updatedData = [...filtered, { id, ...req.body }];
      const response = await UPDATE_USERS(updatedData);
      if (response) {
        return res.status(201).send(success("Update a user was successful."));
      } else {
        return res.status(500).send(failed("Update a user was failed."));
      }
    } catch (error) {
      next(error);
    }
  },
  bulkUpdate: async (req, res, next) => {
    try {
      if (req?.body?.length <= 0) {
        return res.status(500).send(failed("Please send array of ids"));
      }
      const users = await GET_USERS();
      let updatedUser = [];
      for (let data of req.body) {
        const selectedUser = await users.find((item) => item.id === data);
        const filtered = users.filter((item) => item.id !== data);

        let single = {
          ...selectedUser,
          name: `Mahabub Sany (${Math.floor(Math.random() * 1000)})`,
        };
        updatedUser = [...updatedUser, ...filtered, single];
      }

      const response = await UPDATE_USERS(updatedUser);
      if (response) {
        return res.status(201).send(success("Update a user was successful."));
      } else {
        return res.status(500).send(failed("Update a user was failed."));
      }
    } catch (error) {
      next({ ...error, message: "Please provide array of IDs" });
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await GET_USERS();
      const slectedUser = await users.find((user) => user.id === id);
      if (!slectedUser) {
        return res
          .status(401)
          .send(failed("Delete a user was failed. User ID is not found."));
      }
      const filtered = await users.filter((user) => user.id !== id);
      const response = await UPDATE_USERS(filtered);
      if (response) {
        return res.status(201).send(success("Delete a user was successful."));
      } else {
        return res.status(500).send(failed("Delete a user was failed."));
      }
    } catch (error) {
      next(error);
    }
  },
};
