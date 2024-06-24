import express from "express";
import bodyParser from "body-parser";
import { stringify, v4 as uuidv4 } from "uuid";

const port = 3000;
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var posts = [];
var newPost = {};
var index = -1;
let deleteIndex;
let editIndex;

var currentYear = new Date().getFullYear();
var visit = 0;
app.get("/", (req, res) => {
  visit = visit + 1;
  console.log(req.body);
  res.render("index.ejs", {
    Posts: posts,
    Currentyear: currentYear,
    Visit: visit,
  });
});
app.get("/create", (req, res) => {
  res.render("create.ejs", { Currentyear: currentYear, Visit: visit });
});
app.post("/create", (req, res) => {
  newPost = {
    id: uuidv4(),
    title: req.body.title,
    content: req.body.content,
    name: req.body.name,
    username: req.body.username,
    Index: ++index,
  };

  posts.push(newPost);
  console.log(posts);

  // res.render("idCheck.ejs", { ID: newPost.id });
  res.redirect("/idCheck");
});
app.get("/edit", (req, res) => {
  const post = posts[editIndex];
  console.log(post);
  res.render("edit.ejs", {
    Post: post,
    Currentyear: currentYear,
    Visit: visit,
  });
});
app.post("/edit", (req, res) => {
  const postIndex = editIndex;
  posts[postIndex] = {
    id: posts[editIndex].id,
    title: req.body.title,
    content: req.body.content,
    name: req.body.name,
    Index: editIndex,
    username: posts[editIndex].username,
  };
  console.log(posts[postIndex]);
  res.redirect("/");
});
app.post("/delete", (req, res) => {
  posts = deleteIndex;
  res.redirect("/");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.post("/submit_contact_form", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/idCheck", (req, res) => {
  res.render("idCheck.ejs", { ID: newPost.id });
});
app.post("/idCheck", (req2, res) => {
  res.redirect("/");
});
app.get("/verify", (req, res) => {
  console.log(req.body);
  res.render("verify.ejs");
});

app.post("/verify", (req, res) => {
  editIndex = req.body.index;
  res.render("verify.ejs");
  console.log(editIndex);
});
app.post("/verify2", (req, res) => {
  // res.send(`<h1>${posts[editIndex].id}</h1>`);
  console.log(req.body.id);
  console.log(posts[editIndex].id);
  console.log(req.body.username);
  console.log(posts[editIndex].username);
  if (
    req.body.id === posts[editIndex].id &&
    req.body.username === posts[editIndex].username
  ) {
    res.redirect("/edit");
  } else {
    res.render("message.ejs");
  }
});

app.post("/remove", (req, res) => {
  deleteIndex = req.body.index;
  res.render("remove.ejs");
  console.log(deleteIndex);
});
app.post("/remove2", (req, res) => {
  // res.send(`<h1>${posts[editIndex].id}</h1>`);
  console.log(req.body.id);
  console.log(posts[deleteIndex].id);
  if (
    req.body.id === posts[deleteIndex].id &&
    req.body.username === posts[deleteIndex].username
  ) {
    posts = posts.filter((p) => p.id !== posts[deleteIndex].id);
    index = index - 1;
    res.redirect("/");
  } else {
    res.render("message.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
