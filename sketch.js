// idea: pantalla de inicio, pero el botón de start hay que clickearlo 4 veces para iniciar, "home" de henry hall de fondo
// música del OST de fondo
// hacer que danny se achique cuando se acerque a la mitad de la pantalla, y que se agrande cuando se acerque al final de la pantalla

const E = {INICIO:0, PASILLO: 1, ASCENSOR: 2, GEMELAS: 3, HACHA: 4, DUCHA: 5, LABERINTO: 6, MUERTE: 7}; // estados de la historia
const NOMBRE = ['INICIO', 'PASILLO', 'ASCENSOR', 'GEMELAS', 'HACHA', 'DUCHA', 'LABERINTO', 'MUERTE'];
let estadoAnterior = -1;
let estado;
//pasillo
let danny, danny2, pasillo;

let dannX=0;
let dannY=200;
let prevMouseX, prevMouseY; // posición anterior del mouse
let dx;
let dy;
let posY = 0;

// ascensor
let progresoScrollAscensor = 0; 
let imgAscensorCerrado;
let imgAscensorEntreabierto;
let imgAscensorCasiAbierto; 
let imgAscensorAbierto;

//banio vieja
let capaVaho;
let porcentajeBorrado = 0; 

//hacha
let golpesHacha = 0;
let temblorHacha = 0;
let imgPuertaSana;
let imgPuertaMedioRota; 
let imgPuertaRota;
let imgPuertaJohnny; 

//gmelas
let imgGemelas;
let imgGemelasSangre;
let acercamiento = 1; // Controla el zoom

//laberinto
let imgMapa;
let imgColision;
let mapaOculto;
let eliX = 58; //pto inicio en X
let eliY = 80; //pto inicio en Y
let ptoX = 58;
let ptoY = 58;

//pantalla muerte
let imgMuerte;
let temaMuerte;

// pantalla inicio
let imgInicio;
let temaInicio;

let tiempoRest = 30;
let laberintoTerminao = false;

const FACTOR = 0.1;

function preload() {
  danny = loadImage('assets/img/danny.png');
  danny2 = loadImage('assets/img/dannyvolteao.png');
  pasillo = loadImage('assets/img/pasillo.png');
  imgAscensorCerrado = loadImage('assets/img/AscensorCerrao.png');
  imgAscensorEntreabierto = loadImage('assets/img/AscensorEntreabierto.png'); 
  imgAscensorCasiAbierto = loadImage('assets/img/AscensorCasiAbierto.png');
  imgAscensorAbierto = loadImage('assets/img/AscensorAbierto.png'); 
  imgPuertaSana = loadImage('assets/img/puerta_sana.png');
  imgPuertaMedioRota = loadImage('assets/img/puerta_mediorota.png'); 
  imgPuertaRota = loadImage('assets/img/puerta_rota.png');
  imgPuertaJohnny = loadImage('assets/img/puerta_johnny.png');
  imgMapa = loadImage('assets/img/mapasinFondo.png');
  imgColision = loadImage('assets/img/mapa.png');
  imgMuerte = loadImage('assets/img/ballroom.webp');
  temaMuerte = loadSound('assets/audio/masquerade.mp3');
  imgInicio = loadImage('assets/img/ballroom.webp');
  temaInicio = loadSound('assets/audio/home.mp3');
  // imgGemelas = loadImage('assets/img/gemelas.png');
  // imgGemelasSangre = loadImage('assets/img/gemelas_sangre.png');
}

function setup() {
  prevMouseX = width / 2;
  prevMouseY = height / 2;

  createCanvas(windowWidth, windowHeight);
  //estado = E.PASILLO; // primer "acto"
  estado = E.INICIO; // pa probar (sacar después)
  frameRate(10);

  // pasillo
  pasillo.resize(width/10, 0); 
  danny.resize(width/15, 0);
  danny2.resize(width/15, 0);

  // ascensor
  imgAscensorCerrado.resize(70, 0); 
  imgAscensorEntreabierto.resize(70, 0); 
  imgAscensorCasiAbierto.resize(70, 0); 
  imgAscensorAbierto.resize(70, 0); 

  // // gmelas
  // imgGemelas.resize(70, 0);
  // imgGemelasSangre.resize(70, 0);

  // hacha
  imgPuertaSana.resize(70, 0);
  imgPuertaMedioRota.resize(70, 0); 
  imgPuertaRota.resize(70, 0);
  imgPuertaJohnny.resize(70, 0);

  noSmooth();
  textAlign(CENTER, CENTER);

  // baño vieja
  capaVaho = createGraphics(width, height); //pal bañovieja
  capaVaho.background(150, 180, 180, 240); 

  // laberinto
  mapaOculto = createGraphics(width, height); //máscara interna
  mapaOculto.image(imgColision, 0, 0, width, height);
  //temaMuerte.setVolume(0.1);
  //temaMuerte.play();
}

function draw() {

  if (estado !== estadoAnterior) {
    if (estado === E.LABERINTO) {
      frameRate(60); // laberinto DEBE estar en 60
    } else {
      frameRate(10);
    }
    estadoAnterior = estado; // Actualizamos la memoria
  }

  let deltaX = mouseX - prevMouseX;
  let deltaY = mouseY - prevMouseY;

  background(220);

  //textFont('Arial');
  
  // falta inicio y muerte
  switch(estado){
    case E.INICIO:
      dibInicio();
      break;
    case E.PASILLO:
      dibPasillo();
      break;
    case E.ASCENSOR:
      dibAscensor();
      break;
    case E.GEMELAS:
      dibGemelas();
      break;
    case E.HACHA:
      dibHacha();
      break;
    case E.DUCHA:
      dibDucha();
      break; 
    case E.LABERINTO:
      dibLaberinto(deltaX, deltaY);
      break;
    case E.MUERTE:
      dibMuerte();
      break;
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  // debug
  text('mouseX: ' + mouseX, 170, 30);
  text('mouseY: ' + mouseY, 170, 50);
  text('width: ' + width, 170, 70);
  text('height: ' + height, 170, 90);

  //text('estado: ' + NOMBRE[estado], 50, 30); //sacar despues
}

// modificar texto e imagen
function dibInicio(){
  if (temaInicio && !temaInicio.isPlaying()) {
    temaInicio.setVolume(0.5);
    temaInicio.play();
  }

  background(220);

  push();
    translate(width/2, height/2);
    imageMode(CENTER);
    image(imgInicio, 0, 0, width + 100, height);
  pop();

  push()
    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(3);
    text("algunawea??", width / 2, height / 2);
    textSize(30);
    text("haz click para iniciar", width/2, (height/2)+40);
  pop();

}

function dibPasillo(){
  push();
    translate(width/2, height/2);
    imageMode(CENTER);
    image(pasillo, 0, 0, width, width);

    // animación danny
    let mouseLimitado = constrain(mouseY, height/2, height);
    dannY = mouseLimitado - height/2;

    let escala = map(mouseLimitado, height/2, height, 0.3, 1.5);
    let anchoDanny = (width/3) * escala;
    let altoDanny = (width/3) * escala;

    if (frameCount%2==0){ 
      image(danny, 0, dannY, anchoDanny, altoDanny);
    }
    else{
      //image(danny2, 0, height/4, width/3, width/3);
      image(danny2, 0, dannY, anchoDanny, altoDanny);
    }
  pop();
  dibujarHitboxesPuertas();
}

function dibHitboxes(){
  rectMode(CENTER);
  
  fill(255, 0, 0, 100); 
  rect(width * 0.20, height/2, 80, 200);
  fill(255);
  text("ascensor)", width * 0.20, height/2);

  fill(0, 255, 0, 100); 
  rect(width * 0.40, height/2 - 50, 80, 200);
  fill(255);
  text("gmelas)", width * 0.40, height/2 - 50);

  fill(0, 0, 255, 100); 
  rect(width * 0.60, height/2, 80, 200);
  fill(255);
  text("hacha)", width * 0.60, height/2);

  fill(255, 255, 0, 100); 
  rect(width * 0.80, height/2 - 50, 80, 200);
  fill(255);
  text("ducha)", width * 0.80, height/2 - 50);
}

function dibAscensor(){
  background(20); 
  
  push();
    translate(width/2, height/2); 
    imageMode(CENTER);
    
    if (progresoScrollAscensor < 25) {
      image(imgAscensorCerrado, 0, 0, width, height); 
    } 
    else if (progresoScrollAscensor < 50) {
      image(imgAscensorEntreabierto, 0, 0, width, height); 
    } 
    else if (progresoScrollAscensor < 75) {
      image(imgAscensorCasiAbierto, 0, 0, width, height); 
    } 
    else {
      image(imgAscensorAbierto, 0, 0, width, height); 
      
      let sangre = map(progresoScrollAscensor, 75, 180, 0, height);
      sangre = constrain(sangre, 0, height); 
      
      let tamañoPixel = width / 70; 
      let sangreBloque = floor(sangre / tamañoPixel) * tamañoPixel; 
      
      fill(180, 0, 0); 
      noStroke(); 
      rectMode(CORNER);
      
      randomSeed(sangreBloque); 
      for (let x = -width/2; x < width/2; x += tamañoPixel) {
        let salpique = floor(random(0, 4)) * tamañoPixel; 
        rect(x, height/2 - sangreBloque - salpique, tamañoPixel, sangreBloque + salpique);
      }
    }
  pop();
  
  randomSeed(frameCount); 
  
  if (progresoScrollAscensor >= 180) {
    estado = E.PASILLO;
    progresoScrollAscensor = 0;
  }
}

// meter imagenes gmelas
function dibGemelas(){
  background(20); 
  push();
    translate(width/2, height/2); 
    imageMode(CENTER);

    let mouseYLimitado = constrain(mouseY, 0, height);
    acercamiento = map(mouseYLimitado, height, 0, 1, 2.5);
    
    let anchoZoom = width * acercamiento;
    let altoZoom = height * acercamiento;
    
    if (acercamiento < 2.2) {
      // image(imgGemelas, 0, 0, anchoZoom, altoZoom);

      fill(255);
      textSize(20);
      text("ven a jugar con nosotras, Danny...", 0, height/2 - 50);
    } else {
      // flicker sanguinolento
      if (frameCount % 4 < 2) {
        image(imgGemelasSangre, 0, 0, anchoZoom, altoZoom);
      } else {
        // image(imgGemelas, 0, 0, anchoZoom, altoZoom);
      }
    }
  pop();
}

function dibHacha(){
  background(20); 
  
  let offsetX = random(-temblorHacha, temblorHacha);
  let offsetY = random(-temblorHacha, temblorHacha);
  
  push();
    translate(width/2 + offsetX, height/2 + offsetY); 
    imageMode(CENTER);
    
    if (golpesHacha < 2) {
      image(imgPuertaSana, 0, 0, width, height);
    } else if (golpesHacha < 4) {
      image(imgPuertaMedioRota, 0, 0, width, height);
    } else if (golpesHacha < 5) {
      image(imgPuertaRota, 0, 0, width, height);
    } else {
      image(imgPuertaJohnny, 0, 0, width, height);
    }
  pop();
  
  if (temblorHacha > 0) {
    temblorHacha -= 1;
  }
 
  if (golpesHacha >= 5) {
    textSize(60);
    fill(255, 0, 0); 
    text("¡HERE'S JOHNNY!", width/2, height/2);
  }
  
  if (golpesHacha >= 6) {
    estado = E.LABERINTO;
    golpesHacha = 0; 
  }
}

// ver codigo mio actualizado 
// cambiar imagen laberinto
function dibLaberinto(dx, dy) {
  
  // descontar tiempo
  if (frameCount % 60 === 0 && tiempoRest > 0) {
    tiempoRest--;
  }

  if (tiempoRest <= 0) {
    // laberintoTerminao = true;
    estado=E.MUERTE;
  }
  
  if (mouseIsPressed && mouseButton === LEFT) {
    eliX += dx * FACTOR; 
    eliY += dy * FACTOR;
    
    eliX = constrain(eliX, 0, width);
    eliY = constrain(eliY, 0, height);
  }
  
  let colorDetectado = mapaOculto.get(eliX, eliY);
  
  if (colorDetectado[0] > 200) {
    background(0, 100, 250); 
  } 
  // cambiar coordenadas y tambien que cuando llegue al final muestre mensaje de victoria
  else if (eliX > 532 && eliX < 557 && eliY > 344 && eliY < 354){ 
    background(0, 250, 10); 
  }
  else {
    background(250, 50, 50);  
    tiempoRest = tiempoRest-2;
    eliX = ptoX;
    eliY = ptoY;
  }
  
  imageMode(CORNER);
  image(imgMapa, 0, 0, width, height);
  
  fill(255);
  noStroke();
  ellipse(eliX, eliY, 15, 15);
  
  fill(255); 
  textSize(24);
  textAlign(RIGHT, TOP);
  text("tiempo: " + tiempoRest, width - 20, 20); 
}

// ver codigo fernan2 actualizado
function dibDucha(){
  background(30, 50, 30); // Un verde mohoso
  fill(200, 150, 150);
  rectMode(CENTER);
  // duchavieja.png
  rect(width/2, height/2, 150, 300); 
  fill(255);
  textSize(20);
  text("¡Ahí está la vieja!", width/2, height/2 - 180);

  imageMode(CORNER);
  image(capaVaho, 0, 0);

  fill(255);
  textSize(20);
  text("la ducha", width/2, 40);
  text("Haz CLIC Y ARRASTRA para limpiar el vaho", width/2, 70);
  
  //boton pa volver al pasillo
  fill(100);
  rectMode(CENTER);
  rect(width/2, height - 50, 200, 40);
  fill(255);
  text("volver al pasillo", width/2, height - 50); //cambiar
}

function dibMuerte(){
  if (temaMuerte && !temaMuerte.isPlaying()) {
    temaMuerte.setVolume(0.5);
    temaMuerte.play();
  }

  background(220);

  push();
    translate(width/2, height/2);
    imageMode(CENTER);
    image(imgMuerte, 0, 0, width + 100, height);
  pop();

  push()
    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(3);
    text("HAS MUERTO", width / 2, height / 2);
    textSize(30);
    text("haz click para volver al inicio", width/2, (height/2)+40);
  pop();

  // agregar boton para reiniciar el juego AQUI
}

function dibujarHitboxesPuertas() { // SACAR (ocultar)
  rectMode(CENTER);
  
  fill(255, 0, 0, 100); 
  rect(width * 0.20, height/2, 80, 200);
  fill(255);
  text("Acto 2\n(Ascensor)", width * 0.20, height/2);

  fill(0, 255, 0, 100); 
  rect(width * 0.40, height/2 - 50, 80, 200);
  fill(255);
  text("Acto 3\n(Gemelas)", width * 0.40, height/2 - 50);

  fill(0, 0, 255, 100); 
  rect(width * 0.60, height/2 - 50, 80, 200);
  fill(255);
  text("Acto 4\n(Hacha)", width * 0.60, height/2);

  fill(255, 255, 0, 100); 
  rect(width * 0.80, height/2, 80, 200);
  fill(255);
  text("Acto 5\n(Ducha)", width * 0.80, height/2 - 50);
}

function mousePressed(){
  if(estado ==E.PASILLO){
    // agregar límite izq, arriba y abajo
    if (mouseX < width * 0.20 + 40 && mouseX > width * 0.20 - 40 && mouseY < height/2 + 100) {
      estado = E.ASCENSOR; // ascensor
    } 
    else if (mouseX > width * 0.40 - 40 && mouseX < width * 0.40 + 40 && mouseY < height/2 + 50 && mouseY > height/2 - 150) {
      estado = E.GEMELAS; // gmelas
    }
    else if (mouseX > width * 0.60 - 40 && mouseX < width * 0.60 + 40 && mouseY < height/2 + 50 && mouseY > height/2 - 150) {
      estado = E.HACHA; // hacha
    }
    else if (mouseX > width * 0.80 - 40 && mouseX < width * 0.80 + 40 && mouseY < height/2 + 100) {
      estado = E.DUCHA; // ducha
    }
  } 
  else if (estado == E.GEMELAS) {
    estado = E.PASILLO; // volver al pasillo
  }
 
  else if (estado == E.HACHA) {
    golpesHacha++;
    temblorHacha = 20; // iniciar temblor

  }
  else if (estado == E.DUCHA) {
    if (mouseY > height - 100) {
      estado = E.PASILLO; // volver al pasillo
    }
  }
  else if (estado == E.MUERTE){
    estado = E.PASILLO;
    temaMuerte.stop();
  }
  else if (estado == E.INICIO){
    estado = E.PASILLO;
    temaInicio.stop();
  }
}

function mouseDragged() {
  if (estado == E.DUCHA) {
    capaVaho.erase(); // activar modo borrado
    capaVaho.noStroke();

    let tamañoPixel = width / 70; 
    let posX = floor(mouseX / tamañoPixel) * tamañoPixel;
    let posY = floor(mouseY / tamañoPixel) * tamañoPixel;
    
    capaVaho.rect(posX, posY, tamañoPixel * 4, tamañoPixel * 4);
    
    capaVaho.noErase(); // Apagamos el borrador
  }
}

function mouseWheel(event) {
  if (estado == E.ASCENSOR) {
    progresoScrollAscensor += event.delta * 0.05;
 
    if (progresoScrollAscensor < 0) {
      progresoScrollAscensor = 0; 
    }
  }
  return false;
}






