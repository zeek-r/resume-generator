'use strict';

var run = function () {
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

  return function run() {
    return _ref.apply(this, arguments);
  };
}();

var _Creator = require('./helpers/Creator');

var _Creator2 = _interopRequireDefault(_Creator);

var _Inquirer = require('./helpers/Inquirer');

var _Inquirer2 = _interopRequireDefault(_Inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var minimist = require('minimist')(process.argv.splice(2));

function commandLine() {
  if (minimist.help) {
    var Usage = 'Usage: resume-generator --flags = values\n-flags :\n--name, -n = [fullName of the Person],\n--file, -f = [source filename for data],\n--font, -fn = [font Name for the document](optional),\n--fontsize, -fs = [font size of the document body](optional)\n--help = Help Menu';
    console.log(Usage);
    process.exit(0);
  } else {
    var initialData = {
      fullName: minimist.name || minimist.n,
      fileName: minimist.file || minimist.f,
      fontName: minimist.font || minimist.fn,
      fontSize: minimist.fontsize || minimist.fs
    };
    fileProcessor(initialData);
    process.exit(0);
  }
}

function main() {
  if (Object.keys(minimist).length === 1) {
    run();
  } else {
    commandLine();
  }
}

main();

function fileProcessor(initialData) {
  try {
    var dataSource = require("../" + initialData.fileName);
    dataSource.default.name = initialData.fullName;
    var doc = new _Creator2.default(dataSource['default']);
    doc.createResume();
  } catch (error) {
    console.log("Error opening " + initialData.fileName + " , Please specify the filename correctly");
    console.log(__dirname);
  }
}