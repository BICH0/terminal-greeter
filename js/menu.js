class menuobj{
    constructor(){
        this.hidden = false;
        this.bat_prc = false;
        this.timer = 0;
        Array.from(document.getElementsByClassName("container")).forEach(container => {
            let item = container.id.split("-")[0];
            let scontainer=container.childNodes[3];
            window[item + 's'].forEach(element => {
                scontainer.innerHTML += "<p class='clickable child' data-function='" + item + "-" + element + "'>" + element.toUpperCase() + "</p>";
            })
        })
        if (typeof lightdm !== "undefined"){
            if (lightdm.can_access_battery){
                this.battery();
                lightdm.battery_update.connect(() => this.battery());
            }
            pwr_container.childNodes.forEach(option => {
                if (option.nodeType === Node.TEXT_NODE){
                    return;
                }
                let route = option.src.split("/");
                let opt_name = route[route.length -1].split(".")[0];
                if (lightdm["can_" + opt_name] === undefined || lightdm["can_" + opt_name] == false){
                    console.log("Lightdm cannot " + opt_name)
                }else{
                    option.style = "filter:brightness(100%) !important;cursor:pointer;";
                    option.setAttribute("data-function","pwr-"+opt_name);
                }
            });

        }
    }
    async select(item){
        try{
            let index = Array.prototype.indexOf.call(item.parentNode.childNodes, item);
            let parent = item.parentNode.childNodes;
            let info = item.dataset.function.split("-");
            storage.setItem(info[0]+"s",info[1])
            defaults[info[0]+"s"] = info[1];
            console.log("SetItem " + info[0] + " to " + info[1])
            for (let x=0; x<parent.length; x++){
                if (x==index){
                    if (item.classList.contains("hidden")){
                        item.classList.toggle("hidden")                
                    }
                }else if ( ! parent[x].classList.contains("hidden")){
                    parent[x].classList.toggle("hidden");
                }
            }
            await sleep(1);
            generate_prompt();
        }catch(e){
            console.error("An error ocurred while selecting one or more options: (" + item.dataset.function + ") " + e)
        }
            // cambiar el metodo de seleccion a brillo o fontweight
        // item.parentNode.style.maxWidth = item.offsetWidth + "px";
    }
    settings(item){
        if (! item.classList.contains("hover")){
            item.classList.add("hover");
            var configopen = function (e){//Revisar si se puede con let
                if (e.target != thm_container && !thm_container.contains(e.target)){//Container ?= document.getElementById
                    document.removeEventListener("click", configopen, true)
                    item.classList.remove("hover");
                    fetch.colors();
                }
            }
            document.addEventListener("click", configopen, true);
        }   
    }
    background(item){
        let childs = thm_container.childNodes;
        function toggle_childs(opacity=""){
            childs.forEach(node =>{
                if (node.nodeType === Node.TEXT_NODE){
                    return;
                }
                if (node.classList.contains("colors")){
                    node.classList.toggle("hidecolors");
                }else if (node.classList.contains("subcontainer")){
                    node.style.opacity = opacity;
                }
            })
        }
        bg_container.classList.add("bg-open");
        toggle_childs(0)
        var bg_selector = function (e){
            if (e.target != bg_container && !bg_container.contains(e.target) && !(e.target.tagName == "INPUT" && e.target.parentNode.id == "colors-btn")){
                bg_container.classList.remove("bg-open");
                toggle_childs();
                document.removeEventListener("click", bg_selector, true)
            }
        }
        document.addEventListener("click", bg_selector, true);
    }
    visibility(){
        let state = "hidden";
        if (this.hidden){
            state = "";
        }
        Array.from(document.getElementsByClassName("container")).forEach(container => {
            container.style.visibility = state;
        })
        this.hidden = !this.hidden;
    }
    async power(opt){
        notification.parentNode.classList.toggle("notification-on");
        let action = langs[defaults["lngs"]][opt].split(":");
        let units = langs[defaults["lngs"]]["timer"].split(":");
        let title = notification.querySelector("#notification-title");
        let timer = notification.querySelector("#notification-timer");
        title.innerText = action[1];
        menu.timer = default_timer*10 + 9;
        while (menu.timer>=0){
            timer.innerText = action[0] + units[0] + Math.trunc(menu.timer/10)+ units[1];
            await sleep(100);
            menu.timer--;
        }
        notification.parentNode.classList.toggle("notification-on");
        console.log("Timer was set to " + menu.timer)
        if (menu.timer >= -5){
            console.log("Handling " + opt);
            lightdm[opt]();
        }
    }
    notification_response(e,num=-5){
        e.stopPropagation();
        this.timer=num;
    }
    battery(){
        let bat0 = lightdm.battery_data;
        if (bat0.ac_status){
            pwrcontainer.classList.add("ac_on")
            this.bat_perc = true;
        }else{
            pwrcontainer.classList.remove("ac_on")
            this.bat_perc = false;
            this.battery_perc();
        }
      }
    async battery_perc(){
        if (oneway && ! lightdm.battery_data.ac_status){
            let shadow = "4px 4px var(--shadow)";
            oneway = false;
            while (! this.bat_perc){
            let bat_level = lightdm.battery_data.level;
            if (bat_level > 60){
                pwrcontainer.style.boxShadow = shadow + ", inset 0 0 5px 2px #5a9d4e";
            }else if(bat_level > 30){
                pwrcontainer.style.boxShadow = shadow + ", inset 0 0 5px 2px #9d974e";
            }else{
                pwrcontainer.style.boxShadow = shadow + ", inset 0 0 5px 2px #9d4e4e";
            }
            await sleep(10000);
            }
            oneway = true;
        }
    }
}