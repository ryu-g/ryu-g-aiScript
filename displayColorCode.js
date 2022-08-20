'use strict'

var dialog = new Window("dialog"); 
    dialog.text = "windowname"; 
    dialog.preferredSize.width = 400; 
    dialog.preferredSize.height = 200; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var dropdown1_array = [
  "#FFFFFF",
  "FFFFFF",
  "#FFFFFF[RGB]",
  "FFFFFF[RGB]"
]; 

var dropdown1 = dialog.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
    dropdown1.selection = 0; 
    dropdown1.preferredSize.width = 400; 
    dropdown1.preferredSize.height = 100; 

var button1 = dialog.add("button", undefined, undefined, {name: "ok"}); 
    button1.text = "押せ!"; 
    button1.preferredSize.width = 400; 
    button1.preferredSize.height = 100; 
    
var pathItems = app.activeDocument.pathItems;
var count = 0;
var r, g, b = 0;
var metaInfo = '';
var addSharp = false; 
var addMetaInfo = false; 
var selected = dropdown1.selection.text

for ( i = 0; i < pathItems.length; i++){
  var item = app.activeDocument.pathItems[i]
  if(item.selected){
    count++;
  }
}
if(count > 0){
  dialog.show();
  dialog.center();
}


if(selected.indexOf('#') != -1){
  addSharp = true;
}
if(selected.indexOf('[') != -1){
  addMetaInfo = true;
}

for ( i = 0; i < pathItems.length; i++){
  var item = app.activeDocument.pathItems[i]
  if(item.selected){
    count++;
    if(item.fillColor.typename === "RGBColor"){
      r = item.fillColor.red;
      g = item.fillColor.green;
      b = item.fillColor.blue;
      if(addMetaInfo){metaInfo = '[RGB]\n'}
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
      if(addMetaInfo){metaInfo = '[SPOT ' + item.fillColor.tint + "%]\n"}
    }
    var x = item.left+item.width+10;
    var y = item.top;
    var rect = activeDocument.pathItems.rectangle(y, x, 75, 40);
    var txtObj = activeDocument.textFrames.areaText(
      rect,
      TextOrientation.HORIZONTAL,
      undefined,
      true
    );
    txtObj.contents = metaInfo + rgbToHex(r,g,b,addSharp)
  }
}
if(count == 0){
  alert("select filled path.\n塗りを確認したいパスを選択してください\n\n[hint] it dosent work at no-filled or textObject items.")
}

function rgbToHex(__r, __g, __b, __sharp){
  var _r = ('00'+__r.toString(16).toUpperCase()).slice(-2);
  var _g = ('00'+__g.toString(16).toUpperCase()).slice(-2);
  var _b = ('00'+__b.toString(16).toUpperCase()).slice(-2);
  var rgb = _r+_g+_b
  if(__sharp){
    return '#' + rgb;
  }
  return rgb;
}