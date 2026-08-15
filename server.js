const notes = require('./notes.js');
var _ = require('lodash');

var age = notes.age;
var res = notes.addNumber(age, 1);

var data = ["person", "person", 1, 2, 2, 1, "name", "age", '2', "name"];
var filer = _.uniq(data);

console.log(filer);


// console.log(age);
// console.log('Result is now ' + res);


