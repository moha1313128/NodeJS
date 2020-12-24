const express = require("express");
const router = express.Router();
const path = require("path");
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const products = adminData.products;
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  res.render("shop", {
    prods: products,
    title: "Shop",
    path: "shop",
    showIf: products.length > 0,
    activeShop: true,
    mainCSS: true,
    // layout: false,
  });
});

module.exports = router;
