var people = [];
var totalPPL = 40;
var totalInfecters = 10;

function generatePPL() {
  for (var i = 0; i < totalPPL; i++) {
    people.push(new Person(false));
  }
  for (var i = 0; i < totalInfecters; i++) {
    people.push(new Person(true));
  }
}

function showPPL() {
  for (var i = 0; i < totalPPL + totalInfecters; i++) {
    people[i].update();
    people[i].show();
  }
}

function checkInfect() {
  for (var i = 0; i < totalPPL + totalInfecters; i++) {
    for (var j = 0; j < totalPPL + totalInfecters; j++) {
      people[i].infect(people[j]);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  generatePPL();
}

function draw() {
  background(50, 89, 100);
  showPPL();
  checkInfect();
}
