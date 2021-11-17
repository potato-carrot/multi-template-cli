const Generator = require('./Generator');
const inquirer = require('inquirer');
const { TEMPLATE_TYPES } = require('./config');

module.exports = async function (options) {
  const { type } = await inquirer.prompt({
    name: 'type',
    type: 'list',
    choices: TEMPLATE_TYPES,
    message: 'Please choose a template type',
  });
  new Generator({ type }).create();
};
