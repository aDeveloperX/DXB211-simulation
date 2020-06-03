var people = [];
var totalPPL = 40;
var totalInfecters = 8;
let socialDistance;
let hasStarted = false;
let isGatheringApplied = false;
let isMaskApplied = false;
let isStayingHomeApplied = false;

function generatePPL() {
  for (var i = 0; i < totalPPL; i++) {
    people.push(new Person(false));
  }
  for (var i = 0; i < totalInfecters; i++) {
    people.push(new Person(true));
  }
}

function displayRestrictions() {
  push();
  textSize(22);
  text(
    `Gathering restrction ${isGatheringApplied ? "enabled" : "disabled"}`,
    10,
    30
  );
  text(`Mask ${isMaskApplied ? "enabled" : "disabled"}`, 10, 60);
  text(`Staying home ${isStayingHomeApplied ? "enabled" : "disabled"}`, 10, 90);
  pop();
}

function restartSimulation() {
  people = [];
  totalPPL = isGatheringApplied ? 10 : 40;
  totalInfecters = Math.round(totalPPL / 5);
  generatePPL();
}

function setupButtons() {
  btnGathering = createButton("Apply Gathering restriction");
  btnSocialDistance = createButton("Apply Mask restriction");
  btnStayingHome = createButton("Apply Staying Home restriction");
  btnRestart = createButton("Restart");
  btnGathering.position(10, windowHeight - 30);
  btnSocialDistance.position(170, windowHeight - 30);
  btnStayingHome.position(360, windowHeight - 30);
  btnRestart.position(windowWidth - 70, windowHeight - 30);
  btnRestart.mousePressed(restartSimulation);
  btnGathering.mousePressed(() => {
    isGatheringApplied = !isGatheringApplied;
    restartSimulation();
  });
  btnSocialDistance.mousePressed(() => {
    isSocialDistanceApplied = !isSocialDistanceApplied;
    restartSimulation();
  });
  btnStayingHome.mousePressed(() => {
    isStayingHomeApplied = !isStayingHomeApplied;
    restartSimulation();
  });
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
  setupButtons();
}

function draw() {
  background(50, 89, 100);
  showPPL();
  checkInfect();
  displayRestrictions();
}
