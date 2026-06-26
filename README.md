# Clase 10

## Link de web pública (github pages)

<https://drescuebbas.github.io/proyecto-pensamiento-computacional-s5/>

### Título del proyecto

Overlook

### Referencia de origen / bibliografía

The Shinning, Stanley Kubrick 1980

### Imagen de referencia de proyecto

<img src="assets/img/AfichePensamiento.jpg" width="400">
<!-- Deja acá una imagen de la "portada" de tu proyecto. Como si fuera un afiche. Puede ser un fotograma de toda la interacción. -->

### Integrantes

Andres Cuevas[drescuebbas](https://github.com/drescuebbas)

Fernando Bazaes[fernandobzs](https://github.com/fernandobzs)


### Enlace de p5.js 

<https://editor.p5js.org>

<!-- no trabajamos todo en p5, porque los archivos son muy pesados (vscode)
<!-- https://editor.p5js.org/dresCuevass/sketches/TRFBaY4y7 -->

### Relato inicial
Danny atrapado entre su don psíquicoy su violento entorno familiar, se ve jugando en un pasillo donde tiene que tomar multiples decisiones, entre alucinaciones maleficas y escapatorias para poder salir del hotel overlook donde se está consumiendo su "resplandor". 

### Storyboard

Imágenes del storyboard, las que deben verse acá y estar subidas en el mismo repositorio

<img src="assets/img/storyboard1.png" width="400">
<img src="assets/img/caminosJuego.jpeg" width="400">

### Estados

Describe acá los estados de tu máquina (mínimo 3 para proyectos individuales, 6 para parejas, 9 para tríos), y la condición de salida. Incluye la sección de código que muestra ese estado

#### Estado 1

En el primer estado, con alicia frente al conejo

al hacer scroll, Alicia empieza a caer

En el primer estado, se encuentra a Danny rondando por los pasillos del hotel, y debe elegir una habitación a la cual acceder

```js
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

  push()
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(3);
    //text("algunawea??", width / 2, height / 2);
    textSize(30);
    text("haz click en alguna puerta", width/2, height*3/4);
  pop();
  //dibujarHitboxesPuertas();
}
```


#### Estado 2
En este estado, el usuario debe scrollear hacia abajo para hacer que el ascensor se abra y permita que la sangre salga del ascensor

```js
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

  push()
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(3);
    //text("algunawea??", width / 2, height / 2);
    textSize(30);
    text("haz scroll hacia abajo para llenar con sangre", width/2, height*3/4);
  pop();

```

