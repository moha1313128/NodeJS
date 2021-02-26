const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");
const errorController = require("./controllers/error");

const MONGODB_URI =
  "mongodb://moha1313128:dTqwg3jZ6u1yq5PO@cluster0-shard-00-00.ofvtk.mongodb.net:27017,cluster0-shard-00-01.ofvtk.mongodb.net:27017,cluster0-shard-00-02.ofvtk.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-qst63q-shard-0&authSource=admin&retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
  // expires
});

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

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
