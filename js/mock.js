try {
  lightdm.in_authentication
} catch (e){
  console.log('BROWSER MODE')
  class user{
    constructor(name){
      this.name = name;
    }
  };
  class session{
    constructor(name){
      this.key = name;
    }
  };

  class lightdm_class {
    constructor() {
      this.is_authenticated = false;
      this.in_authentication = false;
      this.can_restart = false;
      this.can_suspend = false;
      this.can_shutdown = false;
      this.users = [];
      this.sessions = [];
      this.layouts = [];
    };
    cancel_autologin(){
      return;
    };
    authenticate(){
      this.is_authenticated = true;
      window.show_prompt();
    };
    respond(){
      this.is_authenticated = true;
      window.authentication_complete();
    };
    start_session_sync(){
      window.newline("You're now logged in!!");
    };
  };
  let lightdm = new lightdm_class();
  for (i=0; i<3; i++){
    lightdm.users.push(new user("user"+i));
  };
  for (i=0; i<3; i++){
    lightdm.sessions.push(new session("session"+i));
  };
  for (i=0; i<3; i++){
    lightdm.layouts.push(new user("layout"+i));
  };
  var default_session = lightdm.sessions[0].key;
  var default_user = lightdm.users[0].name;
  window.lightdm = lightdm
};
