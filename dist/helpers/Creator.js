"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Doc = require('docx');

var Creator = function () {
  function Creator(person) {
    _classCallCheck(this, Creator);

    this.person = person;
    this.document = new Doc.Document();
  }

  _createClass(Creator, [{
    key: "createResume",
    value: function createResume() {
      var exporter = new Doc.LocalPacker(this.document);
      exporter.pack("My First Document");
    }

    // createHeading(text) {
    //   return new Doc.Paragraph(text).heading1().thematicBreak();
    // }

    // createSubHeading(text) {
    //   return new Doc.Paragraph(text).heading2();
    // }

    // createInstitutionHeader(institutionName, dateText) {
    //   const paragraph = new Doc.Paragraph().maxRightTabStop();
    //   const institution = new Doc.TextRun(institutionName).bold();
    //   const date = new Doc.TextRun(dateText).tab().bold();

    //   paragraph.addRun(institution);
    //   paragraph.addRun(date);

    //   return paragraph;
    // }

    // createBullet(text) {
    //   return new Doc.Paragraph(text).bullet();
    // }

    // createSkillList(skills) {
    //   const paragraph = new Doc.Paragraph();
    //   const skillConcat = skills.map((skill) => skill.name).join(", ") + ".";

    //   paragraph.addRun(new Doc.TextRun(skillConcat));

    //   return paragraph;
    // } 

    // splitParagraphIntoBullets(text) {
    //   return text.split("\n\n");
    // }

  }]);

  return Creator;
}();

exports.default = Creator;