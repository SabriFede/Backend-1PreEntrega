const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routing
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use("/static", express.static(path.join(__dirname, ".." + "public")));

//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});