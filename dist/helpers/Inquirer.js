'use strict';

var inquirer = require('inquirer');

module.exports = {
  askInitialData: function askInitialData() {
    var questions = [{
      name: 'fileName',
      type: 'input',
      message: 'Enter the name of the file(data-source):'
    }, {
      name: 'fullName',
      type: 'input',
      message: 'Enter your Full Name for the resume:',
      validate: function validate(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a valid Name: ';
        }
      }
    }, {
      name: 'font',
      type: 'input',
      message: '(Optional) Please enter the name of the font to use:'
    }, {
      name: 'font-size',
      type: 'input',
      message: '(Optional) Please enter the font size for the body of resume:'
    }];
    return inquirer.prompt(questions);
  }
};