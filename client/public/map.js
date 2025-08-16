
let array= [{"x":528.8333053588867,"y":784.166633605957,"initialPo":{"X":186.00000762939453,"Y":252.45831298828125},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":400.9166488647461,"y":783.5833053588867,"initialPo":{"X":58.083351135253906,"Y":251.87498474121094},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":271.2499771118164,"y":781.666633605957,"initialPo":{"X":-71.58332061767578,"Y":249.95831298828125},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":142.62496948242188,"y":791.0833053588867,"initialPo":{"X":-200.2083282470703,"Y":259.37498474121094},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":149.41664123535156,"y":662.2916412353516,"initialPo":{"X":-193.41665649414062,"Y":130.58332061767578},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":159.70831298828125,"y":540.4999847412109,"initialPo":{"X":-183.12498474121094,"Y":8.791664123535156},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":172.70831298828125,"y":413.8333282470703,"initialPo":{"X":-170.12498474121094,"Y":-117.87499237060547},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":303.62498474121094,"y":416.1666564941406,"initialPo":{"X":-39.20831298828125,"Y":-115.54166412353516},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":432.0416564941406,"y":419.9583282470703,"initialPo":{"X":89.20835876464844,"Y":-111.74999237060547},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":562.1666564941406,"y":419,"initialPo":{"X":219.33335876464844,"Y":-112.70832061767578},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""},{"x":545.7499847412109,"y":656.7500152587891,"initialPo":{"X":202.91668701171875,"Y":125.04169464111328},"r":"64.61635919615429","color":"rgba(15,165,254,1)","collide":false,"name":""}];
let roadObj = [[],[],[],100];

let obj=[]

for(let i=0;i<array.length;i++){
let ele=array[i]
if(ele.r){
obj.push(new Circle(ele.x,ele.y,ele.r,ele.color,ele.collide,ele.name))
}else if(ele.data && !ele.src){
obj.push(new Polygon(ele.x,ele.y,ele.data))
}else if(ele.src){

obj.push(new ImgObj(ele.x,ele.y,'./'+ele.src,ele.width,ele.height))
}else{
obj.push(new Rect(ele.x,ele.y,ele.color,ele.width,ele.height))
}
}


let road
if(roadObj!=[]){
road=[]
road[0]=roadObj[0].map(obj=>new Circle(obj.x,obj.y,obj.r,obj.color))
road[1]=roadObj[1]
road[2]=roadObj[2].map(obj=>new Circle(obj.x,obj.y,obj.r,obj.color))
road[3]=roadObj[3]
seg=new RoadSegment(road[3],"grey")
divider=new RoadSegment(2,"white",[20,20])
}