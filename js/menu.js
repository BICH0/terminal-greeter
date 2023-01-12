class menuobj{
    constructor(){
        this.hidden = false;
        Array.from(document.getElementsByClassName("container")).forEach(container => {
            let item = container.id.split("-")[0];
            let scontainer=container.childNodes[3]
            window[item + 's'].forEach(element => {
                scontainer.innerHTML += "<p class='clickable child' data-function='" + item + "-" + element + "'>" + element.toUpperCase() + "</p>";
            })
        })
        if (typeof lightdm !== "undefined"){
            document.getElementById("pwr-container").childNodes.forEach(option => {
                if (option.nodeType === Node.TEXT_NODE){
                    return;
                }
                console.log(option)
                let route = option.src.split("/");
                let opt_name = route[route.length -1].split(".")[0];
                if (lightdm["can_" + opt_name] === "undefined"){
                    throw "No function"
                }else{
                    option.style.filter = "";
                    option.onclick = lightdm[opt_name];
                }
            });
        }
    }
    async select(item, index){
        try{
            let parent = item.parentNode.childNodes;
            let info = item.dataset.function.split("-");
            storage.setItem(info[0]+"s",info[1])
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
            console.log("An error ocurred while selecting one or more options: " + e)
        }
            // cambiar el metodo de seleccion a brillo o fontweight
        // item.parentNode.style.maxWidth = item.offsetWidth + "px";
    }
    settings(item){
        if (! item.classList.contains("hover")){
            item.classList.add("hover");
            console.log("a")
            var configopen = function (e){
                let container = document.getElementById("thm-container");
                if (e.target != container && !document.getElementById("thm-container").contains(e.target)){
                    console.log(e.target)
                    document.removeEventListener("click", configopen, true)
                    item.classList.remove("hover");
                    fetch.colors("update");
                }
            }
            document.addEventListener("click", configopen, true);
        }   
    }
    visibility(){
        let state = "hidden";
        if (this.hidden){
            state = "";
        }
        console.log(this.hidden, state)
        Array.from(document.getElementsByClassName("container")).forEach(container => {
            console.log(container)
            container.style.visibility = state;
        })
        this.hidden = !this.hidden;
    }
}