const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}))

mongoose.connect('mongodb://localhost:27017/photoCollection', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: String,
    desc: String,
    imgUrl: String
});

const Album = mongoose.model('Album', albumSchema);


server.post("/post", function(req,res){  //->we have successfully connected to the database
    let post = new Album();
    post.title = "trial title";
    post.desc = "test description";
    post.imgUrl = "https://picsum.photos/id/237/200/300";
    post.save();
    res.json(post);
});

//>> so we have to add the rest of the CRUD operations












server.listen(8080,function(){
    console.log("server started");    
})