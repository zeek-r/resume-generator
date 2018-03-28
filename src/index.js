import Doc from './helpers/Creator';
import inquirer from './helpers/Inquirer';
const minimist = require('minimist')(process.argv.splice(2)) ;


async function run() {
  const initialData = await inquirer.askInitialData();
  fileProcessor(initialData);
}

function commandLine() {
  if(minimist.help) {
    const Usage = 'Usage: resume-generator --flags = values\n-flags :\n--name, -n = [fullName of the Person],\n--file, -f = [source filename for data],\n--font, -fn = [font Name for the document](optional),\n--fontsize, -fs = [font size of the document body](optional)\n--help = Help Menu';
    console.log(Usage);
    process.exit(0);
  }
  else {
    const initialData = {
      fullName : minimist.name || minimist.n,
      fileName : minimist.file || minimist.f,
      fontName : minimist.font || minimist.fn,
      fontSize : minimist.fontsize || minimist.fs
    }
    fileProcessor(initialData);
    process.exit(0);
  }
}

function main() {
  if(Object.keys(minimist).length === 1 ) {
    run();
  }
  else {
   commandLine();
  }
}

main();

function fileProcessor(initialData) {
  try {
    let dataSource = require("../" + initialData.fileName);
    dataSource.default.name = initialData.fullName;
    const doc  = new Doc(dataSource['default']);
    doc.createResume();
  } catch(error) {
      console.log("Error opening " + initialData.fileName +" , Please specify the filename correctly");
      console.log(__dirname);
  }
}