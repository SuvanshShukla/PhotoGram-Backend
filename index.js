const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
var multer  = require('multer') //->this had to be added to enable uploading images
var upload = multer({ dest: 'uploads/' })
var fs = require('fs'); //-> this was added for implementing file system


server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/photoCollection", {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: String,
  desc: String,
  imgUrl: String
});

const Album = mongoose.model("Album", albumSchema);

server.post("/post", function(req, res) {
  let post = new Album();
  post.title = req.body.title;
  post.desc = req.body.desc;
  post.imgUrl = req.body.imgUrl;
  post.save();
  res.json(post);
});

server.get("/posts", function(req, res) {
  Album.find({}, function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

server.delete("/post/:id", function(req, res) {
  Album.findOneAndDelete({ _id: req.params.id }).then(docs => {
    res.json(docs);
    console.log(docs);
  });
});

server.post('/profile', upload.single('avatar'), function (req, res, next) {  
  //## this is for adding info of uploaded file to DB
  // req.file is the `avatar` file
  console.log(req.file)
  // req.body will hold the text fields, if there were any
  res.json(req.file)

})

server.listen(8080, function() {
  console.log("server started");
});
