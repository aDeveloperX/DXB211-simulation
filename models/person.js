class Person {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(height);
    this.diameter = 20;
    this.speed = 20;
    this.angle = random(360);
  }

  move() {
    this.x += Math.cos(this.angle);
    this.y += Math.sin(this.angle);
  }

  show() {
    this.move();
    this.bounce();
    ellipse(this.x, this.y, this.diameter);
  }

  bounce() {
    if (
      this.x > windowWidth ||
      this.y > windowHeight ||
      this.x < 0 ||
      this.y < 0
    ) {
      this.angle = random(360);
      var newX = Math.cos(this.angle);
      var newY = Math.sin(this.angle);
      while (
        this.x + newX > windowWidth ||
        this.y + newY > windowHeight ||
        this.x + newX < 0 ||
        this.y + newY < 0
      ) {
        this.angle = random(360);
        newX = Math.cos(this.angle);
        newY = Math.sin(this.angle);
      }
    }
  }
}
