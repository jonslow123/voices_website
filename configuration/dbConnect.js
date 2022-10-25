const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('dotenv');

mongoose.Promise = bluebird;
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true  
}).then((asd) => {
  console.log("database connected")
}).catch((docs) =>
  console.log("Error connection fail with mongoose",docs)
)

