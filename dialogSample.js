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

dialog.show();
dialog.center();