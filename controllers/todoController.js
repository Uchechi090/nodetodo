var bodyParser = require("body-parser");
var mongoose = require("mongoose"); //facilitates interaction between nodejs and mongodb

//Connect to the database
mongoose.connect(
  "mongodb+srv://uchechi:todo@uccluster-lpgfg.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Create a schema - this is like a blueprint for our data
var todoSchema = new mongoose.Schema({
  item: String
});

//Creating a model(based off the schema); note the capital letter
var Todo = mongoose.model("Todo", todoSchema);

//Created a new item of type the model above - Todo
// var itemOne = Todo({ item: "buy flowers" }).save(function(err) {
//   if (err) throw err;
//   console.log("item saved");
// });

//Dummy Data
//var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "do laundry" }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//With mongodb database
module.exports = function(app) {
  //making routes(request handlers)
  app.get("/todo", function(req, res) {
    //get data from mongodb and pass it to the view

    //First, specify what model or collection to get the data from
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    }); //this finds all items in the Todo collection
    //Todo.find({ item: "buy flowers" }); //this finds a particular item - "buy flowers" in the Todo collection
  });

  app.post("/todo", urlencodedParser, function(req, res) {
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function(req, res) {
    //delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).deleteOne(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};

//With dummy data
// module.exports = function(app) {
//   //making routes(request handlers)
//   app.get("/todo", function(req, res) {
//     res.render("todo", { todos: data });
//   });

//   app.post("/todo", urlencodedParser, function(req, res) {
//     data.push(req.body);
//     res.json(data);
//   });

//   app.delete("/todo/:item", function(req, res) {
//     data = data.filter(function(todo) {
//       return todo.item.replace(/ /g, "-") !== req.params.item;
//     });
//     res.json(data);
//   });
// };
