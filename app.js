const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
//importing date.js file

// console.log(date());

const app = express();

let items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/",function(req,res){
    // res.write("<h1>hey I'am Manjay</h1>") // use write() to send multiple lines
    // res.write("<p>and I'm very happy today, yayyyy!</p>");
    // res.send();
    // var today = new Date();

    // let options = {
    //     weekday: "long",
    //     day: "numeric",
    //     month:"long"
    // };
    // let day = today.toLocaleDateString("en-US",options); //using it from another file
    let day = date();//importing date from another file

    res.render("list",{listTitle:day,newListItems:items});
});

app.post("/",function(req,res){
    let item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);

        res.redirect("/work")
    }
    else{
        items.push(item);

        res.redirect("/");
    }

    // res.render("List",{newListItem: Item});this will not work we have to provide value of all variables inside the above render
}); 

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List",newListItems: workItems})
})


app.listen(3000,function(){
    console.log("server started on port 3000");
})