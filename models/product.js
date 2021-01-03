const fs = require("fs");
// const { get } = require("https");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
  // return products;
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    // products.push(this);
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    // fs.readFile(p, (err, data) => {
    //   let products = [];
    //   if (!err) {
    //     products = JSON.parse(data);
    //   }
    // });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
