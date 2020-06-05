class Person {
  constructor(infected) {
    this.x = random(windowWidth);
    this.y = random(height);
    this.diameter = 20;
    this.speed = random(5);
    this.angle = random(360);
    this.isInfecting = false;
    this.isInfected = infected;
    this.hasContacted = false;
    this.red = infected ? 255 : 0;
    this.sneezeTracker = 0;
    this.sneezeBound = 50;
    this.pause = false;
  }

  //when the person sneezes
  sneeze() {
    if (this.isInfected) {
      this.sneezeTracker += 0.5;
      push();
      fill(50, 89, 100);
      ellipse(this.x, this.y, this.sneezeTracker);
      pop();
      text("ahemmm!!", this.x + 10, this.y - 10);
    }
    //reset sneeze
    if (this.sneezeTracker >= this.sneezeBound) {
      this.sneezeTracker = 0;
    }
  }

  //move the person base on the speed and angle
  move() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }

  //the combination of user actions
  update() {
    if (!this.pause) {
      this.move();
    }
    this.bounce();
    this.show();
    this.infecting();
    this.sneeze();
  }

  //infecting check
  infecting() {
    if (this.isInfecting && this.red < 255) {
      this.red += 1;
    }
    if (this.isInfecting && this.red === 255) {
      this.isInfecting = false;
      this.isInfected = true;
    }
  }

  //display the person
  show() {
    if (this.isInfected || this.isInfecting) {
      push();
      this.isInfected
        ? fill(`rgb(${this.red}, 0, 0)`)
        : fill(`rgb(${this.red}, ${255 - this.red}, ${255 - this.red})`);
      ellipse(this.x, this.y, this.diameter);
      pop();
    } else {
      ellipse(this.x, this.y, this.diameter);
    }
  }

  //check the infection between this object and another person object
  infect(person) {
    if (
      this.isInfected &&
      !person.isInfected &&
      !this.isInfecting &&
      !person.isInfecting
    ) {
      //if its in distance
      if (
        (this.x - person.x) * (this.x - person.x) +
          (this.y - person.y) * (this.y - person.y) <=
        this.diameter * this.diameter
      ) {
        if (Math.floor(Math.random() * 9) === 1) {
          if (!this.hasContacted && !person.hasContacted) {
            person.isInfecting = true;
          }
        } else {
          this.hasContacted = true;
          person.hasContacted = true;
        }
      } else {
        this.hasContacted = false;
        person.hasContacted = false;
      }
    }
  }

  //check if the person is collided with the wall
  collidedWall() {
    return (
      this.x > windowWidth || this.y > windowHeight || this.x < 0 || this.y < 0
    );
  }

  //make the user bounce off the wall
  bounce() {
    if (this.collidedWall()) {
      this.angle = random(360);
      var newX = this.speed * Math.cos(this.angle);
      var newY = this.speed * Math.sin(this.angle);
      // keen generating new angle until the user bounces the wall
      while (
        this.x + newX > windowWidth ||
        this.y + newY > windowHeight ||
        this.x + newX < 0 ||
        this.y + newY < 0
      ) {
        this.angle = random(360);
        newX = this.speed * Math.cos(this.angle);
        newY = this.speed * Math.sin(this.angle);
        this.speed = random(5);
      }
    }
  }
}
