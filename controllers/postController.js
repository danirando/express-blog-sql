const { log } = require("console");
const { posts } = require("../db");

// INDEX
const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM `posts`";
  connection.query(sql, (err, results) => {
    if (err) throw err;

    res.json({
      data: results,
      status: 200,
    });
  });
};
// SHOW

const show = (req, res) => {
  const postId = parseInt(req.params.id);

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res
      .status(404)
      .json({ error: "404 not found", message: "Post non trovato" });
  }

  res.json({ data: post, status: 200 });
};

// STORE

const store = (req, res) => {
  const { title, content, image, tags } = req.body;

  let maxId = 0;
  for (const post of posts) {
    if (post.id > maxId) maxId = post.id;
  }
  const postId = maxId + 1;

  const newPost = { id: postId, title, content, image, tags };

  let isRequestMalformed = false;

  if (!title || typeof title !== "string" || title.length < 3)
    isRequestMalformed = true;

  if (typeof content !== "string") isRequestMalformed = true;

  if (typeof image !== "string") isRequestMalformed = true;

  if (!Array.isArray(tags)) isRequestMalformed = true;

  if (isRequestMalformed) {
    res.status(404).json({
      error: "400 bad request",
      message: "Request is malformed",
    });
    return;
  }

  posts.push(newPost);

  res.status(201).json(newPost);

  console.log(newPost);
};

// UPDATE

const update = (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content, image, tags } = req.body;
  const originalPost = posts.find((post) => post.id === post.id);

  const updatePost = { id: postId, title, content, image, tags };

  const originalPostIndex = posts.indexOf(originalPost);

  posts.splice(originalPostIndex, 1, updatePost);

  res.json(updatePost);
};

//  MODIFY

const modify = (req, res) => {
  const postId = parseInt(req.params.id);
  // const { title, content, image, tags } = req.body;
  const originalPost = posts.find((post) => post.id === post.id);

  if (!originalPost) {
    return res
      .status(404)
      .json({ error: "404 not found", message: "Post non trovato" });
  }

  const title = req.body.title ?? originalPost.title;
  const content = req.body.content ?? originalPost.content;
  const image = req.body.image ?? originalPost.image;
  const tags = req.body.tags ?? originalPost.tags;

  originalPost.title = title;
  originalPost.content = content;
  originalPost.image = image;
  originalPost.tags = tags;

  res.json(originalPost);
};

// DESTROY

const destroy = (req, res) => {
  const postId = parseInt(req.params.id);

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res
      .status(404)
      .json({ error: "404 not found", message: "Post non trovato" });
  }

  posts.splice(posts.indexOf(post), 1);

  res.sendStatus(204);
};

module.exports = { index, show, store, update, modify, destroy };
