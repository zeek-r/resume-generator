const Doc = require('docx');

class Creator {
  constructor(person) {
    this.person = person;
    this.document = new Doc.Document();
  }

  createResume() {
    let exporter = new Doc.LocalPacker(this.document);
    exporter.pack(this.person.name + "_resume");
    exporter.packPdf(this.person.name + "_resume")
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
    const skillConcat = skills.map((skill) => skill.name).join(", ") + ".";

    paragraph.addRun(new Doc.TextRun(skillConcat));

    return paragraph;
  } 

  splitParagraphIntoBullets(text) {
    return text.split("\n\n");
  }
}

export default Creator;