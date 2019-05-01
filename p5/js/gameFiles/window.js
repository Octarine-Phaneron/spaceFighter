
class Window{
  static init(){
    stroke(255, 255, 0);
    fill(50);
    rect(100, 100, width - 200, height - 200);
    textSize(35);
    textAlign(CENTER, CENTER);
  }
}


class GameOverWindow extends Window{

  static show(){
    super.init();
    rect(width/6, height/4, width/3.273, height/6);// Score
    rect(width/1.895, height/4, width/3.273, height/6);//Best Score
    rect(width/6, height/2, width - 300, height - 450);
    fill(255, 255, 0);
    text("GAME OVER", width / 2, height / 1.68);
    textSize(27);
    text("Score : ", width/3.1, height/3.3);
    text(score, width/3.1, height/2.67);

    text("Best Score :", width/1.465, height/3.3);
    text(bestScore, width/1.465, height/2.67);

    textSize(15);
    text("Restart ?", width / 2, height / 1.45);
  }
}

class startGameWindow extends Window{
  static show(){
    super.init();
    rect(width/6, height/4, width/3.273, height/6);// start Game
    rect(width/1.895, height/4, width/3.273, height/6);//Best Score
    rect(width/6, height/2, width - 300, height - 450);
    // rect(150, 250, width - 300, height - 500);
    fill(255, 255, 0);
    text("Start Game !", width/3.1, height/3);
    textSize(27);
    text("Best Score :", width/1.465, height/3.3);
    text(bestScore, width/1.465, height/2.67);
    // controls:
    // TODO: Voir comment on associe 2 formes et les recopie avec un translate pour les fleches...
    noStroke();
    rect(width/4, height/1.67, 21, 21);//gauche
    rect(width/4+26, height/1.67, 21, 21);//bas
    rect(width/4+52, height/1.67, 21, 21);//droite
    rect(width/4+26, height/1.67-26, 21, 21);//haut

    rect(width/1.57, height/1.67, 100, 21);// espace

    fill(0);
    triangle(width/4+36, height/1.67-23, width/4+44, height/1.67-8, width/4+29, height/1.67-8);//haut
    triangle(width/4+3, height/1.67+11, width/4+18, height/1.67+3, width/4+18, height/1.67+18);//gauche
    triangle(width/4+29, height/1.67+3, width/4+44, height/1.67+3, width/4+37, height/1.67+18);//bas
    triangle(width/4+55, height/1.67+3, width/4+70, height/1.67+11, width/4+55, height/1.67+18);//droite
    rect(width/1.483, height/1.64, 30, 7);

    textSize(20);
    textAlign(CENTER);
    fill(255, 255, 0);
    noStroke();
    text("Bouger", width/3.44, height/1.46);
    text("Tirer", width/1.444, height/1.46);

  }
}

class pauseWindow extends Window{
  static show(){
    super.init();
    rect(width/6, height/4, width/3.273, height/6);// Score
    rect(width/1.895, height/4, width/3.273, height/6);//Best Score
    rect(width/6, height/2, width - 300, height - 450);
    fill(255, 255, 0);
    noStroke();
    text("Resume Game", width / 2, height / 1.6);
    text("Buy Upgrades", width/1.465, height/3);
    textSize(27);
    text("Score :", width/3.1, height/3.3);
    text(score, width/3.1, height/2.67)
  }
}

class upgradeWindow extends Window{
  static show(){
    super.init();
    for(let i = width/6; i <= width/1.334; i+=width/5.7 ){
      push();
      translate(i, height/4);
      rect(0, 0, 125, 125); // peut être fait en une ligne avec param 1 = width
      pop();
    }
    translate(0,0); // remise a zero. Mieux 1 forme push/pop ou 4 rect ?
    rect(width/6, height/1.846, width/1.5, height/4.8);
    fill(255, 255, 0);
    strokeWeight(7);
    line(width/4.337, height/2.89, width/4.337+10, height/2.89);
    line(width/2.45, height/3.1, width/2.45+10, height/3.1);
    line(width/2.45, height/2.7, width/2.45+10, height/2.7);
    strokeWeight(1); // WTF
    noStroke();
    text("Update à venir", width/2, height/1.55);
    textSize(27);
  }
}
