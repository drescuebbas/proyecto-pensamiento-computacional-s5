// https://editor.p5js.org/dresCuevass/sketches/o9yPAvszO (contiene imágenes, por lo que si se ejecuta el código en otro lado no se verán.)
// viernes 12 de junio

let danny, danny2, pasillo;

function preload(){
  danny = loadImage('./img/danny.png')
  danny2 = loadImage('./img/dannyvolteao.png')
  pasillo = loadImage('./img/pasillo.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(400, 400);
  frameRate(10);
  pasillo.resize(width/10, 0); 
  danny.resize(width/15, 0);
  danny2.resize(width/15, 0);
  noSmooth();
}

function draw() {
  background(220);
  
  
  
  push();
    translate(width/2, height/2);
    imageMode(CENTER);
  
    image(pasillo, 0, 0, width, width)
    
    if (frameCount%2==0){
      image(danny, 0, height/4, width/3, width/3);
    }
    else{
      image(danny2, 0, height/4, width/3, width/3);
    }
  pop();
}


// ----------------------------------------------------
/*

el resplandor
6 actos
niño andando en triciclo

1. danny triciclo en pasillo
2. 
3. 
4. 
5. 
6. laberinto (visto desde arriba), danny escapando de johnny


primer acto tiene 3 opciones para clickear, acto 2, 3 o 4




niñas gemelas
vieja baño
ascensor cerrao
ascensor abierto con sangre
johnny hacha


*/
// ----------------------------------------------------
