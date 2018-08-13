const {MongoClient, ObjectID} = require("mongodb");

//dectrukturyzacja ES6
var user = {name: "Paweł", age: 66};
var {name} = user;
console.log(name);

var obj = new ObjectID(); //generate new id
console.log(obj);

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    db.collection("Todos").insertOne(
      {
        text: "Do shopping",
        completed: false
      },
      (err, result) => {
        if(err){
          return console.log('Unable to insert to ToDo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
      }
    );
    // db.collection("Users").insertOne(
    //   {
    //     name: "Kasia",
    //     age: 25,
    //     location: 'Warsaw'
    //   },
    //   (err, result) => {
    //     if(err){
    //       return console.log('Unable to insert to Users', err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id, undefined, 2));
    //   }
    // );

    db.close(); //close connection with db server
  }
);
