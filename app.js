const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const User = require("./models/user");
const errorController = require("./controllers/error");

const MONGODB_URI =
  // "mongodb://moha1313128:dTqwg3jZ6u1yq5PO@cluster0-shard-00-00.ofvtk.mongodb.net:27017,cluster0-shard-00-01.ofvtk.mongodb.net:27017,cluster0-shard-00-02.ofvtk.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-qst63q-shard-0&authSource=admin&retryWrites=true&w=majority";
  "mongodb://localhost:27017/shop";
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
  // expires
});
const csrfProtection = csrf();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }) // we can configure cookie here also
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      // throw new Error(err);
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);
app.use("/500", errorController.get500);
app.use((error, req, res, next) => {
  // res.render("/500");
  res.status(500).render("500", {
    pageTitle: "Error",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((result) => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
