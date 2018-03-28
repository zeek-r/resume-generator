const Doc = require('docx');
import styles from './Styler';
class Creator {

  /* Constructor, takes person object as input, and also instantiates document */
  constructor(person) {
    this.person = person;
    this.document = new Doc.Document();
    this.document.Header.createParagraph(" ");
    this.document.Footer.createParagraph(" ");
  }

  /*Creates Resume with Skill, Education and Experience field */
  createResume() {
    this.addTitle(this.person.name);
    this.addSkills();
    this.addEducation();
    this.addExperiences();
    this.generateFiles();
  }

  /* Adds Name title to Resume */
  addTitle(title) {
    const mainTitle = new Doc.Paragraph();
    const text = new Doc.TextRun(title).bold().allCaps();
    mainTitle.addRun(text);
    mainTitle.center().heading1().thematicBreak();
    this.document.addParagraph(mainTitle);
    this.addBreak();
  }

  /* Adds Section title like Skill, Education etc to Resume */
  addSectionTitle(title) {
    const sectionTitle = new Doc.Paragraph();
    const text = new Doc.TextRun(title).bold().allCaps();
    sectionTitle.addRun(text);
    sectionTitle.center().heading2().thematicBreak();
    this.document.addParagraph(sectionTitle);
  }

  /* Creates Headers inside Sections like Skill, Education */
  addSubSectionTitle(title) {
    const paragraph = new Doc.Paragraph();
    const subSectionTitle = new Doc.TextRun(title).bold().underline().allCaps();
    paragraph.addRun(subSectionTitle);
    paragraph.center();
    this.document.addParagraph(paragraph);
  }

  /* Adds Skill Section to resume */
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

  /* Adds Education Section to resume */  
  addEducation() {
    this.addSectionTitle('Education');
    this.person.education.forEach(education => {
      this.addLogo(education.logo);
      this.createInstitutionHeader(education.school_name, education.year);
      this.document.addParagraph(this.createBullet(education.title + ', ' + education.level));
      this.document.addParagraph(this.addBreak());
    });
  }

  /* Adds Experience section to resume */ 
  addExperiences() {
    this.addSectionTitle('Experiences');
    this.person.experiences.forEach(experience => {
      this.addLogo(experience.company_logo);
      this.createInstitutionHeader(experience.company, experience.work_year);
      this.document.addParagraph(this.createBullet(experience.postion));
      this.addSubSectionTitle('duties');
      experience.duties.forEach(duty => {
        this.document.addParagraph(this.createBullet(duty));
      });
      this.document.addParagraph(this.addBreak());
    });
  }

  /** Creates Institution header with date like Work, School */
  createInstitutionHeader(institutionName, dateText = 'Current') {
    const paragraph = new Doc.Paragraph().maxRightTabStop();
    const institution = new Doc.TextRun(institutionName).bold();
    const date = new Doc.TextRun(dateText).tab().bold();

    paragraph.addRun(institution);
    paragraph.addRun(date);
    this.document.addParagraph(paragraph);
  }

  /* Returns Bullet text of the input */
  createBullet(text) {
    return new Doc.Paragraph(text).bullet();
  }

  /* Returns Empty Paragraph use for creating line break */
  addBreak() {
    const paragraph = new Doc.Paragraph(" ");
    return paragraph;
  }

  /* Adds Logo of the institution, if available in the data-source directory */
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

   /* Generates Docx and Pdf File in the root directory of the project */
   generateFiles() {
    let docExporter = new Doc.LocalPacker(this.document, styles);
    docExporter.pack(this.person.name + "_resume")
            .then(() => {
              console.log("Docx Generated");
              console.log("Building PDF, Might take some time.....");
            })
            .catch(error => {
              console.log(error);
            });
    let pdfExporter = new Doc.LocalPacker(this.document);
    pdfExporter.packPdf(this.person.name + "_resume")
            .then(() => {
              console.log("PDF Generated");
            })
            .catch(error => {
              console.log(error);
            });
    
  }
}

export default Creator;