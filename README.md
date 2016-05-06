STEPS TO ACTIVATE SIRI TO CONTROL TESLA


**XCODE MUST BE INSTALLED ON THE MAC BEFORE ANYTHING.
YOU CAN DOWNLOAD THE LATEST VERSION OF XCODE FROM THE MAC APP STORE**

**DOWNLOAD ATOM TEXT EDITOR TO EDIT ALL .json FILES at https://atom.io/download/mac DO NOT USE TEXT EDITOR ON THE MAC. IT WILL CORRUPT THE FILES**

**STEP ONE: Install Node.js + NPM**

1. Download Node Installer from **https://nodejs.org/dist/v6.1.0/node-v6.1.0.pkg**
2. Follow the steps to install Node

You should now have Node installed on your Mac. You can check by typing **node -v** in the Terminal Window.

Go to https://github.com/SamGabbay/tesla-siri-homekit

Download this file for later...
https://www.sendspace.com/file/49ldc9

**STEP TWO: Logging into Tesla API**

Now that NODE & NPM is installed on your Mac, you now have to enter your Tesla Username/Password into the **config.json** file in the main directory of the GitHub folder downloaded. You will need to replace every **USER_NAME** & **PASSWORD** with your Tesla Username & Password.

**STEP THREE: Entering Codes Into Terminal**

RUN THIS IN TERMINAL

1. **cd /PATH/OF/DOWNLOADED/GITHUB/FOLDER**
2. Add the folder from **https://www.sendspace.com/file/49ldc9** into the /homebridge-legacy-plugins folder.
3. **npm install**
4. **DEBUG=* ./bin/homebridge -D -P ./homebridge-legacy-plugins**

If all is successful, then you should see the following 031-45-154.

**STEP FOUR: Setting Up The Energi HomeKit Accessory**

To setup the Energi HomeKit Accessory that is currently being broadcasted from your Mac, you need to have an App that allows setup of HomeKit devices. This App worked for me.

https://itunes.apple.com/us/app/ezzi-home-control-for-homekit/id1039845950?mt=8
