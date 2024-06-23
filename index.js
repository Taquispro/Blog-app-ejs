import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
const port = 3000;
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var posts = [];
var currentYear = new Date().getFullYear();
app.get("/", (req, res) => {
  res.render("index.ejs", { Posts: posts, Currentyear: currentYear });
});
app.get("/create", (req, res) => {
  res.render("create.ejs", { Currentyear: currentYear });
});
app.post("/create", (req, res) => {
  const newPost = {
    id: uuidv4(),
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  console.log(posts);

  res.redirect("/");
});
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  console.log(post);
  res.render("edit.ejs", { Post: post, Currentyear: currentYear });
});
app.post("/edit/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === req.params.id);
  posts[postIndex] = {
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  };
  res.redirect("/");
});
app.post("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
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
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
