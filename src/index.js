import Doc from './helpers/Creator';
import inquirer from './helpers/Inquirer';

const minimist = require('minimist')(process.argv.splice(2)) ;

/* Gets meta data for normal run */
async function runNormal() {
  const initialData = await inquirer.askInitialData();
  fileProcessor(initialData);
}

/* Gets meta data from comman line */
function commandLine() { 
  if(minimist.help) {
    const Usage = 'Usage: resume-generator --flags = values\nflags :\n--name, -n = [fullName of the Person],\n--file  = [source filename for data],\n--font  = [font Name for the document](optional),\n--fontsize = [font size of the document body](optional)\n--help = Help Menu';
    console.log(Usage);
    process.exit(0);
  }
  else {
    const initialData = {
      fullName : minimist.name,
      fileName : minimist.file,
      fontName : minimist.font 
    }
    if(!minimist.font){
      console.log(minimist.font);
      initialData.fontName = 'Sans Serif';
    }
    if(!minimist.fontsize) {
      initialData.fontSize = 9;
    }
    else {
      initialData.fontSize = parseInt(minimist.fontsize, 10);
    }
    fileProcessor(initialData);
  }
  
}

function main() {
  if(Object.keys(minimist).length === 1 ) {
    runNormal();
  }
  else {
   commandLine();
  }
}

function fileProcessor(initialData) {
  try {
    let dataSource = require("../data-source/" + initialData.fileName);
    dataSource.default.name = initialData.fullName;
    const styles = {
      fontName : initialData.fontName,
      fontSize : initialData.fontSize, 
    }
    const doc  = new Doc(dataSource['default'], styles);
    doc.createResume();
  } catch(error) {
      console.log("Error opening " + initialData.fileName +" , Please specify the filename correctly");
      console.log(__dirname);
      console.log(error);
  }
}

main();