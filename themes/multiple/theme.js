const fakeTerms = ["ascii"];
//-------------------
var classTheme = class {
    constructor(){
        this.id="multiple";
        this.mods=[];
      }
    async start(){
        console.log("Starting theme")
        let df = document.createDocumentFragment();
        let tmpt = document.head.querySelector("script");
        fakeTerms.forEach(async term =>{
            let nitem = tmpt.cloneNode();
            nitem.src = "/themes/multiple/mods/"+term+".js";
            console.log(nitem)
            document.head.appendChild(nitem);
            await sleep(100);
            let faketerm = document.createElement("div");
            faketerm.classList = "fake-terminal";
            faketerm.innerHTML = theme[term]();
            workSpace.appendChild(faketerm);
        })
        document.head.appendChild(df)          
        cover.style.opacity = 0;
        await sleep(300);
        cover.style.display = "none";
        return;
    }
    async loadsession(login=true){
        cover.style.display = "block";
        cover.style.opacity = "1";
        workspace.childNodes.forEach(child=>{
            if (child.id == "terminal"){
                return;
            }
            console.log(child + "is being removed")
            child.remove();
        })
        storage.setItem("multiwin","a");
        if (login){
            await sleep(300);
            console.log(command.session)
            lightdm.start_session(command.session);
            console.log("Session started")
        }
    }
}