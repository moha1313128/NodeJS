const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //   res.setHeader("Sei-Cookie", "loggedIn=true; HttpOnly; secure; Domain; Expires=1000; max-age=1000");
  User.findById("60292e3f7e17101e6c6c8e9d")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
