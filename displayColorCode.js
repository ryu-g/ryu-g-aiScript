'use strict'

var dialog = new Window("dialog"); 
    dialog.text = "display color info"; 
    dialog.preferredSize.width = 400; 
    dialog.preferredSize.height = 200; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var dropdown1_array = [
  "#FFFFFF",
  "FFFFFF",
  "[RGB or SPOT] #FFFFFF",
  "[RGB or SPOT] FFFFFF",
  "CMYK"
]; 

var statictext = dialog.add("statictext",undefined,"select colorInfo view type\n" + "表示したい色情報の見た目を選択してください",{multiline:true}); 
    statictext.preferredSize.width = 400; 
    statictext.preferredSize.height = 50; 

var dropdown1 = dialog.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
    dropdown1.selection = 0; 
    dropdown1.preferredSize.width = 400; 
    dropdown1.preferredSize.height = 50; 

var button1 = dialog.add("button", undefined, undefined, {name: "ok"}); 
    button1.text = "P U S H"; 
    button1.preferredSize.width = 400; 
    button1.preferredSize.height = 100; 
    
var pathItems = app.activeDocument.pathItems;
var count = 0;

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

var r, g, b, c, m, y, k = 0;
var metaInfo = '';
var addSharp = false; 
var addMetaInfo = false; 
var dropDownSelectedItem = dropdown1.selection.text
var colorMode = ''

if(dropDownSelectedItem.indexOf('#') != -1){
  addSharp = true;
}
if(dropDownSelectedItem.indexOf('[') != -1){
  addMetaInfo = true;
}

for ( i = 0; i < pathItems.length; i++){
  var item = app.activeDocument.pathItems[i]
  if(item.selected){
    count++;
    if(item.fillColor.typename === "RGBColor"){
      colorMode = 'RGB'
      r = item.fillColor.red;
      g = item.fillColor.green;
      b = item.fillColor.blue;
      if(addMetaInfo){metaInfo = '['+colorMode+']\n';}
    }else if(item.fillColor.typename === "CMYKColor"){
      colorMode = 'CMYK'
      c = item.fillColor.cyan;
      m = item.fillColor.magenta;
      y = item.fillColor.yellow;
      k = item.fillColor.black;
      metaInfo = 'C' + c + ' M' + m + ' Y' + y + ' K'+ k
    }else if(item.fillColor.typename === "SpotColor"){
      colorMode = 'SPOT'
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
      if(addMetaInfo){metaInfo = '[' + colorMode +' '+ item.fillColor.tint + "%]\n"}
    }
    var x = item.left+item.width+10;
    var y = item.top;
    var txtAreawidth = 75; // default size for RGB mode 
    if(colorMode === "CMYK") {
      txtAreawidth = 120;
    }else{
      txtAreawidth = 75;
    }
    var rect = activeDocument.pathItems.rectangle(y, x, txtAreawidth, 40);
    var txtObj = activeDocument.textFrames.areaText(
      rect,
      TextOrientation.HORIZONTAL,
      undefined,
      true
    );
    if(colorMode != "CMYK"){
      txtObj.contents = metaInfo + rgbToHex(r,g,b,addSharp)
    }else{
      txtObj.contents = metaInfo
    }
  }
}

if(count == 0){
  alert("select filled path.\n塗りを確認したいパスを先に選択してください。\n塗りが無いパス･テキストオブジェクト･グラデーションの塗りには正常に動作しません。\n\n[hint] it dosent work at no-filled path, textObject items, and gradient filled items.")
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
