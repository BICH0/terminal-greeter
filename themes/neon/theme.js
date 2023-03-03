class theme_obj{
    async start(){
        terminal.style.transform = "ScaleY(0)";
        await sleep(200);
        cover.style.opacity = 0;
        await sleep(300);
//        this.neon();
        cover.style.display = "none";
        terminal.style.transform = "ScaleY(1)";
        // term.style.transform = "";
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