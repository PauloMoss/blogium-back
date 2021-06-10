import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());

fs.existsSync("./posts.json");
const allPosts = fs.readFileSync("./posts.json",'utf8')
const posts = JSON.parse(allPosts).posts
let postsCount = JSON.parse(allPosts).postsCount


app.get("/posts", (req, res) => {
    res.send(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id)
    res.send(post);
});

app.post('/posts', (req, res) => {
    postsCount += 1;
    const preview = req.body.content.replace("</p>","")
    const contentPreview = preview.substring(3,50);
    const post = {id: postsCount, ...req.body, contentPreview, commentCount: 0, comments: [] };
    posts.push(post);
    fs.writeFileSync("./posts.json", JSON.stringify({postsCount, posts}));
    res.send(post);
});

app.get("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id)
    res.send(post.comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    const commentCount = post.commentCount + 1;
    post.commentCount = commentCount;
    post.comments.push({id: commentCount, ...req.body});
    res.send(post.comments)
    fs.writeFileSync("./posts.json", JSON.stringify({postsCount, posts}));
});

app.delete(`/posts/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const posts = posts.filter(p => p.id !== id);
    res.send(posts)
    fs.writeFileSync("./posts.json", JSON.stringify({postsCount, posts}));
})


app.listen(4000, () => {
    console.log("Servidor Rodando!")
});