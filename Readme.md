# Resume-Generator!

Creates Resume from json data source using [docx] (https://github.com/dolanmiu/docx) library.

## Usage 
* Clone [this](https://github.com/zeek-r/resume-generator)
* Format your profile in [this](https://github.com/zeek-r/resume-generator/blob/master/data-source/my-resume) json format.
* Store your json profile file in data-source directory
### Command Line Arguement Generation
* Run: 
```
node index --filename="data-source-filename" --name="yourname" --font="font(optional)" --fontsize="Int value(optional)"
```
* Help Menu can be accessed at:
```
node index --help
```
### Normal Run
```
node index
```