class Circle{
constructor(x,y,r=20,color="red",coll=true,name)
{
this.x=x
this.y=y
this.initialPo={X:x,Y:y}
this.imgPo={X:x,Y:y}
this.r=r
this.color=color
this.collide=coll
this.name=name
}

draw(ctx,offSet,player=false)
{
if(player){
this.imgPo.x=this.initialPo.X+offSet.x;
this.imgPo.y=this.initialPo.Y+offSet.y;
}else{
this.x=this.initialPo.X-offSet.x;
this.y=this.initialPo.Y-offSet.y;
}

if(this.x>offSet.range.xFrom&&this.x<offSet.range.xTo&&this.y>offSet.range.yFrom&&this.y<offSet.range.yTo){
ctx.beginPath();
ctx.fillStyle=this.color
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()
}
}

point(){
let polygon=[]
for(let ang=0;ang<2*Math.PI;ang+=Math.PI/180){
let x=this.x+Math.cos(ang)*this.r
let y=this.y+Math.sin(ang)*this.r
polygon.push({x:x,y:y})
}
return polygon;
}

}

export default Circle