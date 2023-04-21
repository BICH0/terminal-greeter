var classTheme = class{
    constructor(){
        this.id="single";
    }
    async start(){
        cover.style.opacity = 0;
        await sleep(300);
        cover.style.display = "none";
    }
    async loadsession(login=true){
        cover.style.display = "block";
        cover.style.opacity = "1";
        storage.setItem("multiwin","a");
        if (login){
            await sleep(300);
            lightdm.start_session(command.session_data[1]);
            console.log("Session started")
        }
    }
}