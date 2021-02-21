const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); //generate random ID for the cpmments

const app = express();
app.use(bodyParser.json()); // use json for body

//storage object
const commentsByPostId = {};
//root handlers
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
//root handlers
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex"); // 4 bytes with hex format
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId , content});
  
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments); // response with 201 code success and the new post
});
//Port
app.listen(4001, () => {
  console.log("Listening on 4001");
});