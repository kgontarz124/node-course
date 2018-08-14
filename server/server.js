require('./config/config')

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { ToDo } = require("./models/todo");
const { User } = require("./models/user");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  console.log(req.body);
  var todo = new ToDo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});
app.get("/todos", (req, res) => {
  ToDo.find().then(
    todos => {
      res.send({ todos }); //it can be alse res.send(todos); - but with obj I can write additional fileds, e.g status: "done"
    },
    err => {
      res.status(400).send(err);
    }
  );
});

//GET /todos/12345
app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  ToDo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });

  // res.send(req.params);
});

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  ToDo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send();
    });
});


app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;

  var body = _.pick(req.body, "text", "completed")

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  //new: true is the same returnOriginal: false
  ToDo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo)=> {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((err)=>{
    res.status(400).send()
  })
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Start on port ${port}`);
});

module.exports = { app };
