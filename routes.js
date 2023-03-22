const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const middlewares = require('./src/middlewares/middleware')

// Rota da home
route.get('/', homeController.index);

// rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// rotas de contato
route.get('/contato/index', middlewares.userLogged, contatoController.index);
route.post('/contato/register', middlewares.userLogged, contatoController.register);
route.get('/contato/index/:id', middlewares.userLogged, contatoController.editIndex);
route.post('/contato/edit/:id', middlewares.userLogged, contatoController.edit);
route.get('/contato/delete/:id', middlewares.userLogged, contatoController.delete);
module.exports = route;
