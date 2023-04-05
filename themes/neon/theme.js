var classTheme = class{
    constructor(){
        this.id="neon";
      }
    async start(){
        await sleep(200);
        cover.style.opacity = 0;
        cover.style.display = "none";
    }
    async loadsession(login=true){
        if (login){
            await sleep(300);
            console.log(command.session)
            lightdm.start_session(command.session);
            console.log("Session started")
        }else{
            cover.style.display = "block";
            cover.style.opacity = "1";
            storage.setItem("multiwin","a");
        }
    }
}