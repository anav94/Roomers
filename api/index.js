const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;

const cors = require("cors");

app.use(cors({ origin: '*', credentials: true }));


const http = require('http').createServer(app);
const io = require('socket.io')(http);

const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect("mongodb+srv://anavlamba:anavlamba@cluster0.vn4n3.mongodb.net/yourdbname")  // Correct database name here
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });


app.listen(port, () => {
  console.log("Server running on port 3000");
});

const User = require("./models/user");

app.post("/register", async (req, res) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);

    await newUser.save();

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({ userId: newUser._id}, secretKey );

    res.status(200).json({ token });

  } catch (error) {
    console.log("Error creating user", error);
    res.status(500).json({ error: "Internal server error" })
  }

})

