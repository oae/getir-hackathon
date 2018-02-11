const Router = require('express').Router();
const controller = require('./controller');

Router.route('/searchRecord').post(controller.searchRecord);

module.exports = Router;