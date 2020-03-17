// Logger logs the requests method url and the local time MM/DD/YY HHMMSS(12hr) to the console
function logger(req, res, next) {
  const { method, url } = req;
  const current = new Date(Date.now());
  const timestamp = current.toLocaleString();
  console.log(`METHOD: ${method}, URL: ${url}, TIMESTAMP: ${timestamp}`);
  next();
}

function validateUserId() {

}
function validateUser() {

}
function validatePost() {

}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}