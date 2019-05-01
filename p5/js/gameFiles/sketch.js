
// TODO: Timer général avec let SPEED.
// TODO: timer entre chaque tir avant upgrade
// TODO: ajouter menu upgrade arme. Ajouter fenetre Scores
// TODO: cookie score.



let etoiles;
let lasers;
let life;
let begin;
let start;
let gameOver;
let score;
let bestScore;
let boss;
let bossTime = false;
let starNb;
let speed;
let speedBool;
let showUpgrade;
//let timeOut;


function setup() {
  begin = true;
  init();
  let canvas = createCanvas(900, 600);
}


function draw() {
  background(18, 0, 35);

  if (!start) {
    createWindow();
  } else if (gameOver) {
    createWindow();
  } else {
    //drawMountains();
    drawBackground();
    avion();
    drawLasers();
    drawStars();

    drawLife();
  }
}

function avion(){
  Plane.show();
  Plane.move();
}

function drawBackground(){
  Mountains.show();
  Mountains.move();
}


function drawStars() {
  if(score < 5000 || score >= 5200 && bossTime === false){
    let size;
    for (let i = etoiles.length; i < starNb; i++) {
      size = random(14, 24);
      let etoile = new Etoile(random(width+size, width + width), random(height / 7, height - height / 7), size);
      etoiles.push(etoile);
    }
    for(let i = 0; i < etoiles.length; i++){

      etoiles[i].show();
      etoiles[i].move();
      Plane.hit(etoiles);
      etoiles[i].kill();
    }
  }else{
     if(!bossTime){
      boss = new Boss();
      bossTime = true;
      etoiles = [];
    }
    boss.move();
    boss.show();
    // l'appel Plane.hit est dans la classe Boss
    boss.kill();
  }
  setSpeed();
}

function drawLife() {

  var i = 1;
  fill(255, 0, 0);
  noStroke();
  while (i <= life) {
    ellipse(width - (30 * i), 20, 25, 25);
    i++;
  }
}

function drawLasers(){
  for(let l =0; l < lasers.length; l++){
    lasers[l].draw();
  }
}


function createWindow() {
  if (gameOver) {
    GameOverWindow.show();
  } else if (begin && !start) {
    startGameWindow.show();
  } else if(showUpgrade){
    upgradeWindow.show();
  }else {
    pauseWindow.show();
  }
}

function setSpeed(){
  if(speedBool && (score == 5000 || score == 12000 || score == 18000 || score == 25000)){
    speed+=0.5;
    speedBool = false;
    console.log("Score = "+score+"| speed = "+speed);
  }
}

/*
###########################
####   - LISTENERS -   ####
###########################
*/
// fonction clicked dans la classe window? Boolean pour savoir si une fenetre visible.
function mousePressed() {

  if (mouseX > 150 && mouseX < width - 475 && mouseY > 150 && mouseY < height - 350 && begin) {
    // Start Game Window -- rect(width/6, height/4, width/3.273, height/6);
    startGame();
  } else if (mouseX > 150 && mouseX < width - 300 && mouseY > 350 && mouseY < height - 150 && gameOver) {
    // Restart Window
    init();
  } else if (mouseX > 150 && mouseX < width - 300 && mouseY > 350 && mouseY < height - 150 && !start) {
    // Resume Game Window
    start = true;
    showUpgrade = false;
  }else if ( mouseX > 325 && mouseX < width - 150 && mouseY > 150 && mouseY < height - 350 && !start ){
    //upgradeWindow.show();
    console.log("Upgrades click");
    showUpgrade = true;
  }
}


function keyPressed() {

  if (key === " ") {
    let l = new Laser(PlanePosition.x, PlanePosition.y);
    lasers.push(l);
  } else if (keyCode === ESCAPE) {
    console.log("escape start = " + start + " - Coucou les bisounours");
    start = !start;
  }else if(keyCode === ENTER && begin){
    startGame();
  }
}

  function startGame(){
    start = true;
    begin = false;
  }

function init(){
  timeOut = false;
  gameOver = false;
  lasers = [];
  etoiles = [];
  PlanePosition.x = 300;
  PlanePosition.y = 300;
  life = 5;
  score = 0;
  starNb = 7;
  speed = 3;
  speedBool = true;
  showUpgrade = false;

  //bestScore = readCookie("bestScore");
  let scoreCookie = readCookie("bestScore");
    console.log(scoreCookie);
    bestScore = parseInt(scoreCookie);
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return 0;
}
/*
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return 10;
}
*/
