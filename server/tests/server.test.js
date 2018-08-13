const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { ToDo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "first test todo"
  },
  {
    _id: new ObjectID(),
    text: "second test todo"
  }
];

//remove all todos from database
beforeEach(done => {
  ToDo.remove({})
    .then(() => {
      ToDo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("Should create a new todo", done => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //checko database
        ToDo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        ToDo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

//GET
describe("POST /todos", () => {
  it("should get all results", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`) //to convert obj to String
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 404 if todo not found", done => {
    var toHexId = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${toHexId}`)
      .expect(404)
      .end(done);
  })

  it("should return 404 for non-object ids", done => {
    var toHexId = new ObjectID().toHexString()
    request(app)
      .get('/todos/12345')
      .expect(404)
      .end(done);
  })
});
