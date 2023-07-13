function AngleToRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRandomVelocity(minX,maxX,minY,maxY){
  return{
    x:GetRandomInt(minX,maxX),
    y:GetRandomInt(minY,maxY)
  }
}

function GetXYVelocity(angle,force){
  // tỉ lệ là 1:10
  angle -= 90;
  force /= 10;
  let x = force * Math.sin(angle * (Math.PI / 180));
  let y = (-1) * force * Math.cos(angle * (Math.PI / 180));
  return {
    x:x,
    y:y
  }
}

function GetForceFormXY(x,y){
  x = Math.abs(x);
  y = Math.abs(y);
  return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}