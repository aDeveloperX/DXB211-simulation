class Person {
  constructor(infected) {
    this.x = random(windowWidth);
    this.y = random(height);
    this.diameter = 20;
    this.speed = 3;
    this.angle = random(360);
    this.isInfected = infected;
  }

  move() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }

  update() {
    this.move();
    this.bounce();
    this.show();
  }

  show() {
    if (this.isInfected) {
      push();
      fill("red");
      ellipse(this.x, this.y, this.diameter);
      pop();
    } else {
      ellipse(this.x, this.y, this.diameter);
    }
  }

  infect(person) {
    if (this.isInfected && !person.isInfected) {
      console.log("http://127.0.0.1:5500/index.html");
      //if its in distance
      if (
        (this.x - person.x) * (this.x - person.x) +
          (this.y - person.y) * (this.y - person.y) <=
        this.diameter * this.diameter
      ) {
        console.log("asd");
        person.isInfected = true;
      }
    }
  }

  collidedWall() {
    return (
      this.x > windowWidth || this.y > windowHeight || this.x < 0 || this.y < 0
    );
  }

  bounce() {
    if (this.collidedWall()) {
      this.angle = random(360);
      var newX = this.speed * Math.cos(this.angle);
      var newY = this.speed * Math.sin(this.angle);
      while (
        this.x + newX > windowWidth ||
        this.y + newY > windowHeight ||
        this.x + newX < 0 ||
        this.y + newY < 0
      ) {
        this.angle = random(360);
        newX = this.speed * Math.cos(this.angle);
        newY = this.speed * Math.sin(this.angle);
      }
    }
  }
}
