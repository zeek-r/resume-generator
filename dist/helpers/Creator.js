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
      this.addEducation();
      this.addExperiences();
      this.generateFiles();
    }
  }, {
    key: "addTitle",
    value: function addTitle(title) {
      var paragraph = new Doc.Paragraph(title).heading1().center().thematicBreak();
      this.document.addParagraph(paragraph);
      this.addBreak();
    }
  }, {
    key: "addSectionTitle",
    value: function addSectionTitle(title) {
      var paragraph = new Doc.Paragraph(title).heading2().center().thematicBreak();
      this.document.addParagraph(paragraph);
    }
  }, {
    key: "addSkills",
    value: function addSkills() {
      var _this = this;

      this.addSectionTitle('Skills');
      var skills = this.person.skills.map(function (skill) {
        return skill.replace('#', '');
      });
      skills.forEach(function (skill) {
        _this.document.addParagraph(_this.createBullet(skill));
      });
      this.document.addParagraph(this.addBreak());
    }
  }, {
    key: "addEducation",
    value: function addEducation() {
      var _this2 = this;

      this.addSectionTitle('Education');
      this.person.education.forEach(function (education) {
        _this2.addLogo(education.logo);
        _this2.document.addParagraph(_this2.createInstitutionHeader(education.school_name, education.year));
        _this2.document.addParagraph(_this2.createBullet(education.title + ', ' + education.level));
        _this2.document.addParagraph(_this2.addBreak());
      });
    }
  }, {
    key: "addExperiences",
    value: function addExperiences() {
      this.addSectionTitle('Experiences');
      console.log(this.person);
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
    key: "addBreak",
    value: function addBreak() {
      var paragraph = new Doc.Paragraph(" ");
      return paragraph;
    }
  }, {
    key: "addLogo",
    value: function addLogo(logo) {
      try {
        var _logo = this.document.createImage('./src/data-source/' + _logo);
        _logo.right();
        this.document.addParagraph(_logo);
      } catch (error) {
        console.log("Error: " + logo + " not found, Skipping adding that image");
      }
    }
  }]);

  return Creator;
}();

exports.default = Creator;