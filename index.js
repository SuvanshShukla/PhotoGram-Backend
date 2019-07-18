const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();


server.use(cors())
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
    post.title = req.body.title;
    post.desc = req.body.desc;
    post.imgUrl = req.body.imgUrl;
    post.save();
    res.json(post);
});

//>> so we have to add the rest of the CRUD operations

server.get("/posts",function(req,res){
    Album.find({}, function(err, docs){
        console.log(docs);
        res.json(docs);        
    })
});

server.delete("/post/:id",function(req,res){
    Album.findOneAndDelete({_id:req.params.id}).then(docs=>{
        res.json(docs);
        console.log(docs);        
    })
})










server.listen(8080,function(){
    console.log("server started");    
})