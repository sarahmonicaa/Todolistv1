  const express = require("express");
  const bodyParser = require("body-parser");

  const app = express();

  const items =["Buy Food",  "Cooking Food", "Eat Food"];
  const workItems = [];

  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static("public"));

  app.get("/", function(req, res) {
    const today = new Date();

    const options = {
      day: "numeric",
      weekend: "long",
      month: "long",
      year: "numeric",

    };

    const day = today.toLocaleDateString("en-US");

    res.render("list", {
      listTitle: day,
      newListItems: items,

    });

  });


  app.post("/", function(req, res) {
    const item = req.body.newItem;

    if(req.body.list === "work"){
      workItems.push(item);
      res.redirect("/work");
    }else {
      items.push(item);
      res.redirect("/")
    }

  });

  app.get("/work", function(req, res){
    res.render("List",{listTitle:"work List", newListItems: workItems})
  });

  app.post("/work", function(req, res){
    const item = req.body.newListItem;
    workItems.push(item);
    res.redirect("/work");
  });

  app.get("/about", function(req, res){
    res.render("about");
  });


  app.listen(8000, function() {
    console.log("Server started on port 8000");
  });
