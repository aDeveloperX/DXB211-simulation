var people = [];
var totalPPL = 40;
var totalInfecters = totalPPL / 5;
let isGatheringApplied = false;
let isMaskApplied = false;
let isStayingHomeApplied = false;
let start = Date.now();
let end;
let isAllInfected = false;

//generate people and push them into the list
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
    `Gathering restrction: ${isGatheringApplied ? "Enabled" : "Disabled"}`,
    10,
    30
  );
  text(`Mask: ${isMaskApplied ? "Enabled" : "Disabled"}`, 10, 60);
  text(
    `Staying home: ${isStayingHomeApplied ? "Enabled" : "Disabled"}`,
    10,
    90
  );
  pop();
}

function setSneezeBound() {
  people.forEach((each) => {
    each.sneezeBound = isMaskApplied ? 1 : 50;
  });
}

function restartSimulation() {
  people = [];
  totalPPL = isGatheringApplied ? 20 : 60;
  totalInfecters = totalPPL / 4;

  generatePPL();
  end = undefined;
  isAllInfected = false;
  start = Date.now();
}

function setPause() {
  people.forEach((each) => {
    each.pause = isStayingHomeApplied ? true : false;
  });
}

// add button and button actions
function setupButtons() {
  btnGathering = createButton("Toggle Gathering restriction");
  btnMask = createButton("Toggle Mask restriction");
  btnStayingHome = createButton("Toggle Staying Home restriction");
  btnRestart = createButton("Restart");
  btnGathering.position(10, windowHeight - 30);
  btnMask.position(175, windowHeight - 30);
  btnStayingHome.position(315, windowHeight - 30);
  btnRestart.position(windowWidth - 70, windowHeight - 30);
  btnRestart.mousePressed(restartSimulation);
  btnGathering.mousePressed(() => {
    isGatheringApplied = !isGatheringApplied;
    restartSimulation();
  });
  btnMask.mousePressed(() => {
    isMaskApplied = !isMaskApplied;
  });
  btnStayingHome.mousePressed(() => {
    isStayingHomeApplied = !isStayingHomeApplied;
  });
}

//display and perform actions for each peron in the list
function showPPL() {
  for (var i = 0; i < totalPPL + totalInfecters; i++) {
    people[i].update();
    people[i].show();
  }
}

//display the timer
function displayTime() {
  push();
  textSize(30);
  if (!end) {
    text(
      `Duration: ${Math.round((Date.now() - start) / 1000)}s`,
      windowWidth / 2 - 60,
      30
    );
  }
  pop();
}

function infect() {
  for (var i = 0; i < totalPPL + totalInfecters; i++) {
    for (var j = 0; j < totalPPL + totalInfecters; j++) {
      people[i].infect(people[j]);
    }
  }
}

function checkInfection() {
  for (var i = 0; i < totalPPL + totalInfecters; i++) {
    if (!people[i].isInfected) {
      return;
    }
  }
  isAllInfected = true;
  if (!end) {
    end = Date.now();
  }
}

function displayResult() {
  if (isAllInfected) {
    push();
    textSize(30);
    text(
      `Simulation completed, it took ${Math.round(
        (end - start) / 1000
      )}s to infect everyone`,
      windowWidth / 2 - 330,
      windowHeight / 2 - 30
    );
    pop();
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
  infect();
  setSneezeBound();
  checkInfection();
  displayResult();
  setPause();
  displayTime();
  displayRestrictions();
}
