const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    //findOneAndUpdate
    // db.collection("Todos")
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID("5b6c823312ee8338cc7e8e0b")
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     }, {
    //       returnOriginal: false //return updated obj
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   });
    db.collection("Users")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5b6c6e21da1ae42a5247db9e")
        },
        {
          $set: {
            name: "Tom"
          },
          $inc: {
            age: 1
          }
        }, {
          returnOriginal: false //return updated obj
        }
      )
      .then(result => {
        console.log(result);
      });

    // db.close(); //close connection with db server
  }
);
