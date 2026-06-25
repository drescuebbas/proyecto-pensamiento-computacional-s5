// https://editor.p5js.org/dresCuevass/sketches/gQrOEq-rS

// estado laberinto (donde danny se esconde de jack)
// estamos haciendolo en codigos separados a modo de prueba

let imgMapa;
let imgColli;
let mapaOculto; //lienzo guardao en memoria
let eliX = 58; //pto inicio en X
let eliY = 80; //pto inicio en Y
let ptoX = 58;
let ptoY = 58;

let tiempoRest = 30;
let juegoTerminao = false;

let prevMouseX, prevMouseY;
const FACTOR = 0.1;


function preload() {
  imgMapa = loadImage('mapasinFondo.png'); 
  imgColision = loadImage('mapa.png'); 
}

function setup() {
  createCanvas(600, 400);
  prevMouseX = width / 2;
  prevMouseY = height / 2;
  mapaOculto = createGraphics(600, 400); //máscara interna
  mapaOculto.image(imgColision, 0, 0, 600, 400);

}

function draw() {

  if (juegoTerminao) {
    background(20);
    fill(255, 50, 50);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("¡FUISTE WUAJAJA!", width / 2, height / 2);
    return;
  }
  
  if (mouseIsPressed && mouseButton === LEFT) {
    let dx = mouseX - prevMouseX; // prevMouse es la última ubicación del mouse cuando se presionó el click
    let dy = mouseY - prevMouseY;

    // factor de escala
    eliX += dx * FACTOR; // elix = elix + (dx * 0.1) 
    eliY += dy * FACTOR;
    
    eliX = constrain(eliX, 0, width);
    eliY = constrain(eliY, 0, height);
  }
  
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  
  let colorDetectado = mapaOculto.get(eliX, eliY);
  
  if (colorDetectado[0] > 200) {
    background(0, 100, 250); // azul dentro del laberinto
  } 
  else if (eliX>532 && eliX<557 && eliY>344 && eliY<354){
    background(0, 250, 10); //verde, llegaste al final del laberinto (felicidades)
  }
  else {
    background(250, 50, 50);  // rojo si toca el muro
    eliX = ptoX;
    eliY = ptoY;
  }
  
  image(imgMapa, 0, 0, width, height);
  
  // cursor (por ahora, debería ser dannyboy)
  fill(255);
  noStroke();
  ellipse(eliX, eliY, 15, 15);


  
    // --------- DEBUG ---------
  text('eliX: ' + eliX, 20, 20);
  text('eliY: ' + eliY, 20, 35);
  text('colorDetectado: ' + colorDetectado, 20, 50);
  text('mouseX: ' + mouseX, 20, 65);
  text('mouseY: ' + mouseY, 20, 80);
  /*
  text('dx: ' + dx, 20, 95);
  text('dy: ' + dy, 20, 110);
  text('dy: ' + dy, 20, 125);
  text('dy: ' + dy, 20, 140);
 */
  
}
