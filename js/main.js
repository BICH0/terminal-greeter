var lngs = ["es", "en"];
// var pwrs = ["PowerOff", "Sleep", "Hibernate", "Reboot"];
var ssns = [];var usrs = [];var ascii = [];var thms = [];
const prompt_vals = ["@",":~$"]
//---------------------------------------
const prompt = document.getElementById("prompt");
const stdout = document.getElementById("stdout");
const stdin = document.getElementById("stdin");
const cover = document.getElementById("cover");
const storage = window.localStorage;
var iprompt;
const history = [];
var position = 0;
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
  console.log(nodes)
  iprompt="<span class='text-accent'>" + defaults["usrs"] + "</span><span class='text-accent2'>" + prompt_vals[0] + "<span class='text-accent1'>" + defaults["ssns"] + "</span><span class='text-accent2' style='margin-right:3px;'>" + prompt_vals[1] + "</span>";
  stdout.innerHTML += "<p>" + std0 + "</p>"
}
async function preload(){
  if( typeof lightdm !== "undefined"){
    fetch.ldm();
  }else{
    ssns = ["awesome", "bspwm","lxqt"];
    usrs = ["bich0", "cnf"];
    thms = ["single", "multiple"];
  }
  menu = new menuobj();
  await openstorage();
  fetch.theme(defaults["thms"]);
  ascii = await fetch.ascii;
  lang_content = await fetch.lang_selector();
}
async function load(){
  fetch.colors(false);
  try{
    theme.start();
  }catch{
    await sleep(1);
    theme.start();
  }
}
function height_check(lines) {
  stdout.scrollTop = stdout.scrollHeight;
  if (font_size.slice(0,-2) * 1 + stdout.offsetHeight - 10 >= win_height){
    stdout.style.height = win_height - 5 + "px";
  }
};
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

window.addEventListener("keydown", async event => {
  const key = event.key;
  if (key == "Enter"){
    history.push(stdin.value);
    position = history.length;
    if (fetch.in_authentication){
      console.log("post");
      fetch.password(stdin.value);
    }else{
      command.handle(stdin.value)
    }
    stdin.value = "";
  }
  else if (key == "ArrowUp") {
    event.preventDefault();
    if (position - 1 >= 0){
      position = position - 1;
      stdin.value=history[position];
    };
  }
  else if (key == "ArrowDown") {
    if (position + 1 < history.length){
      position = position + 1
      stdin.value=history[position];
    }
    else if (position + 1 == history.length){
      position = position + 1;
      stdin.value="";
    }
  };
})

window.onload = preload();
