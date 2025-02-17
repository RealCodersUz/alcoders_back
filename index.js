const express = require("express");
const cors = require("cors");
const db = require("./src/db");
const config = require("./src/shared/config");
const handleError = require("./src/shared/errors/handle");
//
// const UserRoute = require("./modules/users/_api");
const NewsRoute = require("./src/modules/news/_api");
const CategoryRoute = require("./src/modules/category/_api");
const ProductsRoute = require("./src/modules/products/_api");
const FeedbackRoute = require("./src/modules/feedback/_api");
const SendMessage = require("./src/modules/sendMessage/_api");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(express.static("public"));

// app.use(UserRoute);
app.use(NewsRoute);
app.use(SendMessage);
app.use(CategoryRoute);
app.use(ProductsRoute);
app.use(FeedbackRoute);

app.use(handleError);

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
