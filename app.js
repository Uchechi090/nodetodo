var express = require("express");
var todoController = require("./controllers/todoController");

var app = express();

//set up template engine
app.set("view engine", "ejs");

//static files
// app.use("/assets", express.static("./public"))  - route specific
app.use(express.static("./public")); //not route specific

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log("You are listening to port 3000");

//Architecture: MVC - Model: is the data.e.g TODOS,USERS
//View: template files(EJS).e.g TODO.EJS, ACCOUNT.EJS
//Controller: controls the app sections.e.g todoController, userController
