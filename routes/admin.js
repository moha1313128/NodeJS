const express = require("express");
const router = express.Router();
const path = require("path");
const products = [];
router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("add-product", {
    title: "Add Products",
    path: "/admin/add-product",
    activeAddProduct: true,
    mainCSS: true,
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

// module.exports = router;
exports.products = products;
exports.routes = router;
