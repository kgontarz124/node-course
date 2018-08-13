const { ObjectID } = require("mongodb");

const mongoose = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b6da7af637c628a04ec49a78';

if(!ObjectID.isValid(id)){
  console.log('Id is not valid');
}


ToDo.find({
  _id: id
}).then((todos)=> {
  console.log('Todos: ', todos);
})

ToDo.findOne({
  _id: id
}).then((todo)=> {
  console.log('Todo: ', todo);
})
ToDo.findById(id).then((todo)=> {
  if(!todo){
    return console.log('Id not found');
  }
  console.log('Todo by id: ', todo);
}).catch((err)=> console.log(err))


User.findById('5b6d56672c96f87e30b1503e').then((user)=> {
  if(!user){
    return console.log('Id not found');
  }
  console.log('User by id: ', user);
}).catch((err)=> console.log(err))
