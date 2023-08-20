const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Definindo o template da engine
app.set("view engine", "ejs");

// Arquivos estaticos (Somente se não estiver utilizando um templete engine)
//app.use(express.static(path.join(__dirname, "views")));

// Arquivos públicos
const publicFolder = path.join(__dirname, "public");

// Exibir imagens da pasta images
const expressPublic = express.static(publicFolder);
app.use(expressPublic);
app.use("/public/images", express.static("/public/images"));

// Receber dados via post de um form
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get("/", (req, res) => {
  res.render("index", {
    title: "The Glass Lab - Home"
  });
});

app.get("/posts", (req, res) => {
  res.render("posts", {
    title: "The Glass Lab - Posts",
    posts: [
      {
        title: "Novos produtos",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non omnis consequuntur beatae. Fugiat, magni harum id dolores at minima ea deserunt nobis alias commodi aliquam asperiores minus velit impedit provident.",
        stars: 3
      },
      {
        title: "Lançamento",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non omnis consequuntur beatae. Fugiat, magni harum id dolores at minima ea deserunt nobis alias commodi aliquam asperiores minus velit impedit provident."
      }
    ]
  });
});

// Criação de posts
app.get("/cadastro-posts", (req, res) => {
  res.render("cadastro-posts", {
    title: "Cadastro de Posts"
  });
});

// Envio de Posts
app.post("/salvar-posts", (req, res) => {
  const { titulo, texto } = req.body;

  const data = fs.readFileSync("./store/posts.json");
  const posts = JSON.parse(data);

  posts.push({
    titulo,
    texto
  });

  res.send("ok, funcionou");
});

// Rota não definida (Famoso erro 404)
app.use((req, res) => {
  res.send("Nao fiz essa ainda meu campeao");
});

// Executando o server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Tá rodando o server na porta ${port}`));
