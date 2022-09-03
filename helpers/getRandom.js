const GET_RANDOM = async (users) => {
  try {
    const singleUser = await users[Math.floor(Math.random() * users.length)];
    return singleUser;
  } catch (error) {
    return error;
  }
};

module.exports = GET_RANDOM;
