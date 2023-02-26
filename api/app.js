const config = require("./config");
const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { uploadFile } = require("./uploader");
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

const User = require("./models/User")(sequelize);
const ThemeCollection = require("./models/ThemeCollection")(sequelize);
const Collection = require("./models/Collection")(sequelize);
const CustomFieldsCollection = require("./models/CustomFieldsCollection")(
  sequelize
);

const ItemCollections = require("./models/ItemCollections")(sequelize);
const Comment = require("./models/Comment")(sequelize);

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
User.hasMany(Comment);
Comment.belongsTo(User);
ItemCollections.hasMany(Comment);
Comment.belongsTo(ItemCollections);

// sequelize.sync({ force: true });

// const my_init = () => {
//   ThemeCollection.create({name: 'theme1'});
//   ThemeCollection.create({name: 'theme2'});
//   ThemeCollection.create({name: 'theme3'});
// }

// my_init();

// const theme1 = ThemeCollection.create({ name: "Books" });
// const theme2 = ThemeCollection.create({ name: "Coins" });
// const theme3 = ThemeCollection.create({ name: "Pictures" });

// ItemCollections.Collection = ItemCollections.belongsTo(Collection);
// Collection.CustomFieldsCollection = Collection.hasMany(CustomFieldsCollection);

// return ItemCollections.create({
//   name: 'Book3',
//   desc: 'Book3',
//   Collection: {
//     name: 'Books',
//     desc: 'Books',
//     CustomFieldsCollection: [{
//       field_integer_1: "456",
//       field_string: "string"

//     }]
//   }
// }, {
//   include: [{
//     association: ItemCollections.Collection,
//     include: [ Collection.CustomFieldsCollection ]
//   }]
// });

const getUserByToken = async (token, res) => {
  if (token) {
    const user = await User.findOne({ where: { token: token } });
    if (!user) {
      res.clearCookie("token");
      res.status(403).json({ message: "not found user" });
    } else {
      res.cookie("token", token, cookie_options);

      return user;
    }
  } else {
    res.clearCookie("token");
    res.status(403).json({ message: "not found token" });
  }
};

app.get("/api/themes", async (req, res) => {
  let token = req.cookies["token"];
  const user = await getUserByToken(token, res);

  const themes = await ThemeCollection.findAll({
    where: { is_deleted: false },
  });
  if (themes.length > 0) {
    res.status(200).json({ themes: themes });
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/comment", async (req, res) => {
  let token = req.cookies["token"];
  const user = await getUserByToken(token, res);

  let comment = null;

  const { text, id } = req.body;
  try {
      comment = await Comment.create({
        text: req.body.comment,
        ItemCollectionId: req.body.id,
        // UserId: user.id
      });
    

    res.status(200).json({ message: "Comment added successfully" , comment:comment});
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

app.post("/api/collection/create", async (req, res) => {
  let token = req.cookies["token"];
  const user = await getUserByToken(token, res);

  let url_image = null;

  if (req.files) {
    let file = null;
    for (let k in req.files) {
      file = req.files[k];
      break;
    }
    if (file) {
      url_image = await uploadFile(file);
    }
  } else {
    url_image = req.body.image;
  }

  let collection = null;

  const { desc, name, theme } = req.body;

  try {
    if (req.body.id) {
      collection = await Collection.findByPk(req.body.id);

      if (!collection) {
        res.sendStatus(404);
      }
      collection.desc = desc;
      collection.ThemeCollectionId = theme;
      collection.name = name;
      collection.image = url_image;

      await collection.save();
    } else {
      collection = await Collection.create({
        desc,
        name,
        image: url_image,
        ThemeCollectionId: theme,
        UserId: user.id,
      });
    }

    const custom_fields = [
      "field_integer_1",
      "field_integer_2",
      "field_integer_3",

      "field_string_1",
      "field_string_2",
      "field_string_3",

      "field_bool_1",
      "field_bool_2",
      "field_bool_3",

      "field_text_1",
      "field_text_2",
      "field_text_3",

      "field_date_1",
      "field_date_2",
      "field_date_3",
    ];

    // перед новым сохранением удалить старые
    // (кейс когда пользователь стирает значение и больше не хочет видеть этот филд)

    await CustomFieldsCollection.destroy({
      where: { CollectionId: collection.id },
    });

    // сохранение филдов введенных с формы
    for (let i = 0; i < custom_fields.length; i++) {
      // console.log(custom_fields[i]);
      for (let field in req.body) {
        if (field === custom_fields[i]) {
          // console.log(req.body[field]);
          if (req.body[field].length > 0) {
            await CustomFieldsCollection.create({
              name: req.body[field],
              custom_field: custom_fields[i],
              CollectionId: collection.id,
            });
          }
        }
      }
    }

    res.status(200).json({ collection: collection });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

app.get("/api/collections", async (req, res) => {
  let token = req.cookies["token"];
  const user = await getUserByToken(token, res);

  //for admin - remove UserId where condition
  const collections = await Collection.findAll({
    include: ThemeCollection,
    where: { is_deleted: false, UserId: user.id },
  });
  if (collections.length > 0) {
    res.status(200).json({ collections: collections });
  } else {
    res.status(200).json({ collections: [] });
  }
});

app.get("/api/collection/:id", async (req, res) => {
  let token = req.cookies["token"];
  const user = await getUserByToken(token, res);
  const collection = await Collection.findByPk(req.params.id, {
    include: { all: true, nested: true },
    where: { is_deleted: false },
    // order: [ [ItemCollections, 'createdAt', 'ASC']],
  });
  if (collection !== null) {
    res.status(200).json({ collection: collection });
  } else {
    res.sendStatus(404);
  }
});

//ItemColl.findAll({
  // include: { all: true, nested: true }
  // where: { is_deleted: false },
  // order: [ ['createdAt', 'ASC']],
  // limit: 3;

app.get("/api/item/:id", async (req, res) => {
  let token = req.cookies["token"];
  const user = await getUserByToken(token, res);
  const item = await ItemCollections.findByPk(req.params.id, {
    include: { all: true, nested: true },
    where: { is_deleted: false },
  });
  if (item !== null) {
    res.status(200).json({ item: item });
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/collections/delete", async (req, res) => {
  let token = req.cookies["token"];
  const user = await getUserByToken(token, res);

  try {
    const ids = req.body.id;
    for (let i = 0; i < ids.length; i++) {
      const collection = await Collection.findByPk(ids[i], {
        where: {
          UserId: user.id,
        },
      });
      if (collection) {
        collection.is_deleted = 1;
        await collection.save();
      }
    }

    res.status(200).json({ ids: ids });
  } catch (e) {
    res.status(500).json({ error: e });
  }
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
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
