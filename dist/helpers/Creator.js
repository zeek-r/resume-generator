"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Doc = require('docx');

var Creator = function () {

  /* Constructor, takes person object as input, and also instantiates document */
  function Creator(person) {
    _classCallCheck(this, Creator);

    this.person = person;
    this.document = new Doc.Document();
    this.document.Header.createParagraph(" ");
    this.document.Footer.createParagraph(" ");
  }

  /*Creates Resume with Skill, Education and Experience field */


  _createClass(Creator, [{
    key: "createResume",
    value: function createResume() {
      this.addTitle(this.person.name);
      this.addSkills();
      this.addEducation();
      this.addExperiences();
      this.generateFiles();
    }

    /* Adds Name title to Resume */

  }, {
    key: "addTitle",
    value: function addTitle(title) {
      var mainTitle = new Doc.Paragraph();
      var text = new Doc.TextRun(title).bold().allCaps();
      mainTitle.addRun(text);
      mainTitle.center().heading1().thematicBreak();
      this.document.addParagraph(mainTitle);
      this.addBreak();
    }

    /* Adds Section title like Skill, Education etc to Resume */

  }, {
    key: "addSectionTitle",
    value: function addSectionTitle(title) {
      var sectionTitle = new Doc.Paragraph();
      var text = new Doc.TextRun(title).bold().allCaps();
      sectionTitle.addRun(text);
      sectionTitle.center().heading2().thematicBreak();
      this.document.addParagraph(sectionTitle);
    }

    /* Creates Headers inside Sections like Skill, Education */

  }, {
    key: "addSubSectionTitle",
    value: function addSubSectionTitle(title) {
      var paragraph = new Doc.Paragraph();
      var subSectionTitle = new Doc.TextRun(title).bold().underline().allCaps();
      paragraph.addRun(subSectionTitle);
      paragraph.center();
      this.document.addParagraph(paragraph);
    }

    /* Adds Skill Section to resume */

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

    /* Adds Education Section to resume */

  }, {
    key: "addEducation",
    value: function addEducation() {
      var _this2 = this;

      this.addSectionTitle('Education');
      this.person.education.forEach(function (education) {
        _this2.addLogo(education.logo);
        _this2.createInstitutionHeader(education.school_name, education.year);
        _this2.document.addParagraph(_this2.createBullet(education.title + ', ' + education.level));
        _this2.document.addParagraph(_this2.addBreak());
      });
    }

    /* Adds Experience section to resume */

  }, {
    key: "addExperiences",
    value: function addExperiences() {
      var _this3 = this;

      this.addSectionTitle('Experiences');
      this.person.experiences.forEach(function (experience) {
        _this3.addLogo(experience.company_logo);
        _this3.createInstitutionHeader(experience.company, experience.work_year);
        _this3.document.addParagraph(_this3.createBullet(experience.postion));
        _this3.addSubSectionTitle('duties');
        experience.duties.forEach(function (duty) {
          _this3.document.addParagraph(_this3.createBullet(duty));
        });
        _this3.document.addParagraph(_this3.addBreak());
      });
    }

    /* Generates Docx and Pdf File in the root directory of the project */

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

    /** Creates Institution header with date like Work, School */

  }, {
    key: "createInstitutionHeader",
    value: function createInstitutionHeader(institutionName) {
      var dateText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Current';

      var paragraph = new Doc.Paragraph().maxRightTabStop();
      var institution = new Doc.TextRun(institutionName).bold();
      var date = new Doc.TextRun(dateText).tab().bold();

      paragraph.addRun(institution);
      paragraph.addRun(date);
      this.document.addParagraph(paragraph);
    }

    /* Returns Bullet text of the input */

  }, {
    key: "createBullet",
    value: function createBullet(text) {
      return new Doc.Paragraph(text).bullet();
    }

    /* Returns Empty Paragraph use for creating line break */

  }, {
    key: "addBreak",
    value: function addBreak() {
      var paragraph = new Doc.Paragraph(" ");
      return paragraph;
    }

    /* Adds Logo of the institution, if available in the data-source directory */

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