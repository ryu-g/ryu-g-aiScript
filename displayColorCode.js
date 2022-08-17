'use strict'

var pathItems = app.activeDocument.pathItems;
var count = 0
var r = 0;
var g = 0;
var b = 0;
var metaInfo = ''

for ( i = 0; i < pathItems.length; i++){
  var item = app.activeDocument.pathItems[i]
  if(item.selected){
    count++;
    if(item.fillColor.typename === "RGBColor"){
      r = item.fillColor.red;
      g = item.fillColor.green;
      b = item.fillColor.blue;
      metaInfo = '[RGB]'
    }else if(item.fillColor.typename === "SpotColor"){
      var colors = item.fillColor.spot.name.replace(/(.=)/g, '')
      var colorsArray = colors.split(' ')
      var ratio = 100-item.fillColor.tint
      r = Number(colorsArray[0]);
      g = Number(colorsArray[1]);
      b = Number(colorsArray[2]);
      var onePercentOfRed = (256-r) / 100.0
      var onePercentOfGreen = (256-g) / 100.0
      var onePercentOfBlue = (256-b) / 100.0
      r = r + Number(onePercentOfRed * ratio)
      g = g + Number(onePercentOfGreen * ratio)
      b = b + Number(onePercentOfBlue * ratio )
      metaInfo = '[SPOT]'
    }
    var x = item.left+item.width+10;
    var y = item.top;
    var rect = activeDocument.pathItems.rectangle(y, x, 100, 20);
    var txtObj = activeDocument.textFrames.areaText(
      rect,
      TextOrientation.HORIZONTAL,
      undefined,
      true
    );
    txtObj.contents = rgbToHex(r,g,b) + metaInfo
  }
}
if(count == 0){
  alert("select filled path.\n塗りを確認したいパスを選択してください\n\n[hint] it dosent work at no-filled or textObject items.")
}

function rgbToHex(_r,_g,_b){
  var r = ('00'+_r.toString(16).toUpperCase()).slice(-2);
  var g = ('00'+_g.toString(16).toUpperCase()).slice(-2);
  var b = ('00'+_b.toString(16).toUpperCase()).slice(-2);
  return '#' + r+g+b;
}