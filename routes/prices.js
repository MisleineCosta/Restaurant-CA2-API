const express = require("express");
const Price = require("../models/price");
const router = express.Router();

router.get("/edit/", async (req, res) => {
  const prices = await Price.find().sort({ createdAt: "desc" });
  res.render("prices/edit", { prices: prices });
});

router.post("/", async (req, res) => {
  await Price.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  res.redirect("/");
});

router.post("/:id", async (req, res) => {
  await Price.updateOne(
    { _id: req.body.id },
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    }
  );
  res.redirect("/");
});

module.exports = router;
