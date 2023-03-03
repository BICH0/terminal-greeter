class menuobj{
    constructor(){
        this.hidden = false;
        this.bat_prc = false;
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
            pwrcontainer.childNodes.forEach(option => {
                if (option.nodeType === Node.TEXT_NODE){
                    return;
                }
                let route = option.src.split("/");
                let opt_name = route[route.length -1].split(".")[0];
                if (lightdm["can_" + opt_name] === undefined || lightdm["can_" + opt_name] == false){
                    console.log("Lightdm cannot " + opt_name)
                }else{
                    option.style = "filter:brightness(100%) !important;";
                    option.onclick = lightdm[opt_name];
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
            console.log("SetItem " + info[0] + " to " + info[1])
            //console.log("Value " + storage.getItem("thms"))
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
            console.log("An error ocurred while selecting one or more options: " + e)
        }
            // cambiar el metodo de seleccion a brillo o fontweight
        // item.parentNode.style.maxWidth = item.offsetWidth + "px";
    }
    settings(item){
        if (! item.classList.contains("hover")){
            item.classList.add("hover");
            var configopen = function (e){//Revisar si se puede con let
                let container = document.getElementById("thm-container");
                if (e.target != container && !document.getElementById("thm-container").contains(e.target)){//Container ?= document.getElementById
                    document.removeEventListener("click", configopen, true)
                    item.classList.remove("hover");
                    fetch.colors(true);
                }
            }
            document.addEventListener("click", configopen, true);
        }   
    }
    background(item){
        bg_container.classList.add("bg-open");
        var bg_selector = function (e){
            if (e.target != bg_container && !bg_container.contains(e.target)){
                bg_container.classList.remove("bg-open");
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