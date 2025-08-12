class Polygon{
constructor(x, y, initialData = [],strokeWidth = 1, color = "black", fill = "transparent",coll=true,name)
{
this.initialPosition = { X: x, Y: y };
this.imgPo = { x: 0, y: 0 };
this.angle = 0;
this.x = x;
this.y = y;
this.fill = fill;
this.strokeWidth = strokeWidth;
this.color = color;
this.dash = [0, 0];
this.data = initialData;
this.closePath=false;
this.collide=coll
this.name=name
}

validateInitialData(data)
{
if(data){
return true;
}else{
return false;
}
}

draw(ctx, offset, player = false)
{
if(this.validateInitialData(this.data.length)){
if (player){
this.imgPo.x = this.initialPosition.X + offset.x;
this.imgPo.y = this.initialPosition.Y + offset.y;
} else {
this.x = this.initialPosition.X - offset.x;
this.y = this.initialPosition.Y - offset.y;
}

ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.angle);
ctx.beginPath();
ctx.setLineDash(this.dash);
ctx.fillStyle = this.fill;
ctx.strokeStyle = this.color;
ctx.lineWidth = this.strokeWidth;
ctx.moveTo(this.data[0].x,this.data[0].y);
for (let i = 1; i < this.data.length; i++) {
ctx.lineTo(this.data[i].x,this.data[i].y);
}
if(this.closePath){
ctx.closePath();
}
ctx.fill();
ctx.stroke();
ctx.restore();
}
}

point(offSet){
    let array = [];
    for (let i = 0; i < this.data.length; i++) {
        array.push({
            x: this.data[i].x + this.initialPosition.X - offSet.x,
            y: this.data[i].y + this.initialPosition.Y - offSet.y
        });
    }
    return array;
}



}

















/*
class Polygon {
constructor(x, y, initialData = "",strokeWidth = 1, color = "black", fill = "transparent")
{

this.initialPosition = { X: x, Y: y };
this.imgPo = { x: 0, y: 0 };
this.angle = 0;
this.x = x;
this.y = y;
this.fill = fill;
this.strokeWidth = strokeWidth;
this.color = color;
this.dash = [0, 0];
this.data = initialData;
}

validateInitialData(data)
{
const regex = /^\d+ \d+(,\d+ \d+)*$/;
return regex.test(data.trim());
}

draw(ctx, offset, player = false)
{
if (!this.validateInitialData(this.data)) {
}
if (player){
this.imgPo.x = this.initialPosition.X + offset.x;
this.imgPo.y = this.initialPosition.Y + offset.y;
} else {
this.x = this.initialPosition.X - offset.x;
this.y = this.initialPosition.Y - offset.y;
}

const coordinates = this.data.split(",").map(coordString =>
coordString.trim().split(" ").map(Number) // Convert string pairs to numbers
);

ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.angle);
ctx.beginPath();
ctx.setLineDash(this.dash);
ctx.fillStyle = this.fill;
ctx.strokeStyle = this.color;
ctx.lineWidth = this.strokeWidth;
ctx.moveTo(coordinates[0][0], coordinates[0][1]);

for (let i = 1; i < coordinates.length; i++) {
ctx.lineTo(coordinates[i][0], coordinates[i][1]);
}

ctx.closePath();

ctx.fill();
ctx.stroke();
ctx.restore();
}
}


*/


/*
class Polygon {
constructor(x, y, initialData = [[0, 0, 10, 20, 20, 20, 20, 10, 0, 0, 20, 20]], strokeWidth = 1, color = "black", fill = "transparent") {
this.initialData = initialData;
this.data = initialData.slice();  // Make a copy of initial data for modification
this.initialPosition = { X: x, Y: y };
this.imagePosition = { x: 0, y: 0 };
this.angle = 0;
this.x = x;
this.y = y;
this.fill = fill;
this.strokeWidth = strokeWidth;
this.color = color;
this.dash = [0, 0];
this.index = 0;
this.animate = false;
this.repeat=false;
}

draw(ctx, offset, player = false) {
if (player) {
this.imagePosition.x = this.initialPosition.X + offset.x;
this.imagePosition.y = this.initialPosition.Y + offset.y;
} else {
this.x = this.initialPosition.X - offset.x;
this.y = this.initialPosition.Y - offset.y;
}

ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.angle);
ctx.beginPath();
ctx.setLineDash(this.dash);
ctx.fillStyle = this.fill;
ctx.strokeStyle = this.color;
ctx.lineWidth = this.strokeWidth;
ctx.moveTo(this.data[this.index][0], this.data[this.index][1]);
for (let i = 2; i < this.data[this.index].length; i += 2) {
ctx.lineTo(this.data[this.index][i], this.data[this.index][i + 1]);
}
ctx.fill();
ctx.stroke();
ctx.restore();

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
}*/