const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const postRouter = require("./routers/posts");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use("/posts", postRouter);

app.use(express.static(`public`));

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log("Il server è in ascolto su http://localhost:" + port);
});
