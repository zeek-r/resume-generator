const Doc = require('docx');

class Creator {
  constructor(person) {
    this.person = person;
    this.document = new Doc.Document();
    this.document.Header.createParagraph(" ");
    this.document.Footer.createParagraph(" ");
  }

  createResume() {
    this.addTitle(this.person.name);
    this.addSkills();
    this.generateFiles();
  }

  addTitle(title) {
    const paragraph = new Doc.Paragraph(title).heading1().center().thematicBreak();
    this.document.addParagraph(paragraph);
  }

  addSkills() {
    this.addTitle('Skills');
    let skills = this.person.skills.map((skill) => {
      return skill.replace('#', '');
    });
    skills.forEach(skill => {
      this.document.addParagraph(this.createBullet(skill));
    });
    // paragraph.addRun(new Doc.TextRun(skills));
  }

  generateFiles() {
    let docExporter = new Doc.LocalPacker(this.document);
    docExporter.pack(this.person.name + "_resume")
            .then(() => {
              console.log("Docx Generated");
              console.log("Building PDF, Might take some time.....");
            });
    let pdfExporter = new Doc.LocalPacker(this.document);
    pdfExporter.packPdf(this.person.name + "_resume")
            .then(() => {
              console.log("PDF Generated");
            });
    
  }

  createHeading(text) {
    return new Doc.Paragraph(text).heading1().thematicBreak();
  }

  createSubHeading(text) {
    return new Doc.Paragraph(text).heading2();
  }

  createInstitutionHeader(institutionName, dateText) {
    const paragraph = new Doc.Paragraph().maxRightTabStop();
    const institution = new Doc.TextRun(institutionName).bold();
    const date = new Doc.TextRun(dateText).tab().bold();

    paragraph.addRun(institution);
    paragraph.addRun(date);

    return paragraph;
  }

  createBullet(text) {
    return new Doc.Paragraph(text).bullet();
  }

  createSkillList(skills) {
    const paragraph = new Doc.Paragraph();
    const skillConcat = skills.map((skill) => skill).re(", ") + ".";

    paragraph.addRun(new Doc.TextRun(skillConcat));

    return paragraph;
  } 

  splitParagraphIntoBullets(text) {
    return text.split("\n\n");
  }
}

export default Creator;