class theme_obj{
    async start(){
        cover.style.opacity = 0;
        await sleep(300);
        cover.style.display = "none";
    }
    async loadsession(){
        cover.style.display = "block";
        cover.style.opacity = "1";
        await sleep(300);
        console.log(command.session)
        lightdm.start_session(command.session);
        console.log("Session started")
    }
}
var theme = new theme_obj();