class RoadSegment{
constructor(width,color,dash=[0,0])
{
this.width=width
this.color=color
this.dash=dash

}

draw(ctx,road,point,offSet)
{

ctx.beginPath()
ctx.setLineDash(this.dash);
ctx.lineWidth=this.width
ctx.strokeStyle=this.color
for(let i=0;i<road.length;i++){
if(
point[road[i].from].x>offSet.range.xFrom&&point[road[i].from].x<offSet.range.xTo&&point[road[i].from].y>offSet.range.yFrom&&point[road[i].from].y<offSet.range.yTo&&
point[road[i].to].x>offSet.range.xFrom&&point[road[i].to].x<offSet.range.xTo&&point[road[i].to].y>offSet.range.yFrom&&point[road[i].to].y<offSet.range.yTo
){
ctx.moveTo(point[road[i].from].x,point[road[i].from].y)
ctx.lineTo(point[road[i].to].x,point[road[i].to].y)
}
}
ctx.stroke()
}


}