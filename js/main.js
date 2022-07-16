const background = document.getElementById('background');
const stdout = document.getElementById('stdout');
const prompt = document.getElementById('prompt');
const cli_line = document.getElementById('cli');
const main_window = document.getElementsByClassName('true_window')[0];
const stdout_lineheight = parseInt(getComputedStyle(stdout).lineHeight.slice(0,-2));
const history = [];
var startup = "true";
var default_user;
var default_session;
var default_layout = 'us';
var position = 0;
var login_data = ['False'];
const storage = window.localStorage;

function sleep(ms) {
  if (startup == "quick"){
    return;
  }
  return new Promise(resolve => setTimeout(resolve, ms));
};

function openstorage(){
  if (storage.getItem('session') != null){
    default_session = storage.getItem('session');
  }
  else {
    default_session = lightdm.sessions[0].key;
  };
  if (storage.getItem('user') != null){
    default_user = storage.getItem('user');
  }
  else{
    default_user = lightdm.users[0].name;
  };
};

function generate_prompt(location, content, regen){
  if (location == null){
    location = prompt;
  };
  if (regen == "regenerate"){
    prompt.innerHTML = '';
  };
  var fields = ['username','delimiter','hostname','dollar','content'];
  for (i = 0; i < fields.length; i++){
    var span = document.createElement("span");
    switch (fields[i]) {
      case 'username':
        span.textContent=default_user;
        span.classList="color1";
        break;
      case 'delimiter':
        span.textContent="@";
        span.classList="color2";
        break;
      case 'hostname':
        span.textContent= os + "-" + default_session;
        span.classList="color1";
        break;
      case 'dollar':
        span.textContent="$";
        span.classList="color2";
        break;
      case 'content':
      span.textContent=content;
        span.classList="color3";
        break;
    };
    location.appendChild(span);
  };
  cli.style.width = getComputedStyle(main_window).width.slice(0,-2) - getComputedStyle(prompt).width.slice(0,-2) - 20 + 'px';
};

async function fetch_theme(){
  let script = document.createElement("script");
  script.src = "themes/" + theme + "/theme.js";
  script.type = "text/javascript";
  document.head.appendChild(script);
  let scripts = document.getElementsByTagName('script');
  let links = document.getElementsByTagName('link');
  for (let i=0; i<links.length; i++)
    if (links[i].href.match("themes/.*/(theme|palette).css")){
      let href = links[i].href.split('/').reverse()
      href[1] = theme;
      links[i].href= href.reverse().join("/");
    };
};

async function fetch_ascii(){
  switch (ascii) {
    case "arch":
      var ascii_u = `¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-\`½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬.o+\`½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`ooo/½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`+oooo:½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`+oooooo:½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-+oooooo+:½¬¬¬¬¬¬¬¬¬¬¬¬¬\`/:-:++oooo+:½¬¬¬¬¬¬¬¬¬¬¬¬\`/++++/+++++++:½¬¬¬¬¬¬¬¬¬¬¬\`/++++++++++++++:½¬¬¬¬¬¬¬¬¬¬\`/+++ooooooooooooo/\`½¬¬¬¬¬¬¬¬¬./ooosssso++osssssso+\`½¬¬¬¬¬¬¬¬.oossssso-\`\`\`\`/ossssss+\`½¬¬¬¬¬¬¬-osssssso.¬¬¬¬¬¬:ssssssso.½¬¬¬¬¬¬:osssssss/¬¬¬¬¬¬¬¬osssso+++.½¬¬¬¬¬/ossssssss/¬¬¬¬¬¬¬¬+ssssooo/-½¬¬¬\`/ossssso+/:-¬¬¬¬¬¬¬¬-:/+osssso+-½¬¬\`+sso+:-\`¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`.-/+oso:½¬\`++:.¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`-/+/½¬.\`¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`½¬`;
    //DEBIAN const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //GARUDA const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //FEDORA const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //SUSE const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //SLACKWARE const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //KALI const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //CENTOS const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //TAILS const ascii = ``.replaceAll("¬","\u00a0").split("½");
    //VOID const ascii = ``.replaceAll("¬","\u00a0").split("½");
      break;
    case "mx":
      var ascii_u = `MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMMMMMMMMM½MMMMMMMMMMNs..yMMMMMMMMMMMMMm:¬+NMMMMMMM½MMMMMMMMMN+¬¬¬¬:mMMMMMMMMMNo\`¬-dMMMMMMMM½MMMMMMMMMMMs.¬¬¬\`oNMMMMMMh-¬\`sNMMMMMMMMM½MMMMMMMMMMMMN/¬¬¬¬-hMMMN+¬¬:dMMMMMMMMMMM½MMMMMMMMMMMMMMh-¬¬¬¬+ms.¬.sMMMMMMMMMMMMM½MMMMMMMMMMMMMMMN+\`¬¬¬\`¬¬+NMMMMMMMMMMMMMM½MMMMMMMMMMMMMMNMMd:¬¬¬¬.dMMMMMMMMMMMMMMM½MMMMMMMMMMMMm/-hMd-¬¬¬¬¬\`sNMMMMMMMMMMMMM½MMMMMMMMMMNo\`¬¬¬-\`¬:h/¬¬¬¬-dMMMMMMMMMMMM½MMMMMMMMMd:¬¬¬¬¬¬¬/NMMh-¬¬¬\`+NMMMMMMMMMM½MMMMMMMNo\`¬¬¬¬¬¬¬¬¬:mMMN+\`¬¬¬\`-hMMMMMMMM½MMMMMMh.¬¬¬¬¬¬¬¬¬¬¬¬\`oNMMd:¬¬¬¬\`/mMMMMMM½MMMMm/¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-hMd-¬¬¬¬¬¬\`sNMMMM½MMNs\`¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-¬¬¬¬¬¬¬¬¬¬:dMMM½Mm:¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`oMM½MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM½`;
      break;
    case "endeavour":
      var ascii_u = `¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./o.½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./sssso-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:osssssss+-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:+sssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬¬¬\´-/ossssssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬\´-/+sssssssssssssssso+:\´½¬¬¬¬¬¬¬¬¬\´-:/+sssssssssssssssssso+/.½¬¬¬¬¬¬¬\´.://osssssssssssssssssssso++-½¬¬¬¬¬¬.://+ssssssssssssssssssssssso++:½¬¬¬¬.:///ossssssssssssssssssssssssso++:½¬¬\´:////ssssssssssssssssssssssssssso+++.½\´-////+ssssssssssssssssssssssssssso++++-½¬\´..-+oosssssssssssssssssssssssso+++++/\´½¬¬¬.++++++++++++++++++++++++++++++/:.½¬¬\´:::::::::::::::::::::::::------\´\´½`;
      break;
    case "endeavour":
      var ascii_u = `¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./o.½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./sssso-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:osssssss+-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:+sssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬¬¬\´-/ossssssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬\´-/+sssssssssssssssso+:\´½¬¬¬¬¬¬¬¬¬\´-:/+sssssssssssssssssso+/.½¬¬¬¬¬¬¬\´.://osssssssssssssssssssso++-½¬¬¬¬¬¬.://+ssssssssssssssssssssssso++:½¬¬¬¬.:///ossssssssssssssssssssssssso++:½¬¬\´:////ssssssssssssssssssssssssssso+++.½\´-////+ssssssssssssssssssssssssssso++++-½¬\´..-+oosssssssssssssssssssssssso+++++/\´½¬¬¬.++++++++++++++++++++++++++++++/:.½¬¬\´:::::::::::::::::::::::::------\´\´½`;
      break;
    case 'manjaro':
      var ascii_u = `██████████████████¬¬████████½██████████████████¬¬████████½██████████████████¬¬███████½██████████████████¬¬████████½████████¬¬¬¬¬¬¬¬¬¬¬¬████████½████████¬¬████████¬████████½████████¬¬████████¬¬████████½████████¬¬████████¬¬████████½████████¬¬███████¬¬████████½████████¬¬████████¬¬████████½████████¬¬████████¬¬████████½████████¬¬███████¬¬████████½████████¬¬████████¬¬████████½████████¬¬████████¬¬████████½`;
      break;
    case 'mint':
      var ascii_u = `¬¬¬¬¬¬¬¬¬¬¬¬¬...-:::::-...½¬¬¬¬¬¬¬¬¬¬.-MMMMMMMMMMMMMMM-.½¬¬¬¬¬¬.-MMMM´..-:::::::-..\´MMMM-.½¬¬¬¬.:MMMM.:MMMMMMMMMMMMMMM:.MMMM:.½¬¬¬-MMM-M--MMMMMMMMMMMMMMMMMMM.MMM-½¬\´:MMM:MM\´¬¬:MMMM:....::-...-MMMM:MMM:\´½¬:MMM:MMM´¬¬:MM:\´¬¬\´\´¬¬¬¬\´\´¬¬\´:MMM:MMM:½.MMM.MMMM\´¬¬:MM.¬¬-MM.¬¬.MM-¬¬\´MMMM.MMM.½:MMM:MMMM\´¬¬:MM.¬¬-MM-¬¬.MM:¬¬\´MMMM-MMM:½:MMM:MMMM\´¬¬:MM.¬¬-MM¬¬.MM:¬¬\´MMMM:MMM:½:MMM:MMMM\´¬¬:MM.¬¬-MM-¬¬.MM:¬¬\´MMMM-MMM:½.MMM.MMMM´¬¬:MM:--:MM:--:MM:¬¬\´MMMM.MMM.½¬:MMM:MMM-¬¬\´-MMMMMMMMMMMM-\´¬¬-MMM-MMM:½¬¬:MMM:MMM:\´¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:MMM:MMM:½¬¬¬.MMM.MMMM:--------------:MMMM.MMM.½¬¬¬¬¬'-MMMM.MMMMMMMMMMMMMMM-.MMMM-'½¬¬¬¬¬¬¬'.-MMMM\´\´--:::::--\´\´MMMM-.'½¬¬¬¬¬¬¬¬¬¬¬¬'MMMMMMMMMMMMM-'½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´\´-:::::-\´\´½`;
      break;
    case 'popos':
      var ascii_u = `¬¬¬¬¬¬¬¬¬¬¬¬¬/////////////½¬¬¬¬¬¬¬¬¬/////////////////////½¬¬¬¬¬¬///////*767////////////////½¬¬¬¬//////7676767676*//////////////½¬¬¬/////76767//7676767//////////////½¬¬/////767676///*76767///////////////½¬///////767676///76767.///7676*///////½/////////767676//76767///767676////////½//////////76767676767////76767/////////½///////////76767676//////7676//////////½////////////,7676,///////767///////////½/////////////*7676///////76////////////½///////////////7676////////////////////½¬///////////////7676///767////////////½¬¬//////////////////////'////////////½¬¬¬//////.7676767676767676767,//////½¬¬¬¬/////767676767676767676767/////½¬¬¬¬¬¬///////////////////////////½¬¬¬¬¬¬¬¬¬/////////////////////½¬¬¬¬¬¬¬¬¬¬¬¬¬/////////////`;
      break;
    case 'ubuntu':
      var ascii_u = `¬¬¬¬¬¬¬¬¬¬¬¬.-/+oossssoo+/-.½¬¬¬¬¬¬¬¬\´:+ssssssssssssssssss+:\´½¬¬¬¬¬¬-+ssssssssssssssssssyyssss+-½¬¬¬¬.ossssssssssssssssssdMMMNysssso.½¬¬¬/ssssssssssshdmmNNmmyNMMMMhssssss/½¬¬+ssssssssshmydMMMMMMMNddddyssssssss+½¬/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/½.ssssssssdMMMNhsssssssssshNMMMdssssssss.½+sssshhhyNMMNyssssssssssssyNMMMysssssss+½ossyNMMMNyMMhsssssssssssssshmmmhssssssso½ossyNMMMNyMMhsssssssssssssshmmmhssssssso½+sssshhhyNMMNyssssssssssssyNMMMysssssss+½.ssssssssdMMMNhsssssssssshNMMMdssssssss.½¬/sssssssshNMMMyhhyyyyhdNMMMNhssssssss/½¬¬+sssssssssdmydMMMMMMMMddddyssssssss+½¬¬¬/ssssssssssshdmNNNNmyNMMMMhssssss/½¬¬¬¬.ossssssssssssssssssdMMMNysssso.½¬¬¬¬¬¬-+sssssssssssssssssyyyssss+-½¬¬¬¬¬¬¬¬\´:+ssssssssssssssssss+:\´½¬¬¬¬¬¬¬¬¬¬¬¬.-/+oossssoo+/-.½`;
      break;
    default:
      var ascii_u = ``;
  }
  return ascii_u.replaceAll("¬","\u00a0").split("½");
};

function clear_console(){
  stdout.innerHTML = "";
  stdout.style.marginTop = getComputedStyle(main_window).height.slice(0,-2) - getComputedStyle(prompt).height.slice(0,-2) + 'px';
  stdout.style.height = '0px';
  return;
};

function update_height(){
  var stdout_height = getComputedStyle(stdout).height.slice(0,-2);
  var stdout_margin = getComputedStyle(stdout).marginTop.slice(0,-2);
  stdout.style.height = (parseInt(stdout_height) + stdout_lineheight) + 'px';
  stdout.style.marginTop = (stdout_margin - stdout_lineheight) + 'px';
};

function newline(command_output, mode) {
  update_height();
  line = document.createElement('div');
  line.classList = "line";
  stdout.appendChild(line);
  if (mode != null){
    generate_prompt(line, command_output);
    history.push(cli_line.value);
    position = history.length;
  }
  else{
    line.textContent=command_output;
  }
  cli_line.value = "";
};

function show_prompt(msg, info){
  if (msg = "Password:"){
    cli_line.type = "password";
    prompt.innerHTML = "Password:";
    login_data[0] = "True";
  };
};

async function contains_value(target, attrib, object){
  for (i=0; i<object.length; i++){
    if(object[i][attrib] == target){
      return true;
    };
  };
  return false;
};

async function authentication_complete(){
  if (lightdm.is_authenticated){
    await load('out');
    try{
      lightdm.start_session_sync(login_data[2]);
    }
    catch (e){
      lightdm.start_session_sync();
    };
  }
  else{
    newline('Contraseña incorrecta');
    login_data[0] = "False";
  };
  cli_line.value = "";
  generate_prompt(null, null, 'regenerate');
  cli_line.type = "text";
  cli_line.readOnly = false;
};

async function start() {
  await fetch_theme();
  await sleep(1);
  if (ascii == null){
    ascii = os;
  };
  ascii = await fetch_ascii();
  load('in');
  openstorage();
  cli_line.style.visibility = "hidden";
  prompt.nextSibling.parentNode.removeChild(prompt.nextSibling);
  stdout.style.marginTop = getComputedStyle(main_window).height.slice(0,-2) - getComputedStyle(prompt).height.slice(0,-2) + 'px';
  await terminal_animation();
  await window_setup();
  generate_prompt();
  cli_line.style.visibility = "visible";
  cli_line.focus();
  if (onload_empty){
    await sleep(200);
    stdout.style.marginTop = getComputedStyle(main_window).height.slice(0,-2) - getComputedStyle(prompt).height.slice(0,-2) + 'px';
  };
};

window.addEventListener('keydown', function(event){
  if (cli_line.readOnly){
    return;
  };
  const pressedkey = event.key
  if (startup == "false"){
    if (pressedkey == "Enter"){
      if (login_data[0] == 'True'){
        lightdm.respond(cli.value)
        cli_line.value="";
        cli_line.readOnly = true;
      }
      else{
        command_check();
      };
    }
    else if (pressedkey == "ArrowUp") {
      if (position - 1 >= 0){
        position = position - 1;
        cli_line.value=history[position];
      };
    }
    else if (pressedkey == "ArrowDown") {
      if (position + 1 < history.length){
        position = position + 1
        cli_line.value=history[position];
      }
      else if (position + 1 == history.length){
        position = position + 1;
        cli_line.value="";
      };
    };
  }
  else{
    if (pressedkey == "Enter"){
      startup = "quick";
    };
  };
});
background.onclick = function (event) {
  setTimeout(function() {
      cli_line.focus()
  }, 10);
};

cli_line.onblur = function (event) {
    setTimeout(function() {
        cli_line.focus()
    }, 10);
};
window.onload= start();
