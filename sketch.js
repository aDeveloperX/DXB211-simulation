var people = [];
var totalNumber = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < totalNumber; i++) {
    people.push(new Person());
  }
}

function draw() {
  background(50, 89, 100);
  for (var i = 0; i < totalNumber; i++) {
    people[i].show();
  }
}
