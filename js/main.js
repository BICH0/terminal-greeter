var lngs = ["es", "en"];//You can add languages modifying mandb.json and adding the lang code here
const prompt_vals = ["@",":~$"]; //Change it as you want the format is the following user<firs_value>session<second_value>
var root_dir = "/usr/share/web-greeter/themes/terminal-greeter"; //Dont modify this unless you know what you are doing
var default_timer=5;//Time in seconds to wait during shutdown/suspend...
//Until JezerM/web-greeter solves the issue with localStorage to make permanent changes you will need to edit the following variable
//Available values:
//Lngs: es,en
//Thms: single,neon
//Ssns: It depends on your system, you can see all the available options in the bottom center container
//Usrs: Same as Ssns, check the bottom left container to see the options
var defaults = {"lngs":"es","thms":"neon","ssns":"","usrs":""};

//DONT MODIFY BELOW THIS---------------------------------------
var thms = [];var ssns = [];var usrs = [];var ascii = [];
const prompt = document.getElementById("prompt");
const stdout = document.getElementById("stdout");
const stdin = document.getElementById("stdin");
const cover = document.getElementById("cover");
const term = document.getElementById("term");
const terminal = document.getElementById("terminal");
const pwr_container = document.getElementById("pwr-container");
const bg_container = document.getElementById("backgrounds");
const thm_container = document.getElementById("thm-container");
const wrapper = document.getElementById("wrapper");
const workspace = document.getElementById("workspace");
const notification = document.getElementById("notification");
var storage = window.localStorage;
var iprompt;var theme;
let oneway = true;
const history = [];
var position = 0;
var settings = {"ascii":"","menu":"visible"};
var menu;
const fetch = new fetcher;
const command = new commands;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function openstorage(){
  let stdef = storage.getItem("defaults");
  if (stdef == null || stdef == ""){
    stdef="lngs:,thms:,ssns:,usrs:";
  }
  console.log("Loaded settings:")
  stdef = stdef.split(",");
  for (let x=0;x<stdef.length;x++){
    let def = stdef[x].split(":");
    if (defaults[def[0]] == ""){
      defaults[def[0]]=def[1];
      console.log("  - "+ def[0] + ": |" +def[1]+"|");
    }else{
      def[1]=defaults[def[0]];
    }
    if (def[1] == ""){
      menu.select(document.querySelector('[data-function="'+def[0].slice(0,-1)+"-"+window[def[0]][0]+'"]'),0);
    }else{
      menu.select(document.querySelector('[data-function="'+def[0].slice(0,-1)+"-"+def[1]+'"]'),window[def[0]].indexOf(defaults[def[0]]));
    }
  }
}
function generate_prompt(std0=""){
  let nodes = prompt.childNodes;
  nodes[0].innerText = defaults["usrs"];
  nodes[2].innerText = defaults["ssns"];
  iprompt="<span class='text-accent'>" + defaults["usrs"] + "</span><span class='text-accent2'>" + prompt_vals[0] + "</span><span class='text-accent'>" + defaults["ssns"] + "</span><span class='text-accent2' style='margin-right:3px;'>" + prompt_vals[1] + "</span>";
}
async function preload(){
  if( typeof lightdm === "undefined"){
    class user_obj{
      constructor (username){
        this.username = username;
      }
    }
    class session_obj{
      constructor (key){
        this.key = key;
      }
    }
    class lightdm_obj{
      constructor(){
        this.in_authentication = false;
        this.is_authenticated = false;
        this.can_shutdown = false;
        this.can_reboot = false;
        this.can_suspend = false;
        this.can_sleep = false;
        this.can_access_brightness = false;
        this.users = [
          new user_obj("b1ch0"),
          new user_obj("cnf")
        ]
        this.sessions = [
          new session_obj("awesome"),
          new session_obj("bspwm"),
          new session_obj("lxqt")
        ]
      }
      cancel_autologin (){

      }
      cancel_authentication (){
        
      }
      authenticate (user){
        this.in_authentication = true;
      }
      respond (password){
        this.in_authentication = false;
      }

    }
    lightdm = new lightdm_obj;
    thms = ["single","neon","multiple"];
  }else{
    console.log("Lightdm exists")
    await fetch.ldm();
  }
  usrs = lightdm.users.map(({username}) => username);
  ssns = lightdm.sessions.map(({key}) => key);
  menu = new menuobj;
  if (lightdm.can_access_brightness && lightdm.brightness != "-Infinity"){
    pwr_container.addEventListener("wheel", async e =>{
      let value = lightdm.brightness;
      pwr_container.style.background = "linear-gradient(0deg, var(--accent) "+ (value)+ "%, var(--container-bg) " + (value) + "%)"
      console.log(pwr_container.style.background)
      if (e.wheelDelta > 0 && value <= 98){
          lightdm.brightness_increase(2);
      }else if(e.wheelDelta > 0 && value >= 2){
          lightdm.brightness_decrease(2);
      }
      await sleep(300);
      pwr_container.style.background = "var(--container-bg)";
    });
  }
  await openstorage();
  if (!thms.includes(defaults["thms"])){
    console.warn("Theme " + defaults["thms"] + " not found, defaulting...");
    menu.select(document.querySelector('[data-function="thm-'+thms[0]+'"]'));
  }
  try{
    await fetch.background("setup");
  }
  catch{
    console.log("Backgrounds are disabled in Browser Mode");
  }
  await fetch.theme();
  ascii = await fetch.ascii;
}
async function load(){
  try{
    theme.start();
  }catch{
    await sleep(1);
    theme.start();
  }
  storage.setItem("multiwin",(new Date).getMilliseconds());
  stdin.focus();
}
function stick_bottom(){
  term.scrollTo(0, term.scrollHeight);
}
window.addEventListener("click", event => {
  if (event.target.classList.contains("clickable")){
    let target = event.target;
    var [fn, val] = target.dataset.function.split("-");
    if (fn == "pwr"){
      menu.power(val);
    }else{
      menu.select(target);
    switch (fn){
      case "lng":
        fetch.lang_selector(val)
        break;
      case "thm":
        fetch.theme(val);
    }
    }
    
  }
})

window.addEventListener("keydown", async event => {
  const key = event.key;
  if (!stdin.disabled){
    if (key == "Enter"){

    history.push(stdin.value);
    position = history.length;
    if (fetch.in_authentication){
      fetch.password(stdin.value);
    }else{
      command.handle(stdin.value)
    }
    stdin.value = "";
    stick_bottom()
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
   }
})

window.onload = preload();
