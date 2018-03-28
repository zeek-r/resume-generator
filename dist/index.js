'use strict';

/* Gets meta data for normal run */
var runNormal = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var initialData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Inquirer2.default.askInitialData();

          case 2:
            initialData = _context.sent;

            fileProcessor(initialData);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function runNormal() {
    return _ref.apply(this, arguments);
  };
}();

/* Gets meta data from comman line */


var _Creator = require('./helpers/Creator');

var _Creator2 = _interopRequireDefault(_Creator);

var _Inquirer = require('./helpers/Inquirer');

var _Inquirer2 = _interopRequireDefault(_Inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var minimist = require('minimist')(process.argv.splice(2));function commandLine() {
  if (minimist.help) {
    var Usage = 'Usage: resume-generator --flags = values\nflags :\n--name, -n = [fullName of the Person],\n--file  = [source filename for data],\n--font  = [font Name for the document](optional),\n--fontsize = [font size of the document body](optional)\n--help = Help Menu';
    console.log(Usage);
    process.exit(0);
  } else {
    var initialData = {
      fullName: minimist.name,
      fileName: minimist.file,
      fontName: minimist.font
    };
    if (!minimist.font) {
      console.log(minimist.font);
      initialData.fontName = 'Sans Serif';
    }
    if (!minimist.fontsize) {
      initialData.fontSize = 9;
    } else {
      initialData.fontSize = parseInt(minimist.fontsize, 10);
    }
    fileProcessor(initialData);
  }
}

function main() {
  if (Object.keys(minimist).length === 1) {
    runNormal();
  } else {
    commandLine();
  }
}

function fileProcessor(initialData) {
  try {
    var dataSource = require("../data-source/" + initialData.fileName);
    dataSource.default.name = initialData.fullName;
    var styles = {
      fontName: initialData.fontName,
      fontSize: initialData.fontSize
    };
    var doc = new _Creator2.default(dataSource['default'], styles);
    doc.createResume();
  } catch (error) {
    console.log("Error opening " + initialData.fileName + " , Please specify the filename correctly");
    console.log(__dirname);
    console.log(error);
  }
}

main();