'use strict';

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Person = require('./helpers/Person');

var _Person2 = _interopRequireDefault(_Person);

var _Creator = require('./helpers/Creator');

var _Creator2 = _interopRequireDefault(_Creator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandLine = process.argv;

var ioInterface = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (commandLine.length <= 2) {
  ioInterface.question("Please provide yourname and filename for data-source: ", function (dataSource) {
    ioInterface.close();
    fileProcessor(dataSource);
  });
}

function fileProcessor(filename) {
  var dataSource = require('./data-source/' + filename);
  dataSource.default.name = 'Roshan';
  var person = new _Person2.default(dataSource['default']);
  console.log(person);
  var doc = new _Creator2.default(person);
  doc.createResume();
}