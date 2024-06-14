const express = require('express');
const user_route= express();
const userController = require('../controller/userController');

user_route.set('view engine','ejs');
user_route.set('views','./views');

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

// GET signup form
user_route.get('/', userController.renderSignupForm);

// GET signup form
user_route.get('/signup', userController.renderSignupForm);

// POST signup form
user_route.post('/signup', userController.createUser);

// GET Login form
user_route.get('/login', userController.renderLogin);

// POST Login form
user_route.post('/login',userController.loginUser);

// GET Profile
user_route.get('/home', userController.renderHome);

// GET /api/users
user_route.get('/', userController.getAllUsers);

// GET /api/users/:id
user_route.get('/:id', userController.getUserById);

// PUT /api/users/:id
user_route.put('/:id', userController.updateUser);

// DELETE /api/users/:id
user_route.delete('/:id', userController.deleteUser);

// GET /api/users/search/:name
user_route.get('/search/:name', userController.searchUserByName);

// POST /api/users/:id/follow
user_route.post('/:id/follow', userController.followUser);

module.exports = user_route;;