var classTheme = class{
    constructor(){
        this.id="neon";
      }
    async start(){
        cover.style.opacity = 0;
        await sleep(200);
        cover.style.display = "none";
    }
    async loadsession(login=true){
        if (login){
            cover.style.opacity = 1;
            await sleep(300);
            lightdm.start_session(command.session_data[1]);
            console.log("Session started")
        }
    }
}