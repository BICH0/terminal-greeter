var lngs = ["es", "en"];
// var pwrs = ["PowerOff", "Sleep", "Hibernate", "Reboot"];
var ssns = [];var usrs = [];var ascii = [];var thms = [];
//---------------------------------------
const prompt = document.getElementById("prompt");
const stdout = document.getElementById("stdout");
const storage = window.localStorage;
var defaults = {"lngs":"","thms":"","ssns":"","usrs":""};
var settings = {"ascii":"","menu":"visible"};
var menu;
const fetch = new fetcher();
const command = new commands();
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function openstorage(){
  for (let item in defaults){
    let stored_item;
    stored_item = storage.getItem(item);
    if ( stored_item != null){
      defaults[item] = stored_item;
      menu.select(document.querySelector('[data-function="'+item.slice(0,-1)+"-"+stored_item+'"]'),window[item].indexOf(defaults[item]))
    }
    else{
      // command.warn()//errores 
      console.log(defaults)
      console.log(document.querySelector('[data-function="'+item.slice(0,-1)+"-"+window[item][0]+'"]'))
      menu.select(document.querySelector('[data-function="'+item.slice(0,-1)+"-"+window[item][0]+'"]'),0)
    }
  }
  for (let item in settings){
    if (storage.getItem(item) != null){
      settings[item] = storage.getItem(item);
    }
  }
}
function generate_prompt(std0=""){
  let nodes = prompt.childNodes;
  nodes[0].innerText = defaults["usrs"];
  nodes[2].innerText = defaults["ssns"];
  stdout.innerHTML += "<p>" + std0 + "</p>"
}
async function preload(){
  try{
    fetch.ldm();
  }
  catch{
    ssns = ["awesome", "bspwm","lxqt"];
    usrs = ["bich0", "cnf"];
  }
  try{
    asfaf
  }catch{
    thms = ["single", "multiple"];
  }
  menu = new menuobj();
  await openstorage();
  fetch.theme(defaults["thms"]);
  ascii = await fetch.ascii;
  lang_content = await fetch.lang_selector();
}
function load(){
  fetch.colors(false);
}
window.addEventListener("click", event => {
  if (event.target.classList.contains("clickable")){
    console.log(event.target)
    let target = event.target;
    let index = Array.prototype.indexOf.call(target.parentNode.childNodes, target);
    menu.select(target, index);
    var [fn, val] = target.dataset.function.split("-");
    switch (fn){
      case "lng":
        fetch.lang_selector(val)
        break;
      case "thm":
        fetch.theme(val);
      default:
        defaults[fn+"s"] = val;
    }
  }
})

window.addEventListener("keypress", async event => {
  let key = event.key;
  if (key == "Enter"){
    if (fetch.in_authentication){
      console.log("post");
      fetch.password(stdin.value);
    }else{
      command.handle(stdin.value)
    }
    stdin.value = "";
  }
})

window.onload = preload();
