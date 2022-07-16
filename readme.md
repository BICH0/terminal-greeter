<h1>Index</h1>
<ul>
  <li>Introduction</li>
  <li>Installation</li>
  <li>Themes</li>
</ul>
<h1 id="introduction">Introduction</h1>
<p>Terminal-greeter is a theme for the lightdm <a href="">webkit-greeter</a> api that makes your login screen look like a terminal, with commands and fully working login process, it can store preferred session, user and layout.</p>
<h1>Installation</h1>
  <p>First you have to download the <i><a>latest release</a></i> from releases or via command line:</p>
  <ul>
    <li><b>Wget:</b> <code>wget </code></li>
    <li><b>Curl:</b> <code>wget </code></li>
  </ul>
  <p>Next you have to decompress the files for that use the following command:</p>
  <code>tar -xzf terminal-greeter_v&lt;here goes the version&gt;.tar.gz</code></br></br>
  <p>If you want to install it automatically you can execute <i><b>installer.sh</b></i> or if you want to install it manually keep reading</p>
  <h2>Manual installation</h2>
  <p>To install it manually you have to move the generated folder to</p>
  <code>/usr/share/lightdm/webkit-greeter/themes/</code></br></br>
  <p>You'll need to manually set your OS to do this edit the <i><b>settings.js</b></i></br>And configure all the <a href="#settings">settings</a></p>
<h1>Settings</h1>
  <p>First of all we have the themes, that change how the terminal is displayed, changing animations, effects and modules. Each theme can be modified with the palette.css file in its respective folder</p>
  <h3>Theme</h3>
  <p>This option sets how the terminal is "displayed", there are 3 options available. <br/>Each one has it's own options and customization.</p>
  <ul>
    <li>
      <h4>Single</h4>
      <p>This theme contains a single window that acts as the terminal.</p>
      <h6>Settings and modules</h6>
      <ul>
        <li><b>glow:</b> true/false | Defines if the terminal window glows or not</li>
      </ul>
    </li>
    <li>
      <h4>Multiple</h4>
      <p>This theme has one main window that acts as a terminal an a number of terminals that can be defined with a custom message to display in each one</p>
      <h6>Settings and modules</h6>
      <ul>
        <li><b>os:</b> This option auto-selects the ascii art shown in the terminal loading animation</li>
        <li><b>ascii:</b> Optional, can change the ascii manually to another os ascii art</li>
        <li><b>mock_message:</b> Message shown in the mock windows.</li>
        <li><b>window_n:</b>Number of mock windows that will be generated, value can be between 0 and 8 (it can be more but won't be visible)</li>
      </ul>
    </li>
    <li>
      <h4>Tilling</h4>
      <p>This theme simulates a tilling enviorment, you can add multiple modules to new terminal windows that will be created on the right half of the screen</p>
      <h6>Settings and modules</h6>
      <ul>
        <li>
          Settings
          <ul>
            <li><b>collapse:</b> true/false | You can decide to leave space between the windows or not.</li>
            <li><b>tilling_margin:</b> Distance between the windows in case collapse is set to false, can use dynamic units like % or vw.</li>
            <li><b>headers:</b> true/false | Whether or not to show the headers of the terminal windows.</li>
            <li><b>screen_plugins:</b> Contains the plugins that will be shown in the new terminal window instances, the order of the plugins goes from top to bottom and can be repeated, its not recommended to have more than 2/3 plugins.</li>
          </ul>
        </li>
        <li>
          Modules
          <ul>
            <li>
              <b>Cowsay</b><br/>
              Shows a cowsay like utility with a custom message.<br/>
              <img>
              <b><i>Settings</i></b>
              <ul>
                <li><b>message:</b> Sets the message that will be displayed.</li>
                <li><b>character:</b> Sets the character that will be shown, you can choose between tux and cow.</li>
              </ul>
            </li>
            <li>
              <b>Hardware</b><br/>
              Shows a simulation of a system usage utility, the only real thing shown are the number of logical cores.<br/>
              <img>
              <b><i>Settings</i></b>
              <ul>
                <li><b>small_window:</b> true/false | Whether or not to show a small screen with a computer ascii art.</li>
              </ul>
            </li>
            <li>
              <b>Matrix</b><br/>
              The matrix effect with the accent color as the font color.<br/>
              <img>
            </li>
            <li>
              <b>Os</b><br/>
              Prints the os or ascii art.<br/>
              <img>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
<h1 id="themes">Themes</h1>
<h2>Tilling</h2>
<h3>Cyan</h3>
<code><pre>
--text: cyan;
--terminal: rgba(0, 0, 0, 0.93);
--accent: cyan;
--light-accent: #6beeea;
--stdout: white;
--header: rgb(24, 24, 24);
--shadow: rgba(0, 0, 0, 0.43);
</pre></code>
<h2>Single</h2>
<h3>Green</h3>
<code><pre>
--text: white;
--terminal: rgba(30, 34, 41, 0.93);
--accent: #0dff00;
--light-accent: #7cf784;
--stdout: white;
--header: rgb(60, 62, 74);
--glow: rgba(51, 255, 0, 0.51);
--shadow: rgba(0, 0, 0, 0.43);
</pre></code>
