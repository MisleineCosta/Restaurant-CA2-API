const express = require("express");
const mongoose = require("mongoose");
const Price = require("./models/price");
const priceRouter = require("./routes/prices");
const methodOverride = require("method-override");
const app = express();

var port = process.env.PORT || 5000; // Declaring to ports to support heroku
mongoose.connect("mongodb://localhost:27017/menu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("We are connected to database"));
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
