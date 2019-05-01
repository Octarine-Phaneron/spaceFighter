
class Etoile{

  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.transparency = 255;
    this.hitCount = 0;
  }

  show(){
    noStroke();
    let color1 = map(this.x, 0, width, 0, 255);
    let color2 = map(this.x, 0, width, 255, 0);
    fill(color2, 0, color1, this.transparency);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move(){
    this.x-= speed;
    if (this.x < this.size*-1) {
      this.x = width + 50;
    }
  }

  kill(){
    for (let l = 0; l < lasers.length; l++) {

      if (lasers[l].x + 10 >= this.x - (this.size / 2) && lasers[l].x <= this.x + (this.size / 2) &&
      lasers[l].y >= this.y - (this.size / 2) && lasers[l].y <= this.y + (this.size / 2)) {
        etoiles.splice(etoiles.indexOf(this), 1);
        lasers.splice(l, 1);
        score += 100;
        speedBool = true;
        console.log("kill");
      }
    }
  }

}

// pas d'extends, refaire une classe, car peut pas appeler constructeur parent en boucle mais doit

class Boss{

  constructor(){
    this.bEtoiles = [];
    this.toggleMove = true;
    this.x = width+250;
    this.y = height/2;
    this.radius = 200;
    this.angle = TWO_PI/8;
    this.txt = true;

    this.showText();

    let etoileCentrale = new Etoile(this.x, this.y, 58);
    this.bEtoiles.push(etoileCentrale);
    //création 8 etoiles en cercle.autour de l'étoile centrale.
    for(let a = 0; a < TWO_PI; a+= this.angle){
      let etoile = new Etoile(this.x + cos(a) * this.radius, this.y +sin(a) * this.radius, 40);
      this.bEtoiles.push(etoile);
    }
  }

  show(){
    for(let e of this.bEtoiles){
      e.show();
    }
    if(this.txt){
      textAlign(CENTER);
      fill(255, 255, 0);
      textSize(33);
      text("IT'S BOSS TIME", width/2, height/8);
    }
  }

  showText(){
    setTimeout(function(){ this.txt = false;}, 5000);
  }


  move(){
    if(this.x > -180){
      this.x-=2.2;
    }else{
      this.x = width+180;
    }
    if(this.radius >= 200){
      this.toggleMove = true;
    }else if(this.radius <= 100){
      this.toggleMove = false;
    }

    if( this.toggleMove ){
      this.radius-=1;

      for(let e of this.bEtoiles){
        e.size-=0.2;
      }
    }else{
      this.radius+=1;
      for(let e of this.bEtoiles){
        e.size+=0.2;
      }
    }
    let a = 0;
    //let a = 0; a < TWO_PI; a+= this.angle
    for( let e = 1; e < this.bEtoiles.length; e++){
      a += this.angle;
      this.bEtoiles[e].x = (this.x + cos(a) * (this.radius)) -3;
      this.bEtoiles[e].y = this.y + sin(a) * (this.radius);
    }
    this.bEtoiles[0].x = this.x;
    Plane.hit(this.bEtoiles);
  }

  kill(){

    for (let l of lasers) {
      for( let e of this.bEtoiles){
        if (dist(l.x, l.y, e.x, e.y) < e.size/2 && e.transparency == 255){
          e.hitCount+=1;
          lasers.splice(1, 1);
          if(e.hitCount == 3){ // il faut 3 coups pour tuer une etoiles boss.
            score+=200;
            e.transparency = 0;
          }
        }
      }
    }
    bossTime = false;
    // On vérifie qu'il reste des étoiles visibles. S'il y en a le Boss continue.
    for(let e of this.bEtoiles){
      if(e.transparency == 255){
        bossTime = true;
      }
    }
    // S'il n'y en a pas on supprime toutes les étoiles invisibles.
    if(bossTime == false){
      this.bEtoiles = [];
      life++; // On gagne 1 vie.
    }
  }

}

/*
// p5js Regular shapes
function polygon(x, y, radius, npoints) {
let angle = TWO_PI / npoints;
beginShape();
for (let a = 0; a < TWO_PI; a += angle) {
let sx = x + cos(a) * radius;
let sy = y + sin(a) * radius;
vertex(sx, sy);
}
endShape(CLOSE);
}
*/
