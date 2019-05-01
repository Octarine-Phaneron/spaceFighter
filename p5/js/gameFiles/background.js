
var mountainPos = {
  x: 0,
  y: 0
}

class Mountains{
  static show() {
    stroke(100, 239, 208, 50);
    strokeWeight(2);
    noFill();
    let y;
    for (var repeat = 0; repeat <= 200; repeat += 50) {
      y = repeat +  mountainPos.y;

      beginShape();
      vertex(-50 + mountainPos.x, 10 + y);
      vertex(100 +  mountainPos.x, 100 + y);
      vertex(200 +  mountainPos.x, 20 + y);
      vertex(423 +  mountainPos.x, 175 + y);
      vertex(567 +  mountainPos.x, 82 + y);
      vertex(798 +  mountainPos.x, 150 + y);
      vertex(980 +  mountainPos.x, 20 + y);
      endShape();
    }
    strokeWeight(1);
  }
  static move(){
    // Bouge selon la touche.
    if (keyIsDown(RIGHT_ARROW)) {
      if ( mountainPos.x > -40) {
        mountainPos.x -= 1;
      }

    }
    if (keyIsDown(LEFT_ARROW)) {
      if ( mountainPos.x < 40) {
        mountainPos.x += 1;
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      if ( mountainPos.y < 40) {
        mountainPos.y += 1;
      }
    }
    if (keyIsDown(UP_ARROW)) {
      if ( mountainPos.y > -40) {
        mountainPos.y -= 1;
      }
    }

  }
}
