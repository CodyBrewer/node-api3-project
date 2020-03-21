const users = require('../users/userDb.js');

// Logger logs the requests method url and the local time MM/DD/YY HHMMSS(12hr) to the console
function logger(req, res, next) {
  const { method, url } = req;
  const current = new Date(Date.now());
  const timestamp = current.toLocaleString();
  console.log(`METHOD: ${method}, URL: ${url}, TIMESTAMP: ${timestamp}`);
  next();
}

// Validates the user id on every request that expects a user id parameter
async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const validUser = await users.getById(id);
    if (validUser) {
      req.user = validUser;
      console.log('valid user: ', validUser);
    } else {
      res.status(404).json({ message: 'user not found by that id' });
    }
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
  next();
}
// Validate User Data contains name to create new user
function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      const { name } = req.body
      req.name = name;
      next();
    } else {
      res.status(400).json({ error: { message: 'missing required name field' } });
    }
  } else {
    res.status(400).json({ error: { message: 'missing user data' } });
  }
}

// Validate Post Data contiains text to create new post
function validatePost(req, res, next) {
  const { body } = req;
  if (body) {
    const { text } = body;
    if (text) {
      req.text = text;
      next();
    } else {
      res.status(400).json({ error: { message: 'missing required text field' } });
    }
  } else {
    res.status(400).json({ error: { message: 'missing post data' } });
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
