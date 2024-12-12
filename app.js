//  모듈
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// 미들웨어
app.listen(process.env.PORT);
app.use(express.json());
// 라우터
const booksRouter = require("./routers/books");
const cartsRouter = require("./routers/carts");
const likesRouter = require("./routers/likes");
const ordersRouter = require("./routers/orders");
const userRouter = require("./routers/users");
const categoryRouter = require("./routers/category");

app.use("/books", booksRouter);
app.use("/carts", cartsRouter);
app.use("/likes", likesRouter);
app.use("/orders", ordersRouter);
app.use("/users", userRouter);
app.use("/category", categoryRouter);
