let particles = [];
let numParticles = 100;
let time = 0; // Variable para animar el fondo

function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("#my-p5-sketch");
  for (let i = 0; i < numParticles; i++) {
    let offset = (i % 2 === 0 ? 1 : -1) * (floor(i / 10) * 10);
    particles.push(
      new Particle(
        width / 2,
        height / 2,
        offset,
        i % 2 === 0 ? color(0, 255, 255) : color(255, 0, 255)
      )
    );
  }
}

function draw() {
  // Fondo animado
  drawAnimatedGradient();
  drawMovingGrid();

  // Dibujar partículas
  for (let p of particles) {
    p.update(mouseX, mouseY);
    p.display();
  }

  time += 0.01; // Incremento para la animación
}

class Particle {
  constructor(x, y, offset, col) {
    this.x = x;
    this.y = y;
    this.offset = offset;
    this.angle = random(TWO_PI);
    this.radius = random(2, 4);
    this.color = col;
  }

  update(mx, my) {
    this.angle += 0.05; // Velocidad angular
    this.x = mx + sin(this.angle + this.offset) * 50;
    this.y = my + cos(this.angle + this.offset) * 50;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

// Gradiente animado
function drawAnimatedGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c1 = color(0, 20 + sin(time) * 50, 30 + cos(time) * 50);
    let c2 = color(0, 200 + cos(time) * 50, 180 + sin(time) * 50);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// Rejilla en movimiento
function drawMovingGrid() {
  stroke(0, 255, 255, 50); // Líneas translúcidas
  strokeWeight(0.5);

  let offset = sin(time) * 50; // Movimiento oscilante
  for (let x = 0; x < width; x += 50) {
    line(x + offset, 0, x + offset, height);
  }
  for (let y = 0; y < height; y += 50) {
    line(0, y + offset, width, y + offset);
  }
}

// Ajustar tamaño del canvas cuando la ventana cambia
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ajustar tamaño
}
