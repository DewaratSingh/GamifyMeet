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
ctx.moveTo(point[road[i].from].x,point[road[i].from].y)
ctx.lineTo(point[road[i].to].x,point[road[i].to].y)
}
ctx.stroke()

}

}