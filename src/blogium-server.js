import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = [{
    id: 1,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2,
    comments: [{
        id: 1,
        author: 'João',
        content: 'Muito bom esse post! Tá de parabéns'
      }, {
        id: 2,
        author: 'Maria',
        content: 'Como faz pra dar palmas?'
      }]
  }];

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id)
    res.send(post);
});

app.post('/posts', (req, res) => {
    const post = {...req.body, id: posts.length + 1, comments: [] };
    posts.push(post);
    res.send("Vou adicionar");
});

app.get("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id)
    res.send(post.comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id)
    post.comments.push(req.body);
    res.send("Vou adicionar");
});


app.listen(4000, () => {
    console.log("Servidor Rodando!")
});