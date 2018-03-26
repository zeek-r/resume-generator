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
    this.document.Header.createParagraph(" ");
    this.document.Footer.createParagraph(" ");
  }

  _createClass(Creator, [{
    key: "createResume",
    value: function createResume() {
      this.addTitle(this.person.name);
      this.addSkills();
      this.generateFiles();
    }
  }, {
    key: "addTitle",
    value: function addTitle(title) {
      var paragraph = new Doc.Paragraph(title).heading1().center().thematicBreak();
      this.document.addParagraph(paragraph);
    }
  }, {
    key: "addSkills",
    value: function addSkills() {
      var _this = this;

      this.addTitle('Skills');
      var skills = this.person.skills.map(function (skill) {
        return skill.replace('#', '');
      });
      skills.forEach(function (skill) {
        _this.document.addParagraph(_this.createBullet(skill));
      });
      // paragraph.addRun(new Doc.TextRun(skills));
    }
  }, {
    key: "generateFiles",
    value: function generateFiles() {
      var docExporter = new Doc.LocalPacker(this.document);
      docExporter.pack(this.person.name + "_resume").then(function () {
        console.log("Docx Generated");
        console.log("Building PDF, Might take some time.....");
      });
      var pdfExporter = new Doc.LocalPacker(this.document);
      pdfExporter.packPdf(this.person.name + "_resume").then(function () {
        console.log("PDF Generated");
      });
    }
  }, {
    key: "createHeading",
    value: function createHeading(text) {
      return new Doc.Paragraph(text).heading1().thematicBreak();
    }
  }, {
    key: "createSubHeading",
    value: function createSubHeading(text) {
      return new Doc.Paragraph(text).heading2();
    }
  }, {
    key: "createInstitutionHeader",
    value: function createInstitutionHeader(institutionName, dateText) {
      var paragraph = new Doc.Paragraph().maxRightTabStop();
      var institution = new Doc.TextRun(institutionName).bold();
      var date = new Doc.TextRun(dateText).tab().bold();

      paragraph.addRun(institution);
      paragraph.addRun(date);

      return paragraph;
    }
  }, {
    key: "createBullet",
    value: function createBullet(text) {
      return new Doc.Paragraph(text).bullet();
    }
  }, {
    key: "createSkillList",
    value: function createSkillList(skills) {
      var paragraph = new Doc.Paragraph();
      var skillConcat = skills.map(function (skill) {
        return skill;
      }).re(", ") + ".";

      paragraph.addRun(new Doc.TextRun(skillConcat));

      return paragraph;
    }
  }, {
    key: "splitParagraphIntoBullets",
    value: function splitParagraphIntoBullets(text) {
      return text.split("\n\n");
    }
  }]);

  return Creator;
}();

exports.default = Creator;