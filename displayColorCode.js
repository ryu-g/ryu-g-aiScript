'use strict'
testList = [2,3,4,5,6];

var pathItems = app.activeDocument.pathItems;
var pathItemsLength = pathItems.length;
for ( i = 0; i < pathItemsLength; i++){
  if(app.activeDocument.pathItems[i].selected){
    var r = app.activeDocument.pathItems[i].fillColor.red;
    var g = app.activeDocument.pathItems[i].fillColor.green;
    var b = app.activeDocument.pathItems[i].fillColor.blue;
    var x = app.activeDocument.pathItems[i].left
    var y = app.activeDocument.pathItems[i].top
    // alert(x+","+y)
    var rect = activeDocument.pathItems.rectangle(y, x, 100, 30);
    var txtObj = activeDocument.textFrames.areaText(
      rect,
      TextOrientation.HORIZONTAL,
      undefined,
      true
    );
    txtObj.contents = rgbToHex(r,g,b);
  }
}
function rgbToHex(_r,_g,_b){
  var r = ('00'+_r.toString(16).toUpperCase()).slice(-2);
  var g = ('00'+_g.toString(16).toUpperCase()).slice(-2);
  var b = ('00'+_b.toString(16).toUpperCase()).slice(-2);
  return r+g+b;
}