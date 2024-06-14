const express = require('express');
const discussion_route= express();
const discussionController = require('../controller/discussionController');

user_route.set('view engine','ejs');
user_route.set('views','./views');

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

module.exports = router;
