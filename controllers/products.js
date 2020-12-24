const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("add-product", {
    title: "Add Products",
    path: "/admin/add-product",
    activeAddProduct: true,
    mainCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //   const products = adminData.products;
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  Product.fetchAll((products) => {
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
};
