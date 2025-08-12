class Rect{
constructor(x,y,color,width,height,angle=0,coll=true,name,tranX=-width/2,tranY=-height/2)
{
this.x=x
this.y=y
this.color=color
this.height=height
this.width=width
this.tranX=tranX
this.tranY=tranY
this.angle=angle
this.initialPo={X:x,Y:y}
this.imgPo={x:0,y:0}
this.polygon=[]
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
this.polygon=this.point()
ctx.beginPath();
ctx.fillStyle = this.color;
ctx.setLineDash([0,0]);
ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
for (let i = 1; i < this.polygon.length; i++) {
ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
}
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.restore();

}
}

point()
{
const arrey=[]
const r=Math.hypot(this.width,this.height)/2
const angle=Math.atan2(this.width,this.height)

arrey.push({
x:this.x-Math.sin(Math.PI+this.angle+angle)*r,
y:this.y-Math.cos(Math.PI+this.angle+angle)*r
})
arrey.push({
x:this.x-Math.sin(Math.PI+this.angle-angle)*r,
y:this.y-Math.cos(Math.PI+this.angle-angle)*r
})
arrey.push({
x:this.x-Math.sin(this.angle+angle)*r,
y:this.y-Math.cos(this.angle+angle)*r
})
arrey.push({
x:this.x-Math.sin(this.angle-angle)*r,
y:this.y-Math.cos(this.angle-angle)*r
})
return arrey;
}



}