function getFirstEndOfPath(path){
  if(path && typeof(path) == "string" && path.length > 0){
    let path2 = path.toLowerCase();
    let index = path2.indexOf("z") + 1
    return path.substring(0,index);
  }else{
    return "";
  }
}

function drawnFormPath(path) {
    let lineType = "l";
    let startBorder = true;
    let hasNigativePath = false;
    let arr_point = [];
    let lastPoint = [];
    let s_num = "";
    for (let i = 0; i < path.length; i++) {
      const char = path[i].toLowerCase();

      // get number
      //skip nonnumber char
      if(s_num != "" && (char == "m" || char == "q" || char == "l" || char == "z")){
          arr_point.push(parseFloat(s_num));
          s_num = "";
      }
      else if (char == "-" && s_num != ""){
        arr_point.push(parseFloat(s_num));
        s_num = char;
      }else if (char ==" " && s_num != ""){
        arr_point.push(parseFloat(s_num));
        s_num = "";
      }else if(char == "." && s_num.includes(".")){
        arr_point.push(parseFloat(s_num));
        s_num = ".";
      }
      else if(char != "m" && char != "q" && char != "l" && char != "z" ){
        s_num += char;
      }

      // draw L
      if(lineType == "l" && arr_point.length == 2){
        vertex(arr_point[0],arr_point[1]);
        lastPoint = [arr_point[0],arr_point[1]];
        arr_point = [];
      }
      // draw Q
      if (lineType == "q" && arr_point.length == 4){
        vertex(lastPoint[0],lastPoint[1]);
        quadraticVertex(arr_point[0], arr_point[1], arr_point[2], arr_point[3]);
        lastPoint = [arr_point[2],arr_point[3]];
        arr_point = [];
      }
      // line type
      if(char == "l" || char == "m"){
        lineType = "l";
      }else if (char == "q"){
        lineType = "q";
      }

      // start drawn and skip M char
      if(char == "m" && i == 0){
        beginShape();
        onL = true;
        startBorder = true;
        continue;
      // Contour
      }else if (char =="m" && i < path.length - 1){
        if(!startBorder){
          endContour();
        }
        beginContour();
        hasNigativePath = true;
        startBorder = false;

          // end drawn and return
      }else if(char =="z" && i == path.length - 1){
        if(hasNigativePath){
          endContour();
        }
        endShape(CLOSE);
        return true;
      }
    }

    return false;
}
function drawnFormPathDebug(path) {
  let lineType = "l";
  let startBorder = true;
  let hasNigativePath = false;
  let arr_point = [];
  let lastPoint = [];
  let s_num = "";
  for (let i = 0; i < path.length; i++) {
    const char = path[i].toLowerCase();

    // get number
    //skip nonnumber char
    if(s_num != "" && (char == "m" || char == "q" || char == "l" || char == "z")){
        arr_point.push(parseFloat(s_num));
        s_num = "";
    }
    else if (char == "-" && s_num != ""){
      arr_point.push(parseFloat(s_num));
      s_num = char;
    }else if (char ==" " && s_num != ""){
      arr_point.push(parseFloat(s_num));
      s_num = "";
    }else if(char == "." && s_num.includes(".")){
      arr_point.push(parseFloat(s_num));
      s_num = ".";
    }
    else if(char != "m" && char != "q" && char != "l" && char != "z" ){
      s_num += char;
    }


    // draw L
    if(lineType == "l" && arr_point.length == 2){
      // vertex(arr_point[0],arr_point[1]);
      lastPoint = [arr_point[0],arr_point[1]];
      console.log(lineType.toUpperCase(),arr_point,arr_point.length);
      arr_point = [];
    }
    // draw Q
    if (lineType == "q" && arr_point.length == 4){
      // vertex(lastPoint[0],lastPoint[1]);
      // quadraticVertex(arr_point[0], arr_point[1], arr_point[2], arr_point[3]);
      lastPoint = [arr_point[2],arr_point[3]];
      console.log(lineType.toUpperCase(),arr_point,arr_point.length);
      arr_point = [];
    }


    // line type
    if(char == "l" || char == "m"){
      lineType = "l";
    }else if (char == "q"){
      lineType = "q";
    }

    // start drawn and skip M char
    if(char == "m" && i == 0){
      // beginShape();
      console.log("beginShape();");
      onL = true;
      startBorder = true;
      continue;
    // Contour
    }else if (char =="m" && i < path.length - 1){
      if(!startBorder){
        // endContour();
        console.log("endContour();");
      }
      // beginContour();
      console.log("beginContour();");
      hasNigativePath = true;
      startBorder = false;

        // end drawn and return
    }else if(char.toLowerCase() =="z" && i == path.length - 1){
      console.log(s_num,i,char);
      if(hasNigativePath){
        // endContour();
        console.log("endContour();");
      }
      // endShape(CLOSE);
      console.log("endShape(CLOSE);");
      return true;
    }
  }

  return false;
}