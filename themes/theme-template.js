var classTheme = class{
    constructor(){
        this.id="thm-name";//Change it to your theme name
    }
    async start(){
        cover.style.opacity = 0;//You can append everything you want to hide while loading before this line
        await sleep(300);
        cover.style.display = "none";//From here everything you do is visible
    }
    async loadsession(login=true){
        cover.style.display = "block";
        cover.style.opacity = "1";//Everything after this line is hidden for the user
        storage.setItem("multiwin","a");//This is to sync multiple monitors
        if (login){
            await sleep(300);//Wait for the exit animation
            console.log(command.session);
            lightdm.start_session(command.session);//Everything after this line will not be executed unless working on a debug enviorment
            console.log("Session started");
        }
    }
}