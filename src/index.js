import readLine from 'readline';
import fs from 'fs';
import Person from './helpers/Person';
import Doc from './helpers/Creator';

const commandLine = process.argv;

const ioInterface = readLine.createInterface({
  input : process.stdin,
  output : process.stdout
})

if(commandLine.length <= 2)
{
  ioInterface.question("Please provide yourname and filename for data-source: ", (dataSource) => {
    ioInterface.close();
    fileProcessor(dataSource);
  });
}

function fileProcessor(filename) {
  let dataSource = require('./data-source/' + filename);
  dataSource.default.name = 'Roshan';
  const person = new Person(dataSource['default']);
  const doc  = new Doc(person);
  doc.createResume();
}