const path = require("path");
const isAuh = require("../middleware/is-auth");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => GET
router.get("/add-product", isAuh, adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", isAuh, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuh, adminController.getEditProduct);

router.post("/edit-product", isAuh, adminController.postEditProduct);

router.post("/delete-product", isAuh, adminController.postDeleteProduct);

module.exports = router;
