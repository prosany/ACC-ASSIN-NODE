const success = (message, result) => {
  return {
    status: 1,
    message: message,
    result,
  };
};

const failed = (message, result) => {
  return {
    status: 0,
    message: message,
    result,
  };
};

module.exports = { success, failed };
