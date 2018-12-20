// Node libraries and configs that need to import
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const validator = require("express-validator");
const dbConfig = require("./config/database");
const mongoose = require('mongoose');

// Database connection
mongoose.connect(dbConfig.database, {useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to database!");
}).catch(err => {
    console.log("Couldn't connect to database! Error:",err);
});

// App connection
const app = express();

// Passing passport module to configure authentication middleware
require("./config/passport")(passport);

// Configurations
app.use(cors());
app.use(bodyParser.json({ type:'application/json'}));
app.use(morgan('combined'));
app.use(validator());

app.use("/", require("./controllers"));
console.log(process.env.SERVER_PORT)
module.exports = app.listen(3000, () => {
    console.log("Server started succesfully!");
})