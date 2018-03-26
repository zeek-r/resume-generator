const readLine = require('readline');
const fs = require('fs');

const commandLine = process.argv;

const ioInterface = readLine.createInterface({
  input : process.stdin,
  output : process.stdout
})

if(commandLine.length <= 2)
{
  ioInterface.question("Please provide filename for data-source: ", (filename) => {
    ioInterface.close();
    const dataSource = require('./' + filename);
    fileProcessor(dataSource);
  });
}

function fileProcessor(filename) {
  console.log(dataSource);
}