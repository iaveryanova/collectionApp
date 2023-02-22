const config = require("./config");
const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const {uploadFile} = require("./uploader");
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

// sequelize.sync({ alter: true });

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

app.post("/api/collection/create", async (req, res) => {
  let token = req.cookies["token"];
  if (token) {
    const user = await User.findOne({ where: { token: token } });

    if (!user) {
      res.clearCookie("token");
      res.status(403).json({ message: "Forbidden1" });
      return;
    }

    if(req.body.id){
      console.log('edit mode');
    }
    else{
      console.log('add mode');
    }

    let url_image = null;

    if(req.files){
      let file = null;
      for (let k in req.files) {
        file = req.files[k];
        break;
      }

      if(file){
        url_image = await uploadFile(file);
      }
    }
    else {
      console.log('file not found');
      url_image = req.body.image;
    }

    let collection = null;

    const { desc, name, theme } = req.body;
    try {
      if(req.body.id){
        collection = await Collection.findByPk(req.body.id);
        // {
        collection.desc = desc;
        collection.ThemeCollectionId = theme;
        collection.name = name;

        const gg =  await collection.save();
      }
      else{
        collection = await Collection.create({
          desc,
          name,
          image: url_image,
          ThemeCollectionId: theme,
        });
      }

      // console.log(req.body);

      const custom_fields = [
        "field_string_1",
        "field_string_2",
        "field_string_3",

        "field_integer_1",
        "field_integer_2",
        "field_integer_3",

        "field_text_1",
        "field_text_2",
        "field_text_3",

        "field_date_1",
        "field_date_2",
        "field_date_3",

        "field_bool_1",
        "field_bool_2",
        "field_bool_3"
      ];

      // перед новым сохранением удалить старые (не работает, нужно дописать)
      // (кейс когда пользователь стирает значение и больше не хочет видеть этот филд)

      await CustomFieldsCollection.destroy({
        where: {CollectionId:collection.id}
      });

      // let old_fields = await CustomFieldsCollection.findAll({where: {CollectionId:collection.id}});
      // for (let i = 0; i<old_fields.length; i++){
      // await old_fields[i].destroy();
      // console.log('inside for');
      // }

      console.log('after destroy');

      for(let i = 0; i<custom_fields.length; i++){
        // console.log(custom_fields[i]);
        for(let field in req.body){
          if(field === custom_fields[i]){
            // console.log(req.body[field]);
            if(req.body[field].length > 0){
              await CustomFieldsCollection.create({name:req.body[field], custom_field: custom_fields[i], CollectionId: collection.id})
            }
          }
        }
      }

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


app.get("/api/collection/:id", async (req, res) => {
  let token = req.cookies["token"];
  if (token) {
    const collection = await Collection.findByPk(req.params.id, { include: { all: true, nested: true }});
    // console.log(collection);
    if (collection !==  null) {
      res.status(200).json({ collection: collection });
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
