const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./models/todoListModel.js'), // created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://jimmyson2004:pason0175@pason.qogx3.mongodb.net/?retryWrites=true&w=majority&appName=Pason');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/todoListRoutes'); // importing route
routes(app); // register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
