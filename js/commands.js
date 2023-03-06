class commands{
    constructor(session){
        this.session;
    }
    async handle(value){
        this.return(value);
        let args =  value.split(" ");
        let cmd = args.shift();
        function loopthru(array, field){
            let narray = [];
            let i = 1;
                array.forEach(item => {
                    narray.push(item[field])
                    if(narray.length >= 3 || array.length == i){
                        command.return(narray.join(" "),false)
                        narray = [];
                    }
                    i++
                });
        }
        switch(cmd){
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
            case "systemd":
            case "init":
                args[0] = parseInt(args[0]);
                switch(args[0]){
                    case 3:
                    case 4:
                    case 13:
                    case 14:
                        lightdm.shutdown()
                        break;
                    case 5:
                    case 6:
                    case 15:
                    case 16:
                        lightdm.restart()
                        break;
                }
                break;
            case "halt":
            case "shutdown":
            case "poweroff":
                let time=0;
                if (/^\+.*/.test(args[0])){
                    time = args[0].slice(1,);
                }
                await sleep(time);
                lightdm.shutdown();
                break;
            case "su":
            case "user":
                if(args[0] == defaults["usrs"]){
                    this.return("lightdm: error: " + args[0] + " is the current user",false)//TODO traducir
                }else if (fetch.check(lightdm.users,"username",args[0])){
                    menu.select(document.querySelector("[data-function='usr-"+ args[0] +"']"))
                }else{
                    this.return("lightdm:",false)//TODO traducir
                }
                break;
            case "session":
                if(args[0] == defaults["ssns"]){
                    this.return("lightdm: error: " + args[0] + " is the current session",false)//TODO traducir
                }
                else if(fetch.check(lightdm.sessions,"key",args[0])){
                    menu.select(document.querySelector("[data-function='ssn-"+ args[0] +"']"))
                }else{
                    this.return("lightdm:",false)//TODO traducir
                }
                break;
            case "sessions":
                loopthru(lightdm.sessions,"key")
                break;
            case "users":
                this.return()//TODO texto: Avaliable
                loopthru(lightdm.users,"username")
                break;
            case "whoami":
                this.return(defaults["usrs"],false);
                break;
            case "hostname":
                this.return(defaults["ssns"],false);
                break;
            case "clear":
                stdout.innerHTML = "";
                break;
            case "date":
                let date = new Date;
                let fdate = date;
                args = args.join(" ");
                if (/^\+/.test(args)){
                    fdate = "";
                    let param = false;
                    args = args.replaceAll("\"","");
                    for (let x=1; x<args.length; x++){
                        if (args[x] == "%"){
                            param = true;
                        }else{
                            if (param){
                                param = false;
                                switch(args[x]){
                                    case "F":
                                        fdate += date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate();
                                    break;
                                    case "C":
                                        fdate += date.getFullYear().toString().slice(2,);
                                    break;
                                    case "N":
                                        fdate += date.getMilliseconds() * 1000000;
                                    break;
                                    case "M":
                                        fdate += date.getMinutes();
                                    break;
                                    case "H":
                                        fdate += date.getHours();
                                    break;
                                    case "d":
                                        fdate += date.getHours();
                                    break;
                                    case "m":
                                        fdate += date.getMonth() + 1; 
                                    break;
                                    case "n":
                                        fdate += "</br>";
                                    break;
                                }
                            }
                            else{
                                fdate += args[x];
                            }
                        }
                        console.log(args[x])
                    }
                }else if (args != ""){
                    this.return("date: ",false)//Traducir
                    return;
                }else{
                    fdate = fdate.toString().split("(")[0];
                }
                this.return(fdate, false);
                break;
            case "echo":
                this.return(args.join(" ").replaceAll("\"",""),false);
            break;
            case "rm":
            case "rmdir":
            case "mkdir":
            case "touch":
            case "cat":
            case "cd":
            case "cp":
            case "ls":
                this.return(cmd + ": error: Permission denied.",false)//TODO Traducir
                break;
            case "find":
            case "grep":
            case "ip":
                this.return(cmd + ": error: Command disabled by System Administrator.",false)//TODO Traducir
                break;
            case "":
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
