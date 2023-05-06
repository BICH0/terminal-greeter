var langs;var man;
fetch("mandb.json").then(response => response.json()).then(json => JSON.stringify(json)).then(json => JSON.parse(json)).then(result => {
    langs = result["lang"];
    //man = result["man"];
});
class fetcher{
    constructor(){
        this.in_authentication = false;
        this.stored_dict = {};
        this.theme_dict = {};
        this.custom_dict = {};
        this.login_tries = 0;
    }
    ascii(name){
        switch (name) {
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
    async theme(thm=defaults["thms"]){
        cover.style.opacity = "1";
        await sleep(300);
        cover.style.display = "block";
        let nodes = document.head.querySelectorAll("[href*='themes'],[src*='themes']");
        if (nodes.length != 0){
            theme.loadsession(false);
            nodes.forEach(node =>{
                node.remove();
            })
        }
        storage.setItem("multiwin","a");
        let script = document.createElement("script");
        script.src = "./themes/" + thm + "/theme.js";
        script.type = "text/javascript";
        script.onload = () => console.log("Script loaded");
        let stylesheet = document.createElement("link");
        stylesheet.type = "text/css";
        stylesheet.rel = "stylesheet";
        stylesheet.href = "./themes/" + thm + "/theme.css";
        script.onload = () => console.log("Stylesheet loaded");
        document.head.appendChild(script);
        document.head.appendChild(stylesheet);
        while (typeof(theme) != "object"){
            try{
                theme = new classTheme;
            }catch{
                await sleep(100);
            }
        }
        await this.byebye();
        this.background("init");
        this.colors("setup");
        await sleep(100);
        load();
    };
    lang_selector(value=defaults["lngs"]){
            defaults["lngs"] = value;
            this.colors("");
    }
    background(mode=null,item){
        switch (mode){
            case null:
                let path;
                try{
                    path=item.src.split("/").pop();
                }
                catch{
                    path="placeholder.png"
                }
                if (path == "placeholder.png"){
                    wrapper.style.background = "var(--background)";
                }else{
                    wrapper.style.background = "url('" + item.getAttribute("src") + "') no-repeat center/cover";
                }
                let items = document.getElementsByClassName("bg-selected");
                if (items[0] != undefined){
                    items[0].classList.remove("bg-selected");
                }
                bg_container.querySelectorAll("img[data-name='" + path + "']")[0].classList.add("bg-selected");
                break;
            case "setup":
                bg_container.innerHTML += "<img src='"+root_dir+"/resources/placeholder.png' class='bg-selected' onclick='fetch.background(null,this)'data-name='placeholder.png'>";
                theme_utils.dirlist(root_dir+"/resources/backgrounds",true,files=>{
                    files.forEach(file => {
                        let filename = file.split("/").pop();
                        bg_container.innerHTML += "<img src='" + file + "'onclick='fetch.background(null,this)'data-name='" + filename + "'>";
                    })
                })
                break;
            case "init":
                let tback = this.stored_dict["background-img"];
                if ((!/var\(/.test(tback)) && item != "reset" && tback != null){
                    let tobj = document.querySelectorAll("img[data-name='" + tback + "']")[0];
                    if ( tobj != null){
                        this.background(null,tobj);
                    }
                }else{
                    if (/^url\(/.test(wrapper.style.background)){
                        this.background(null,)
                    }
                }
                break;
        }
    }
    async colors(action="update"){
        var colorsContainer = document.getElementsByClassName("colors")[0];
        async function colors_updater(param=null,value=null){
            fetch.stored_dict[param] = value;
            let array=Object.keys(fetch.stored_dict);
            let result="";
            for (let x=0; x<array.length;x++){
                result=result+array[x]+":"+fetch.stored_dict[array[x]]+","
            }
            storage.removeItem(defaults["thms"].slice(0,2));
            await sleep(200);
            storage.setItem(defaults["thms"].slice(0,2),result.slice(0,-1));
        }
        switch (action){
            case "update":
                colorsContainer = colorsContainer.childNodes;
                for (let x=1;x<colorsContainer.length - 1;x++){
                    let colorname = colorsContainer[x].id.slice(4,);
                    let colorvalue = colorsContainer[x].childNodes[1].value;
                    let coloropacity = parseInt(colorsContainer[x].childNodes[2].value).toString(16);
                    document.documentElement.style.setProperty("--"+colorname, colorvalue + coloropacity);
                    this.custom_dict[colorname] = colorvalue + coloropacity;
                }
            break;
            case "store":
                console.log("Saving theme values")
                if (bg_container.classList.contains("bg-open")){
                    let bg_value = bg_container.getElementsByClassName("bg-selected")[0].src.split("/").pop();
                    if (! /^url\(/.test(wrapper.style.background)){
                        bg_value = "var(--background)";
                    }
                    else{
                        bg_value = bg_value;
                    }
                    colors_updater("background-img",bg_value);
                }else{
                    await this.colors();
                    let array = Object.keys(this.custom_dict);
                    for (let x=0;x<array.length;x++){
                        let key = array[x];
                        let nvalue = this.custom_dict[key];
                        if (nvalue.slice(-2,) == "ff" && nvalue.length == 9){
                            nvalue=nvalue.slice(0,-2);
                        }
                        let regexp=new RegExp(nvalue + "(f{2})?")
                        if (! regexp.test(this.theme_dict[key])){
                            if (! regexp.test(this.stored_dict[key]) || this.stored_dict[key] == null){
                                colors_updater(key,this.custom_dict[key]);
                                continue;
                            }
                            continue;
                        }
                    }
                }

                break;
            case "clean":
                storage.removeItem(defaults["thms"].slice(0,2));
            default:
                this.stored_dict = {};
                this.theme_dict = {};
                colorsContainer.innerHTML = "<div><h4>Item</h4><h4>Color</h4><h4>Opacity</h4>";
                try{
                    let custom_colors = (storage.getItem(defaults["thms"].slice(0,2))).split(",");
                    for (let x=0;x<custom_colors.length;x++){
                        let color = custom_colors[x].split(":");
                        console.log(" +" + color);
                        this.stored_dict[color[0]]=color[1];
                    }
                    console.log("Custom colors: " + (Object.keys(this.stored_dict)).length)
                }catch{
                    console.log("No custom colors");
                }
                this.background("init");
                let stsheet;
                for (let x=0; x<document.styleSheets.length; x++){
                    try{
                        let rules = document.styleSheets[x].cssRules[0];
                        if ( rules.selectorText != ":root"){
                            break;
                        }
                        stsheet = rules.cssText.slice(8,-3).split(";");
                        stsheet.forEach(rule => {
                            if (rule == ""){
                                return;
                            }
                            rule = rule.replaceAll(" ","").split(":");
                            let name = rule[0].slice(2,);
                            let value = this.stored_dict[name];
                            if (value != null){
                                document.documentElement.style.setProperty(name,value)
                            }else{
                                value = rule[1];
                            }
                            this.theme_dict[name]=value;
                            let opacity = 255;
                            if (! /^#[0-9a-fA-F]{3,6}$/.test(value)){ //Comprobar la regexp
                                if (/^#[0-9a-fA-F]{8}$/.test(value)){
                                    opacity = parseInt(value.slice(-2,), 16);
                                    value = value.slice(0,-2);
                                }else{
                                    console.warn("Value " + value + " out of bounds")
                                }
                            }
                            colorsContainer.innerHTML+=("<span id='clr_" + name + "'><label>"+ name + "</label><input type='color' value='" + value + "'><input type='range' min='0' max='255' step='1' oninput='this.nextElementSibling.value = this.value' value='" + opacity + "' style='width:40%;'><output style='width:calc(3rem + 3px); margin-right:5px;'>" + opacity + "</output>");//Pasar todo a hex
                        })
                    }
                    catch(e){
                            console.error("Unable to get " + stsheet + " due to " + e)
                    }
                }
                colorsContainer.innerHTML += "<div id='colors-btn'><input type='button' id='image_selector' onclick='menu.background(this)' value='" + langs[defaults["lngs"]]["btn_browse"] + "'><input type='button' onclick='fetch.colors(\"store\")' value='" + langs[defaults["lngs"]]["btn_save"] + "'><input type='button' onclick='fetch.colors(\"clean\")' value='" + langs[defaults["lngs"]]["btn_reset"] + "'></div>";
                let bval = langs[defaults["lngs"]]["timer"].split(":");//This is here to prevent calling from this.lang_selector() and reexecute this function
                let botones = document.getElementById("notification-buttons").querySelectorAll("input");
                botones[0].value = bval[2];
                botones[1].value = bval[3];
                fetch.colors();
            break;
        }
    }
    async ldm(){
        this.background(true);
        lightdm.cancel_autologin();
        while (thms.length == 0){
            thms=[];
            theme_utils.dirlist(root_dir+"/themes", false, themes=>{themes.forEach(theme=>{
                theme_utils.dirlist(theme,false,files=>{
                    if (files.includes(theme+"/theme.js") && files.includes(theme+"/theme.css")){
                        console.log("Detected theme " + theme)
                        let tmp = theme.split("/");
                        thms.push(tmp.pop());
                    }
                })
            })})
            await sleep(100);
        }
    }
    check(list, param, target){
        if (target == null){
            return false;
        }
        let status = false;
        list.every(item =>{
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
    login(){
        console.log(command.session_data);
        console.log("Login attempt to " + command.session_data[1] + " by " + command.session_data[0]);
        lightdm.cancel_authentication();
        console.log("Starting login of: " + command.session_data[0] + " with status " + lightdm.in_authentication);
        lightdm.authenticate(command.session_data[0]);
        fetch.in_authentication = true;
    }
    async password(mode){
        function toggleprompt(){
            let promptitems = prompt.childNodes;
            for (let x=0;x<=2;x++){
                promptitems[x].classList.toggle("hidden");
            }
            if (stdin.type == "text"){
                stdin.type = "password";
                promptitems[3].innerText = "Password:";
                promptitems[3].classList.remove("text-accent2");

            }else{
                stdin.type = "text";
                promptitems[3].innerText = prompt_vals[1];
                promptitems[3].classList.add("text-accent2");
            }
        }
        if (mode == "pre"){
            toggleprompt();
        }else{
            stdin.disabled = true;
            await sleep(100);
            lightdm.respond(mode);
            await this.byebye();
            if (lightdm.is_authenticated){
                theme.loadsession();
            }else{
                command.return(langs[defaults["lngs"]]["unk_pass"],false)
                fetch.onerror();
                if (this.login_tries >= 2){//To change the default login tries before reentering data change the number to desired tries - 1
                    toggleprompt();
                    fetch.in_authentication = false;
                    lightdm.cancel_authentication();
                    this.login_tries = 0;
                    stdin.disabled = false;

                }else{
                    this.login_tries++;
                    await this.login();
                    stdin.disabled = false;
                }
            }
        }
    }
    async byebye(){
        let temp="";
        for (let def in defaults){
            temp+=def+":"+defaults[def]+",";
        }
        storage.setItem("defaults",temp.slice(0,-1));
        await sleep(100);
    }
}
