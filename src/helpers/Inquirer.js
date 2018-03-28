const inquirer   = require('inquirer');
const fs = require('fs');


module.exports = {
  askInitialData: () => {
    const questions = [
      {
        name: 'fileName',
        type: 'input',
        message: 'Enter the name of the file(data-source):',
      },
      {
        name: 'fullName',
        type: 'input',
        message: 'Enter your Full Name for the resume:',
        default: 'User Name',
        validate: (value) => {
          if (value.length) {
            return true;
          } 
          return 'Please enter a valid Name: ';
        }
      }, 
      {
        name: 'fontName',
        type: 'input',
        message: '(Optional) Please enter the name of the font to use:',
        default : 'Sans Serif',
      },
      {
        name: 'fontSize',
        type: 'input',
        message: '(Optional) Please enter the font size for the body of resume:',
        default: 9,
      },
    ];
    return inquirer.prompt(questions);
  },
}