"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(person) {
  _classCallCheck(this, Person);

  this.name = person.name;
  this.skills = person.skills;
  this.experience = person.experiences;
  this.education = person.education;
};

exports.default = Person;