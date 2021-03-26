const path = require("path");
const isAuh = require("../middleware/is-auth");
const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuh, shopController.getCart);

router.post("/cart", isAuh, shopController.postCart);

router.post("/cart-delete-item", isAuh, shopController.postCartDeleteProduct);

router.get("/orders", isAuh, shopController.getOrders);

router.post("/create-order", isAuh, shopController.postOrder);

module.exports = router;
