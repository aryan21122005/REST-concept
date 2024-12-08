const express=require("express");
const app=express();
const path= require("path");
const methodOverride = require('method-override');

let port=8080;

app.use(express.urlencoded({ extended: true }));

const { v4: uuidv4 } = require('uuid');

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


app.use(methodOverride('_method'));

let posts=[
    {
        id: uuidv4(),
        username: "Aryan",
        content : "Hi, Aryan this side"
    },
    {
        id: uuidv4(),
        username: "Ayush",
        content : "Hi, Ayush this side"
    },
    {
        id: uuidv4(),
        username: "Me ",
        content : "Hi, Me this side"
    }
]



app.listen(port,()=>{
    console.log(`app listening to port: ${port}`);
});

app.get("/posts",(req,res)=>{
    console.log("Working");
    res.render("index",{posts});
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id = uuidv4();
    posts.push({ id ,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post=posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
})

app.get("/posts/new/:id",(req,res)=>{
    
    res.render("new.ejs");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post=posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts=posts.filter((p)=> id !== p.id);
    res.redirect("/posts");

})

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newcontent = req.body.content;
    let post=posts.find((p)=> id === p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
})