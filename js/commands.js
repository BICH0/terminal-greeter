class commands{
    constructor(session){
        this.session;
    }
    async handle(value){
        this.return(value);
        let args =  value.split(" ");
        let command = args.shift();
        switch(command){
            case "login":
                if (args[0] != null){
                    if (fetch.check(lightdm.users,"username",args[0])){
                        args[0] = defaults["usrs"];
                    }else{
                        this.return("Error: " + langs[defaults["lngs"]]["inv_usrs"],false);
                        fetch.onerror();
                        break
                    }
                }else{
                    args[0] = defaults["usrs"];
                }
                if (args[1] != null){
                    console.log("if")
                    if (fetch.check(lightdm.sessions,"key",args[1])){
                        this.session = args[1];
                    }else{
                        this.return("Error: " + langs[defaults["lngs"]]["inv_ssns"],false);
                        fetch.onerror();
                        break
                    }
                }else{
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
                break;
            case "shutdown":
            case "poweroff":
                console.log(args)
                let time=0;
                if (/^\+.*/.test(args[0])){
                    time = args[0].slice(1,);
                }
                await sleep(time);
                lightdm.shutdown();
                break;//TODO SUSPEND O LO QUE SEA QUE FALTA
            case "whoami":
                this.return(defaults["usrs"]);
                break;
            case "hostname":
                this.return(defaults["ssns"]);
                break;
            case "date":
                this.return()
                break;
            default:
                this.return(langs[defaults["lngs"]]["unk_cmm"],false)
        }
    }
    return(value,prompt=true){
        if (prompt){
            stdout.innerHTML += "<p>" + iprompt + value + "<p/>";
        }else{
            stdout.innerHTML += "<p>" + value + "<p/>";
        }
    }
}
