function success(message, data) {
  return {
    message,
    data
  }
}

function error(error, data) {
  return {
    error
  }
}

module.exports = {
  success,
  error
}
