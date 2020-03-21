const express = require('express');
const userDB = require('./userDb.js');
const postsDB = require('../posts/postDb');
const { validateUser, validateUserId, validatePost } = require('../middleware');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const { name } = req.body;
  if (name) {
    const user = { name };
    if (user != null) {
      console.log(user);
      userDB.insert(user).then((inserted) => {
        console.log(inserted);
        res.status(201).json({ user: inserted });
      }).catch((err) => console.log(err));
    }
  } else {
    res.status(401).json({ message: 'Please ensure you are providing a name for the user you are trying to add' });
  }
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
  const { id } = req.user;
  const { text } = req.body;
  if (id && text) {
    const insertedPost = postsDB.insert({ user_id: id, text });
    if (insertedPost) {
      res.status(201).json({ insertedPost });
    } else {
      res.status(500).json({ message: 'error inserting post' });
    }
  }
});

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const users = await userDB.get();
    if (users) {
      res.status(200).json({ users });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  // do your magic!
  const { user } = req;
  try {
    const userGot = await userDB.getById(user.id);
    if (userGot) {
      res.status(200).json({ user: userGot });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // do your magic!
  const { user } = req;
  try {
    const userPosts = await postsDB.get(user.id);
    if (userPosts) {
      res.status(200).json({ posts: userPosts });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.delete('/:id', validateUserId, async (req, res) => {
  // do your magic!
  const { id } = req.user;
  userDB.remove(id)
    .then((deleted) => {
      res.status(204).json({ deleted });
    }).catch((error) => {
      res.status(500).json({ error });
    });
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // do your magic!
  const { id } = req.user;
  const { name } = req.body;

  if (id && name) {
    userDB.update(id, { name })
      .then((updated) => {
        // console.log(updated);
        res.status(200).json(updated);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
});

module.exports = router;
