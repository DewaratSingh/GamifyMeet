class ImgObj{
constructor(x,y,src,width,height,angle=0,coll=true,name,tranX=-width/2,tranY=-height/2)
{
this.x=x
this.y=y
this.Img=new Image();
this.src=src
this.height=height
this.width=width
this.data=[src]
this.Img.src=src
this.Img.height=height
this.Img.width=width
this.tranX=tranX
this.tranY=tranY
this.initialPo={X:x,Y:y}
this.imgPo={x:x,y:y}
this.index = 0;
this.animate = false;
this.repeat=false;
this.angle=angle
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

this.tranX=-this.Img.width/2
this.tranY=-this.Img.height/2
this.height=this.Img.height
this.width=this.Img.width


this.Img.src=this.data[this.index]
if(this.x>offSet.range.xFrom&&this.x<offSet.range.xTo&&this.y>offSet.range.yFrom&&this.y<offSet.range.yTo){
ctx.save()
ctx.translate(this.x,this.y)
ctx.rotate(this.angle)
ctx.beginPath()
ctx.drawImage(this.Img,this.tranX,this.tranY,this.Img.width,this.Img.height)
ctx.restore()
}
if (this.animate) {
this.index++;
if (this.index >= this.data.length) {
if(this.repeat){
this.index = 0;
}else{
this.index = 0;
this.animate = false;
}
}
}
}

animation(frames,time,repeat=false) {
this.repeat=repeat
if (frames.length === 0 || frames.length > 60) {
console.error("Invalid frames array length. Should be between 1 and 60.");
return;
}

const step = 60*time / frames.length;
const animatedData = [];

frames.forEach(frame => {
for (let i = 0; i < step; i++) {
animatedData.push(frame);
}
});

this.data = animatedData;
this.animate = true;
this.index = 0;
}


point()
{
const arrey=[]
const r=Math.hypot(this.width/2,this.height/2)
const angle=Math.atan2(this.width,this.height)

arrey.push({
x:this.x-Math.sin(-angle-this.angle)*r,
y:this.y-Math.cos(-angle-this.angle)*r
})
arrey.push({
x:this.x-Math.sin(Math.PI+angle-this.angle)*r,
y:this.y-Math.cos(Math.PI+angle-this.angle)*r
})
arrey.push({
x:this.x-Math.sin(Math.PI-angle-this.angle)*r,
y:this.y-Math.cos(Math.PI-angle-this.angle)*r
})

arrey.push({
x:this.x-Math.sin(angle-this.angle)*r,
y:this.y-Math.cos(angle-this.angle)*r
})
return arrey;
}


}

export default ImgObj