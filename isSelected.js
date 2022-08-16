if(typeof app.activeDocument.pathItems[0] === "undefined"){
  alert("パスが選択されていません");
}else if(app.activeDocument.pathItems[0].selected){
  alert("パスが選択されています");
}else{
  alert("パスが選択されていません");
}