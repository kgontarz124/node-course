const { ObjectID } = require("mongodb");

const mongoose = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//remove all documents form database
// ToDo.remove({}).then((result)=> {
//   console.log(result);
// })

//findOneAndRemove
// ToDo.findByIdAndRemove({"_id: 5b7184be46f97b64c9d5361e"}).then((todo)=> {
//   console.log(todo);
// })

//findByIdAndRemove
ToDo.findByIdAndRemove("5b7184be46f97b64c9d5361e").then((todo)=> {
  console.log(todo);
})
