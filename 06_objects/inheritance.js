'use strict'

// ES6
//Class creation
class Document {
  constructor(title, author, isPublished) {
    this.title = title;
    this.author = author;
    this.isPublished = isPublished;
  }
  publish() {
    this.isPublished = true;
  }
}
//Class inherittance
class Book extends Document {
  constructor(title, author, topic) {
    super(title, author, true);
    this.topic = topic;
  }
}


let d = new Document('Javascript para todos', 'Luismi', false);
d.publish();

let b = new Book('Javascript para alumnos de 2º DAM', 'Luismi', 'Programación');

console.log(b);



