class Laser{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){

    strokeWeight(7);
    stroke(255, 255, 0);
    this.show();
    strokeWeight(1);
  }

  show(){
    if (this.x <= width) {
      line(this.x, this.y, this.x + 10, this.y);
      this.move();
    }
  }

  move(){
    if(this.x >= width){
      lasers.splice(lasers.indexOf(this), 1)
    }else{
      this.x += 4;
    }
  }

}
