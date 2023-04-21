class commands{
    constructor(session){
        this.session_data = [];
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
                        this.session_data[0] = defaults["usrs"];
                    }else{
                        this.return("Error: " + langs[defaults["lngs"]]["inv_usr"],false);
                        fetch.onerror();
                        break
                    }
                }else{
                    this.session_data[0] = defaults["usrs"];
                }
                if (args[1] != null){
                    if (fetch.check(lightdm.sessions,"key",args[1])){
                        this.session_data = args[1];
                    }else{
                        this.return("Error: " + langs[defaults["lngs"]]["inv_ssn"],false);
                        fetch.onerror();
                        break
                    }
                }else{
                    this.session_data[1] = defaults["ssns"];
                }
                fetch.login();
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
                menu.power("shutdown");
                break;
            case "restart":
            case "reboot":
                menu.power("restart");
                break;
            case "sleep":
            case "suspend":
                menu.power("suspend");
                break;
            case "hibernate":
                menu.power("hibernate");
                break
            case "su":
            case "user":
                if(args[0] == defaults["usrs"]){
                    this.return("lightdm: error: " + args[0] + langs[defaults["lngs"]]["curr_usr"],false)
                }else if (fetch.check(lightdm.users,"username",args[0])){
                    menu.select(document.querySelector("[data-function='usr-"+ args[0] +"']"))
                }else{
                    this.return("lightdm:" + langs[defaults["lngs"]]["inv_usr"],false)
                }
                break;
            case "session":
                if(args[0] == defaults["ssns"]){
                    this.return("lightdm: error: " + args[0] + langs[defaults["lngs"]]["curr_ssn"],false)
                }
                else if(fetch.check(lightdm.sessions,"key",args[0])){
                    menu.select(document.querySelector("[data-function='ssn-"+ args[0] +"']"))
                }else{
                    this.return("lightdm:" + langs[defaults["lngs"]]["inv_ssn"],false)
                }
                break;
            case "sessions":
                this.return(langs[defaults["lngs"]]["avl_ssn"]);
                loopthru(lightdm.sessions,"key");
                break;
            case "users":
                this.return(langs[defaults["lngs"]]["avl_usr"]);
                loopthru(lightdm.users,"username");
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
                    this.return("date: " + langs[defaults["lngs"]]["inv_arg"],false)
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
            case "man"://TODO create man
                this.return(cmd + ": error: " + langs[defaults["lngs"]]["inv_perm"],false)
                break;
            case "find":
            case "grep":
            case "ip":
                this.return(cmd + ": error: " + langs[defaults["lngs"]]["cmd_dis"],false)
                break;
            case "":
                break;
            default:
                this.return("bash: " + langs[defaults["lngs"]]["unk_cmd"] + cmd ,false)
        }
    }
    return(value,prompt=true){
        if (prompt){
            stdout.innerHTML += "<p>" + iprompt + value + "</p>";
        }else{
            stdout.innerHTML += "<p>" + value + "</p>";
        }
    }
}
