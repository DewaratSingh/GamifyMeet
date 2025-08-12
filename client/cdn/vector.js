class Vector{
constructor(x, y){
this.x = x;
this.y = y;
}

add(v) {
this.x = this.x + v.x;
this.y = this.y + v.y;
}

sub(v) {
this.x = this.x - v.x;
this.y = this.y - v.y;
}

mult(n) {
this.x = this.x * n;
this.y = this.y * n;
}

div(n) {
this.x = this.x / n;
this.y = this.y / n;
}


mag() {
return Math.sqrt(this.x * this.x + this.y * this.y);
}

normalize() {
let m = this.mag();
this.div(m);
}

limit(max) {
if (this.mag() > max) {
this.normalize();
this.mult(max);
}
}

static add(v1, v2) {
let v3 = createVector(v1.x + v2.x, v1.y + v2.y);
return v3;
}

static sub(v1, v2) {
let v3 = createVector(v1.x - v2.x, v1.y - v2.y);
return v3;
}

static mult(v1, n) {
let v3 = createVector(v1.x *n, v1.y *n);
return v3;
}

static div(v1, n) {
let v3 = createVector(v1.x/n, v1.y/n);
return v3;
}

static angle(v1,v2){
return Math.atan2(v1.y-v2.y,v1.x-v2.x);
}

angle(v1){
return Math.atan2(this.y-v1.y,this.x-v1.x);
}

copy(){
let vec=createVector(this.x,this.y)
return vec;
}

setMag(c){
return createVector(this.x*c/this.mag(),this.y*c/this.mag());
}

applyForce(force) {
let f = Vector.div(force, this.mass);
this.acceleration.add(f);
}


checkEdges() {
    if (this.position.x > canvas.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = canvas.width;
    }

    if (this.position.y > canvas.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = canvas.height;
    }
  }

}



function
createVector(x,y)
{
return new Vector(x,y);
}