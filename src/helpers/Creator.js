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
    this.addEducation();
    this.addExperiences();
    this.generateFiles();
  }

  addTitle(title) {
    const paragraph = new Doc.Paragraph(title).heading1().center().thematicBreak();
    this.document.addParagraph(paragraph);
    this.addBreak();
  }

  addSectionTitle(title) {
    const paragraph = new Doc.Paragraph(title).heading2().center().thematicBreak();
    this.document.addParagraph(paragraph);
  }

  addSkills() {
    this.addSectionTitle('Skills');
    let skills = this.person.skills.map((skill) => {
      return skill.replace('#', '');
    });
    skills.forEach(skill => {
      this.document.addParagraph(this.createBullet(skill));
    });
    this.document.addParagraph(this.addBreak());
  }

  addEducation() {
    this.addSectionTitle('Education');
    this.person.education.forEach(education => {
      this.addLogo(education.logo);
      this.document.addParagraph(this.createInstitutionHeader(education.school_name, education.year));
      this.document.addParagraph(this.createBullet(education.title + ', ' + education.level));
      this.document.addParagraph(this.addBreak());
    });
  }

  addExperiences() {
    this.addSectionTitle('Experiences');
    console.log(this.person);
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
  addBreak() {
    const paragraph = new Doc.Paragraph(" ");
    return paragraph;
  }

  addLogo(logo) {
    try {
      const logo = this.document.createImage('./src/data-source/'+ logo);
      logo.right();
      this.document.addParagraph(logo);
    }
    catch (error){
      console.log("Error: " + logo + " not found, Skipping adding that image");
    }
  }
}

export default Creator;