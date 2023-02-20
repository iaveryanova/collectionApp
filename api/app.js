const config = require("./config");
const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const port = 3020;
const app = express();

app.use(
  cors({
    origin: true, //"http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

const cookie_options = {
  maxAge: 1000 * 60 * 30, // 30 minutes
  httpOnly: false,
  secure: false, // http
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
});

const User = require("./models/User.js")(sequelize);
const ThemeCollection = require("./models/ThemeCollection")(sequelize);
const Collection = require("./models/Collection.js")(sequelize);
const CustomFieldsCollection = require("./models/CustomFieldsCollection.js")(
  sequelize
);

const ItemCollections = require("./models/ItemCollections")(sequelize);
const CommentItems = require("./models/Comment")(sequelize);

//User-Collection
User.hasMany(Collection);
Collection.belongsTo(User);

//Collection-CustomFields
Collection.hasMany(CustomFieldsCollection);
CustomFieldsCollection.belongsTo(Collection);

// Collection-Theme
ThemeCollection.hasOne(Collection);
Collection.belongsTo(ThemeCollection);

//Collection-Item
Collection.hasMany(ItemCollections);
ItemCollections.belongsTo(Collection);

//Comments - User - Item
User.hasMany(CommentItems);
CommentItems.belongsTo(User);
ItemCollections.hasMany(CommentItems);
CommentItems.belongsTo(ItemCollections);

sequelize.sync({ alter: true });

// const my_init = () => {
//   ThemeCollection.create({name: 'theme1'});
//   ThemeCollection.create({name: 'theme2'});
//   ThemeCollection.create({name: 'theme3'});
// }

// my_init();

// const theme1 = ThemeCollection.create({ name: "Books" });
// const theme2 = ThemeCollection.create({ name: "Coins" });
// const theme3 = ThemeCollection.create({ name: "Pictures" });

app.get("/api/themes", async (req, res) => {
  let token = req.cookies["token"];
  if (token) {
    const themes = await ThemeCollection.findAll();
    if (themes.length > 0) {
      res.status(200).json({ themes: themes });
    } else {
      res.sendStatus(404);
    }
  }
  else {
    res.clearCookie("token");
    res.status(403).json({ message: "Forbidden" });
  }
  return;
});

app.get("/api/collections", async (req, res) => {
  let token = req.cookies["token"];
  if (token) {
    const collections = await Collection.findAll({include: ThemeCollection} );
    if (collections.length > 0) {
      res.status(200).json({ collections: collections });
    } else {
      res.sendStatus(404);
    }
  }
  else {
    res.clearCookie("token");
    res.status(403).json({ message: "Forbidden" });
  }
  return;
});

app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, login, password, token } = req.body;
  let hash_password = crypto.createHash("md5").update(password).digest("hex");
  const user = await User.create({
    firstName,
    lastName,
    email,
    login,
    password: hash_password,
    token,
  });
  res.status(200).json({ message: "Register successfully" });
  return;
});
app.post("/api/collection/create", async (req, res) => {
  let token = req.cookies["token"];
  if (token) {
    const user = await User.findOne({ where: { token: token } });

    if (!user) {
      res.clearCookie("token");
      res.status(403).json({ message: "Forbidden1" });
      return;
    }

    console.log(req.files);

    const { desc, name, theme } = req.body;
    try {
      const collection = await Collection.create({
        desc,
        name,
        ThemeCollectionId: theme,
      });
      res.status(200).json({ collection: collection });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
      return;
    }
  } else {
    res.clearCookie("token");
    res.status(403).json({ message: "Forbidden2" });
  }
  return;
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  let hash_password = crypto
    .createHash("md5")
    .update(req.body.password)
    .digest("hex");
  const user = await User.findOne({
    where: {
      login: req.body.login,
      password: hash_password,
      is_deleted: false,
    },
  });
  if (user === null) {
    res.sendStatus(404);
  } else {
    console.log(JSON.stringify(user));
    let generate_token = crypto
      .createHash("md5")
      .update(new Date().toLocaleString() + JSON.stringify(user))
      .digest("hex");
    user.set({
      token: generate_token,
      last_login: new Date(),
    });
    await user.save();
    res.cookie("token", generate_token, cookie_options);
    res.status(200).json({ message: "Login successfully" });
  }

  return;
});
app.post("/api/logout", async (req, res) => {
  let token = req.cookies["token"];
  if (token) {
    const user = await User.findOne({ where: { token } });
    user.set({
      token: null,
    });
    await user.save();
    res.clearCookie("token");
    res.status(200).json({ message: "Logout" });
  }

  return;
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
