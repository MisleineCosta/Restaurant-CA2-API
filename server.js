const express = require("express");
const mongoose = require("mongoose");
const Price = require("./models/price");
const priceRouter = require("./routes/prices");
const methodOverride = require("method-override");
const app = express();

require('dotenv').config()

var port = process.env.PORT || 5000; // Declaring to ports to support heroku
//console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("From mongoDB: You are connected to database"));
//db.on('error', (error) => console.error(error))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("views/prices"));

app.get("/", async (req, res) => {
  const prices = await Price.find().sort({ createdAt: "desc" });
  res.render("prices/index", { prices: prices });
});

app.use("/prices", priceRouter);

//app.listen(5000)
app.listen(port, function (error) {
  // Listening to the server on the avaliable port either 5000 or avaliable one. Also show error if their is any.
  console.log("Server Started on port: " + port); // Server Running Console Message
});
