class commands{
    constructor(session){
        this.session;
    }
    handle(value){
        this.return(value);
        let args =  value.split(" ");
        let command = args.shift();
        switch(command){
            case "login":
                if (! fetch.check(lightdm.users,"username",args[0])){
                    args[0] = defaults["usrs"];
                }
                if (! fetch.check(lightdm.sessions,"key",args[1])){
                    console.log("if")
                    this.session = args[1];
                }else{
                    console.log("else")
                    this.session = defaults["ssns"];
                }
                console.log("Login attempt to " + args[1] + " by " + args[0])
                lightdm.cancel_authentication();
                console.log("Starting login of: " + args[0] + " with status " + lightdm.in_authentication)
                lightdm.authenticate(args[0]);
                fetch.in_authentication = true;
                fetch.password("pre");
                break;
            case "reset_colors":
                fetch.colors_array = "";
                fetch.colors(true,true);
        }
        this.return(command + "  " + args)
    }
    return(value){
        stdout.innerHTML += "<p>" + value + "<p/>";
    }
}