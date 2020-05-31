class Person {
  constructor(infected) {
    this.x = random(windowWidth);
    this.y = random(height);
    this.diameter = 20;
    this.speed = 3;
    this.angle = random(360);
    this.isInfecting = false;
    this.isInfected = infected;
    this.hasContacted = false;
    this.red = infected ? 255 : 0;
  }

  move() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }

  update() {
    this.move();
    this.bounce();
    this.show();
    this.infecting();
  }

  infecting() {
    if (this.isInfecting && this.red < 255) {
      this.red += 1;
    }
    if (this.isInfecting && this.red === 255) {
      this.isInfecting = false;
      this.isInfected = true;
    }
  }

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
