const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    //deleteMany
    // db.collection("Todos").deleteMany({text: 'Do shopping'}).then((result)=> {
    //   console.log(result);
    // })

    //deleteOne
    // db.collection("Todos").deleteOne({text: 'Eat lunch'}).then((result)=> {
    //   console.log(result);
    // })

    //findOneAndDelete
    // db.collection("Todos").findOneAndDelete({completed: false}).then((result)=> {
    //   console.log(result);
    // })
    db.collection("Users").findOneAndDelete({_id: new ObjectID('5b6c6ea682033d2ad466c3fe')}).then((result)=> {
      console.log(result);
    })

    // db.close(); //close connection with db server
  }
);
