class theme_obj{
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
            console.log(command.session)
            lightdm.start_session(command.session);
            console.log("Session started")
        }
    }
}
var theme = new theme_obj();