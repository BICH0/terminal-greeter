var langs = {"es":{"save":"Guardar", "reset":"Reiniciar","unk_comm":"sh: Comando desconocido: ","inv_ssns":"Sesion invalida, usa sessions para listar todas las sesiones disponibles","inv_usrs":"Usuario invalido, usa users para listar todos los usuarios disponibles"},
    "en":{"save":"Save","reset":"Reset","unk_comm":"sh: Unknown command: ","inv_ssns":"Invalid session, use sessions to list all available sessions","inv_usrs":"Invalid user, use users to list all available sessions"}}
class fetcher{
    constructor(){
        this.in_authentication = false;
        this.colors_array = [];
    }
    get ascii(){
        switch (defaults["ascii"]) {
            case "arch":
            var asc = `¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-\`½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬.o+\`½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`ooo/½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`+oooo:½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`+oooooo:½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-+oooooo+:½¬¬¬¬¬¬¬¬¬¬¬¬¬\`/:-:++oooo+:½¬¬¬¬¬¬¬¬¬¬¬¬\`/++++/+++++++:½¬¬¬¬¬¬¬¬¬¬¬\`/++++++++++++++:½¬¬¬¬¬¬¬¬¬¬\`/+++ooooooooooooo/\`½¬¬¬¬¬¬¬¬¬./ooosssso++osssssso+\`½¬¬¬¬¬¬¬¬.oossssso-\`\`\`\`/ossssss+\`½¬¬¬¬¬¬¬-osssssso.¬¬¬¬¬¬:ssssssso.½¬¬¬¬¬¬:osssssss/¬¬¬¬¬¬¬¬osssso+++.½¬¬¬¬¬/ossssssss/¬¬¬¬¬¬¬¬+ssssooo/-½¬¬¬\`/ossssso+/:-¬¬¬¬¬¬¬¬-:/+osssso+-½¬¬\`+sso+:-\`¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`.-/+oso:½¬\`++:.¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`-/+/½¬.\`¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`½¬`;
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
            var asc = `MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMMMMMMMMM½MMMMMMMMMMNs..yMMMMMMMMMMMMMm:¬+NMMMMMMM½MMMMMMMMMN+¬¬¬¬:mMMMMMMMMMNo\`¬-dMMMMMMMM½MMMMMMMMMMMs.¬¬¬\`oNMMMMMMh-¬\`sNMMMMMMMMM½MMMMMMMMMMMMN/¬¬¬¬-hMMMN+¬¬:dMMMMMMMMMMM½MMMMMMMMMMMMMMh-¬¬¬¬+ms.¬.sMMMMMMMMMMMMM½MMMMMMMMMMMMMMMN+\`¬¬¬\`¬¬+NMMMMMMMMMMMMMM½MMMMMMMMMMMMMMNMMd:¬¬¬¬.dMMMMMMMMMMMMMMM½MMMMMMMMMMMMm/-hMd-¬¬¬¬¬\`sNMMMMMMMMMMMMM½MMMMMMMMMMNo\`¬¬¬-\`¬:h/¬¬¬¬-dMMMMMMMMMMMM½MMMMMMMMMd:¬¬¬¬¬¬¬/NMMh-¬¬¬\`+NMMMMMMMMMM½MMMMMMMNo\`¬¬¬¬¬¬¬¬¬:mMMN+\`¬¬¬\`-hMMMMMMMM½MMMMMMh.¬¬¬¬¬¬¬¬¬¬¬¬\`oNMMd:¬¬¬¬\`/mMMMMMM½MMMMm/¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-hMd-¬¬¬¬¬¬\`sNMMMM½MMNs\`¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬-¬¬¬¬¬¬¬¬¬¬:dMMM½Mm:¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\`oMM½MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM½`;
            break;
            case "endeavour":
            var asc = `¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./o.½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./sssso-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:osssssss+-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:+sssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬¬¬\´-/ossssssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬\´-/+sssssssssssssssso+:\´½¬¬¬¬¬¬¬¬¬\´-:/+sssssssssssssssssso+/.½¬¬¬¬¬¬¬\´.://osssssssssssssssssssso++-½¬¬¬¬¬¬.://+ssssssssssssssssssssssso++:½¬¬¬¬.:///ossssssssssssssssssssssssso++:½¬¬\´:////ssssssssssssssssssssssssssso+++.½\´-////+ssssssssssssssssssssssssssso++++-½¬\´..-+oosssssssssssssssssssssssso+++++/\´½¬¬¬.++++++++++++++++++++++++++++++/:.½¬¬\´:::::::::::::::::::::::::------\´\´½`;
            break;
            case "endeavour":
            var asc = `¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./o.½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬./sssso-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:osssssss+-½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:+sssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬¬¬\´-/ossssssssssssso/.½¬¬¬¬¬¬¬¬¬¬¬\´-/+sssssssssssssssso+:\´½¬¬¬¬¬¬¬¬¬\´-:/+sssssssssssssssssso+/.½¬¬¬¬¬¬¬\´.://osssssssssssssssssssso++-½¬¬¬¬¬¬.://+ssssssssssssssssssssssso++:½¬¬¬¬.:///ossssssssssssssssssssssssso++:½¬¬\´:////ssssssssssssssssssssssssssso+++.½\´-////+ssssssssssssssssssssssssssso++++-½¬\´..-+oosssssssssssssssssssssssso+++++/\´½¬¬¬.++++++++++++++++++++++++++++++/:.½¬¬\´:::::::::::::::::::::::::------\´\´½`;
            break;
            case 'manjaro':
            var asc = `██████████████████¬¬████████½██████████████████¬¬████████½██████████████████¬¬███████½██████████████████¬¬████████½████████¬¬¬¬¬¬¬¬¬¬¬¬████████½████████¬¬████████¬████████½████████¬¬████████¬¬████████½████████¬¬████████¬¬████████½████████¬¬███████¬¬████████½████████¬¬████████¬¬████████½████████¬¬████████¬¬████████½████████¬¬███████¬¬████████½████████¬¬████████¬¬████████½████████¬¬████████¬¬████████½`;
            break;
            case 'mint':
            var asc = `¬¬¬¬¬¬¬¬¬¬¬¬¬...-:::::-...½¬¬¬¬¬¬¬¬¬¬.-MMMMMMMMMMMMMMM-.½¬¬¬¬¬¬.-MMMM´..-:::::::-..\´MMMM-.½¬¬¬¬.:MMMM.:MMMMMMMMMMMMMMM:.MMMM:.½¬¬¬-MMM-M--MMMMMMMMMMMMMMMMMMM.MMM-½¬\´:MMM:MM\´¬¬:MMMM:....::-...-MMMM:MMM:\´½¬:MMM:MMM´¬¬:MM:\´¬¬\´\´¬¬¬¬\´\´¬¬\´:MMM:MMM:½.MMM.MMMM\´¬¬:MM.¬¬-MM.¬¬.MM-¬¬\´MMMM.MMM.½:MMM:MMMM\´¬¬:MM.¬¬-MM-¬¬.MM:¬¬\´MMMM-MMM:½:MMM:MMMM\´¬¬:MM.¬¬-MM¬¬.MM:¬¬\´MMMM:MMM:½:MMM:MMMM\´¬¬:MM.¬¬-MM-¬¬.MM:¬¬\´MMMM-MMM:½.MMM.MMMM´¬¬:MM:--:MM:--:MM:¬¬\´MMMM.MMM.½¬:MMM:MMM-¬¬\´-MMMMMMMMMMMM-\´¬¬-MMM-MMM:½¬¬:MMM:MMM:\´¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´:MMM:MMM:½¬¬¬.MMM.MMMM:--------------:MMMM.MMM.½¬¬¬¬¬'-MMMM.MMMMMMMMMMMMMMM-.MMMM-'½¬¬¬¬¬¬¬'.-MMMM\´\´--:::::--\´\´MMMM-.'½¬¬¬¬¬¬¬¬¬¬¬¬'MMMMMMMMMMMMM-'½¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬\´\´-:::::-\´\´½`;
            break;
            case 'popos':
            var asc = `¬¬¬¬¬¬¬¬¬¬¬¬¬/////////////½¬¬¬¬¬¬¬¬¬/////////////////////½¬¬¬¬¬¬///////*767////////////////½¬¬¬¬//////7676767676*//////////////½¬¬¬/////76767//7676767//////////////½¬¬/////767676///*76767///////////////½¬///////767676///76767.///7676*///////½/////////767676//76767///767676////////½//////////76767676767////76767/////////½///////////76767676//////7676//////////½////////////,7676,///////767///////////½/////////////*7676///////76////////////½///////////////7676////////////////////½¬///////////////7676///767////////////½¬¬//////////////////////'////////////½¬¬¬//////.7676767676767676767,//////½¬¬¬¬/////767676767676767676767/////½¬¬¬¬¬¬///////////////////////////½¬¬¬¬¬¬¬¬¬/////////////////////½¬¬¬¬¬¬¬¬¬¬¬¬¬/////////////`;
            break;
            case 'ubuntu':
            var asc = `¬¬¬¬¬¬¬¬¬¬¬¬.-/+oossssoo+/-.½¬¬¬¬¬¬¬¬\´:+ssssssssssssssssss+:\´½¬¬¬¬¬¬-+ssssssssssssssssssyyssss+-½¬¬¬¬.ossssssssssssssssssdMMMNysssso.½¬¬¬/ssssssssssshdmmNNmmyNMMMMhssssss/½¬¬+ssssssssshmydMMMMMMMNddddyssssssss+½¬/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/½.ssssssssdMMMNhsssssssssshNMMMdssssssss.½+sssshhhyNMMNyssssssssssssyNMMMysssssss+½ossyNMMMNyMMhsssssssssssssshmmmhssssssso½ossyNMMMNyMMhsssssssssssssshmmmhssssssso½+sssshhhyNMMNyssssssssssssyNMMMysssssss+½.ssssssssdMMMNhsssssssssshNMMMdssssssss.½¬/sssssssshNMMMyhhyyyyhdNMMMNhssssssss/½¬¬+sssssssssdmydMMMMMMMMddddyssssssss+½¬¬¬/ssssssssssshdmNNNNmyNMMMMhssssss/½¬¬¬¬.ossssssssssssssssssdMMMNysssso.½¬¬¬¬¬¬-+sssssssssssssssssyyyssss+-½¬¬¬¬¬¬¬¬\´:+ssssssssssssssssss+:\´½¬¬¬¬¬¬¬¬¬¬¬¬.-/+oossssoo+/-.½`;
            break;
            default:
            var asc = ``;
        }
        return asc.replaceAll("¬","\u00a0").split("½");
    }
    theme(theme=defaults["thms"]){
        console.log("theme func")
        let nodes = document.head.querySelectorAll("[href*='themes'],[src*='themes']");
        console.log(document.head.querySelectorAll("[href*='themes'],[src*='themes']"))
        if (nodes.length != 0){
            nodes.forEach(node =>{
                console.log(node.src)
                let modifyied;
                let mode;
                try{
                    modifyied = node.src.split("/");
                    console.log("try " + node)
                    mode = "src";
                }catch{
                    modifyied = node.href.split("/");
                    console.log("catch " + node)
                    mode = "href";
                }
                modifyied[modifyied.length - 2] = theme;
                modifyied = modifyied.join("/");
                console.log(modifyied)
                if (mode == "src"){
                    console.log("src changed")
                    node.src = modifyied;
                }else{
                    console.log("src changed")
                    node.href = modifyied;
                }
            })
        }else{
            let script = document.createElement("script");
            script.src = "./themes/" + theme + "/theme.js";
            script.type = "text/javascript";
            let stylesheet = document.createElement("link");
            stylesheet.type = "text/css";
            stylesheet.rel = "stylesheet";
            stylesheet.href = "./themes/" + theme + "/theme.css";
            stylesheet.onload = load;
            document.head.appendChild(script);
            document.head.appendChild(stylesheet);
        }       
      };
    lang_selector(value){
        switch (value){
            case "es":
            case "en":
                defaults["lngs"] = value;
                fetch.colors();
            break; 
        }
    }
    cleancolors(){
        console.log(this.cleancolors)
        for (let color in this.colors_array){
            storage.removeItem(defaults["thms"].slice(0,2)+color);
        }
        this.colors();
    }
    colors(update=false,store=false){
        let colors = document.getElementsByClassName("colors")[0];
        if (update){
            colors = colors.childNodes
            for (let x=1;x<colors.length - 1;x++){
                let colorname = colors[x].id.slice(4,);
                let colorvalue = colors[x].childNodes[1].value;
                let coloropacity = parseInt(colors[x].childNodes[2].value).toString(16);
                // console.log(colorname + " " + colorvalue + coloropacity)
                document.documentElement.style.setProperty("--"+colorname, colorvalue + coloropacity);
                this.colors_array["--" + colorname] = colorvalue + coloropacity;
            }
            if (store){
                for (let color in this.colors_array){
                    console.log("Saved " + color + " with value " + this.colors_array[color])
                    storage.setItem(defaults["thms"].slice(0,2)+color, this.colors_array[color])
                }
            }
        }else{
            let colors = document.getElementsByClassName("colors")[0];
            colors.innerHTML = "<div><h4>Item</h4><h4>Color</h4><h4>Opacity</h4>";
            let stsheet;
            for (let x=0; x<document.styleSheets.length; x++){
                try{
                    stsheet = document.styleSheets[x].cssRules[0].cssText.slice(8,-3).split(";");
                    stsheet.forEach(rule => {
                        rule = rule.replaceAll(" ","").split(":");
                        let name = rule[0];
                        let value;
                        value = storage.getItem(defaults["thms"].slice(0,2)+name);
                        if (value != null){
                            name = name.replaceAll("--","");
                            document.documentElement.style.setProperty(name,value)
                        }else{
                            console.log("catch")
                            name = name.replaceAll("--","");
                            value = rule[1];
                        }
                        let opacity = 255;
                        if (! /^#[0-9a-fA-F]{3,6}$/.test(value)){ //Comprobar la regexp
                            if (/^#[0-9a-fA-F]{8}$/.test(value)){
                                opacity = parseInt(value.slice(-2,), 16);
                                value = value.slice(0,-2);
                            }else{
                                console.log(value)
                                console.log("Value out of bounds")
                            }
                        }
                        colors.innerHTML+=("<span id='clr_" + name + "'><label>"+ name + "</label><input type='color' value='" + value + "'><input type='range' min='0' max='255' step='1' oninput='this.nextElementSibling.value = this.value' value='" + opacity + "' style='width:40%;'><output style='width:calc(3rem + 3px); margin-right:5px;'>" + opacity + "</output>");//Pasar todo a hex
                    })
                }
                catch(e){
                    console.log("Unable to get " + stsheet + " due to " + e)
                }
            }
            colors.innerHTML += "<div id='colors-btn'><input type='button' onclick='fetch.colors(true,true)' value='" + langs[defaults["lngs"]]["save"] + "'><input type='button' onclick='fetch.cleancolors()' value='" + langs[defaults["lngs"]]["reset"] + "'></div>";
            fetch.colors(true);
        }
    }
    ldm(){
        usrs = lightdm.users.map(({username}) => username);
        ssns = lightdm.sessions.map(({key}) => key);
        lightdm.cancel_autologin();
    
    }
    check(list, param, target){
        if (target == null){
            return false;
        }
        let status = false;
        list.every(item =>{
            console.log(item[param] + "=?" + target)
            if (item[param] == target){
                status=true;
                return false;
            }
            return true;
        })
        return status;
    }
    async onerror(){
        terminal.classList.toggle("wiggle");
        await sleep(2000);
        terminal.classList.toggle("wiggle");
    }
    async password(mode){
        console.log(mode)
        function toggleprompt(){
            let promptitems = prompt.childNodes;
            for (let x=0;x<=2;x++){
                promptitems[x].classList.toggle("hidden");
            }
            if (stdin.type == "text"){
                stdin.type = "password";
                promptitems[3].innerText = "Password:";

            }else{
                stdin.type = "text";
                promptitems[3].innerText = prompt_vals[1];
            }
        }
        if (mode == "pre"){
            toggleprompt();
        }else{
            console.log("Trying to auth with password " + mode)
            stdin.disabled = true;
            await sleep(100);
            lightdm.respond(mode);
            await sleep(100);
	   console.log("Result " + lightdm.is_authenticated)
            if (lightdm.is_authenticated){
                theme.loadsession();
            }else{
                command.return("Contraseña incorrecta")//TODO Traducir
                toggleprompt();
                fetch.onerror();
                fetch.in_authentication = false;
                stdin.disabled = false;
                lightdm.cancel_authentication();
            }
        }
    }
}
