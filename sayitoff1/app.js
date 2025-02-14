const express=require("express");
const app=express();
const path=require("path");
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:"true"}));
app.set(path.join(__dirname,"views"));
let port=8080;
const { v4: uuidv4 } = require('uuid');
const methodoverride=require("method-override");
app.use(methodoverride("_method"));
app.listen(port,()=>{
    console.log("listening");
})
let posts=[{
    id:"1a",
    name:"mayank",
    comment:"doing web devlopement"
}
,{id:"1b",
    name:"vijay",
    comment:"doing competitive programming"
},
{   id:"1c",
    name:"harsh",
    comment:"doing everything"
}]
app.get("/sayitoff",(req,res)=>{
    res.render("index.ejs" ,{posts:posts});
})
app.get("/sayitoff/new",(req,res)=>{
     res.render("new.ejs");
}
)
app.post("/sayitoff/new",(req,res)=>{
  
    let{name,comment}=req.body;
    let id=uuidv4();
    console.log({name});
    posts.push({id,name,comment});
    for(post of posts){
        console.log(post.name);
    }
   
    res.redirect("/sayitoff");
})
app.get("/sayitoff/view/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id===p.id);
    console.log(post.id);
    res.render("view.ejs",{post});
})
app.get("/sayitoff/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.patch("/sayitoff/:id/edit",(req,res)=>{
    let {id}=req.params;
    let newcomment=req.body.comment;

    let post=posts.find((p)=>id===p.id);
    post.comment=newcomment;
    
    res.redirect("/sayitoff");
})