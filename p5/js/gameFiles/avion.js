
var PlanePosition = function(x, y) {
  this.x = x;
  this.y = y;
  this.red = false;
}

class Plane{

  static show(){
    stroke(255,255,255);
    if(PlanePosition.red){
      stroke(255, 20, 20);
      strokeWeight(2);
    }
    noFill();

    beginShape();
    vertex(PlanePosition.x, PlanePosition.y);
    vertex(PlanePosition.x-130, PlanePosition.y-50);
    vertex(PlanePosition.x-105, PlanePosition.y);
    vertex(PlanePosition.x-130, PlanePosition.y+50);

    endShape(CLOSE);
    line(PlanePosition.x, PlanePosition.y, PlanePosition.x-105, PlanePosition.y);

  }

  static move(){

    if (keyIsDown(RIGHT_ARROW)) {
      PlanePosition.x += 4;
      if (PlanePosition.x > width + 130) {
        PlanePosition.x = 0;
      }
    }
    if (keyIsDown(LEFT_ARROW)) {
      PlanePosition.x -= 4;
      if (PlanePosition.x < 0) {
        PlanePosition.x = width + 130;
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      PlanePosition.y += 4;
      if (PlanePosition.y > height + 50) {
        PlanePosition.y = 0;
      }
    }
    if (keyIsDown(UP_ARROW)) {
      PlanePosition.y -= 4;
      if (PlanePosition.y < 0) {
        PlanePosition.y = height + 50;
      }
    }
  }


  static hit(array){
    for (let e of array) {
      // pour chaque etoile, si elle est dans la zone de l'avion, il devient rouge
      if (e.x > PlanePosition.x - 130 &&
        e.x < PlanePosition.x &&
        e.y > PlanePosition.y - 50 &&
        e.y < PlanePosition.y + 50 &&
        !timeOut && e.transparency != 0) {
          console.log("hit");
          this.clignote();
          timeOut = true;
          setTimeout(function() { timeOut = false;}, 1000);
          life--;
          if (life == 0) {
            gameOver = true;
            array = [];
            if(score > bestScore){
              bestScore = score;
              var date = new Date();
              date.setTime(date.getTime()+(365*24*60*60*1000)); // 365 jours
              var expires = "; expires="+date.toGMTString();
              document.cookie = "bestScore="+score+expires+"; path=/";
              let test = readCookie("bestScore");
              console.log(test);
            }

          }
        }
      }

    }

    static clignote(){
      for(let ms = 200 ; ms <= 900; ms+=200 ){
        setTimeout(function(){ PlanePosition.red = !PlanePosition.red;}, ms);
      }
    }

  }
