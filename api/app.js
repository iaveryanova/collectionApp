const config = require("./config");
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
const port = 3020;
app.use(express.json()); 



const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql' 
  });

const User = require('./models/User.js')(sequelize)
  

// app.get('/', function (req, res) {
//   res.status(200).send('Hello world!!')
// })


app.post('/api/register', async (req, res) => {
  const {firstName, lastName, email, login, password, token} = req.body
  const user = await User.create({firstName, lastName, email, login, password, token});
  res.status(200).json({ message: 'Register successfully'});
  return;
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



