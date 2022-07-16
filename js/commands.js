async function command_check(){
  const input = cli_line.value;
  const command = cli_line.value.split(' ')[0];
  var arg1 = cli_line.value.split(' ')[1];
  var arg2 = cli_line.value.split(' ')[2];
  newline(input, 'command')
  if (command == ''){
    return;
  }
  switch (command) {
    case 'clear':
    case 'cls':
      clear_console();
      return;
    case 'help':
      newline("clear    man     history   session    sessions".replaceAll(" ", "\u00a0"));
      newline("user     users   layout    login".replaceAll(" ", "\u00a0"));
      newline("suspend  reboot  poweroff".replaceAll(" ", "\u00a0"));
      return;
    case 'man':
      switch (arg1){
        case undefined:
          command_output = "For example, try 'man man'.";
          newline("What manual page you want?");
          break;
        case 'clear':
        case 'cls':
          command_output = "clear - clear the terminal screen."
          break;
        case 'man':
          command_output = "man - an interface to the system reference manuals."
          break;
        case 'history':
          command_output = "history - GNU History Library."
          break;
        case 'session':
          command_output = "session - sets the default session."
          break;
        case 'sessions':
          command_output = "sessions - list all available sessions."
          break;
        case 'user':
          command_output = "user - sets the default user."
          break;
        case 'users':
          command_output = "users - list all available users."
          break;
        case 'layout':
          command_output = "sessions - sets the default layout."
          break;
        case 'login':
          command_output = "sessions - starts login event."
          break;
        case 'suspend':
          command_output = "sessions - suspends the computer if possible."
          break;
        case 'reboot':
          command_output = "sessions - reboots the computer if possible."
          break;
        case 'poweroff':
          command_output = "sessions - powers off the computer if possible."
          break;
      };
      break;
    case 'history':
      history.forEach(line => {
        newline(line);
      });
      return;
    case 'sessions':
      newline('Available sessions');
      lightdm.sessions.forEach(session => {
        newline(session.key);
      });
      return;
    case 'session':
      if (arg1 == null){
        newline("The default session is currently " + default_session);
        command_output = "Use session <name> to change it.";
      }
      else{
        arg1=input.slice(8)
        result = await contains_value(arg1 ,"key",lightdm.sessions);
        if (result){
          default_session = arg1;
          storage.setItem('session', arg1);
          generate_prompt(null,null,'regenerate')
          command_output = 'Session changed to ' + arg1;
        }
        else{
          newline("There is no session called " + arg1);
          command_output = "Use sessions to see all the available sessions.";
        };
      };
      break;
    case 'users':
      newline('Available users');
      lightdm.users.forEach(user => {
        newline(user.name);
      });
      return;
    case 'user':
      if (arg1 == null){
        newline("The default user is currently " + default_user);
        command_output = "Use user <name> to change it.";
      }
      else{
        arg1=input.slice(7)
        result = await contains_value(arg1,"name",lightdm.users);
        if (result){
          default_user = arg1;
          storage.setItem('user', arg1);
          generate_prompt(null,null,'regenerate')
          command_output = 'User changed to ' + arg1;
        }
        else{
          command_output = "There is no user called " + arg1 + "use users to see all the available users.";
        };
      };
      break;
    case 'layout':
      if (arg1 == null){
        newline("The default layout is currently " + default_layout);
        command_output="Use layout <layout> to change it.";
      }
      else{
        arg1=input.slice(7)
        result = await contains_value(arg1,"name",lightdm.layouts);
        if (result){
          default_layout = arg1;
          storage.setItem('layout', arg1);
          command_output = 'Layout changed to ' + arg1;
        }
        else{
          command_output = "There is no layout called " + arg1 + "use layouts to see all the available layouts.";
        };
      };
      break;
    case 'login':
      if (arg1 == null){
        arg1 = default_user;
      };
      if (arg2 == null){
        arg2 = default_session;
      };
      if (lightdm.in_authentication == 'True'){
        lightdm.cancel_authentication();
      };
      for (i=1; i<(prompt.childNodes.length -1); i++){
        prompt.childNodes[i].style.display = 'none';
      }
      login_data[1] = arg1;
      login_data[2] = arg2;
      lightdm.cancel_autologin();
      lightdm.authenticate(login_data[1]);
      return;
    case 'suspend':
      if (lightdm.can_suspend){
        lightdm.suspend();
        return;
      };
      command_output = 'Error machine cannot be suspended'
      break;
    case 'reboot':
      if (lightdm.can_restart){
        lightdm.restart();
        return;
      };
      command_output = 'Error machine cannot be restarted'
      break;
    case 'poweroff':
      if (lightdm.can_shutdown){
        lightdm.shutdown();
        return;
      };
      command_output = 'Error machine cannot be powered off'
      break;
    default:
      command_output = "Error command not found";
  }
  newline(command_output);
};
