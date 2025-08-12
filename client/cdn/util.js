function lerp(A,B,t){
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function polysIntersect(poly1, poly2) {
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return {point:touch,collide:true,line:{from:poly2[j],to:poly2[(j+1)%poly2.length]}};
            }
        }
    }
     return {collide:false};
}



function
checkColl(player,poly,Iftrue=()=>{},Iffalse=()=>{}){
let side= polysIntersect(player, poly.point(world.camera));
if (side.collide){
let sideA=Math.atan2(side.line.to.y-side.line.from.y,side.line.to.x-side.line.from.x)
let normalA=Math.PI-(sideA+Math.PI/2)
let xx=Math.cos(-normalA)*100
let yy=Math.sin(-normalA)*100
let p1=createVector(side.point.x,side.point.y)
let p2=createVector(side.point.x+xx,side.point.y+yy)
let v3=Vector.sub(p2,p1)
v3.normalize()
world.player.vel.x=v3.x
world.player.vel.y=v3.y
world.player.collide=true
Iftrue()
return true;
}else{
Iffalse()
return false;
}
}


function
MakePolygon(x,y,radius,angle){
let polygon=[]
for(let ang=0;ang<2*Math.PI;ang+=angle){
let xx=x+Math.cos((angle)-ang)*radius
let yy=y+Math.sin((angle)-ang)*radius
polygon.push({x:xx,y:yy})
}
return polygon.reverse();
}


function
distance(x1,y1,x2,y2){
return Math.sqrt((y2-y1)**2+(x2-x1)**2);
}
