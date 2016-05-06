var path = require('path');
var api = require('./api')
var fs = require('fs');

module.exports = function(homebridge) {

  // make the homebridge API object available to accessories and platforms that weren't
  // designed with it in mind
  api.homebridge = homebridge;

  // load up all legacy accessories
  var accessoriesDir = path.join(__dirname, "accessories");

  fs.readdirSync(accessoriesDir).forEach(function(file) {
    if (file.indexOf(".js") > 0) {
      var name = file.replace(".js","");
      homebridge.registerAccessory("homebridge-legacy-plugins", name, function(logger, config) {
        console.log("Loading legacy accessory " + name);
        
        var accessoryModule = require(path.join(accessoriesDir, file));
        return new accessoryModule.accessory(logger, config);
      });
    }
  });
  
  // load up all legacy platforms
  var platformsDir = path.join(__dirname, "platforms");

  fs.readdirSync(platformsDir).forEach(function(file) {
    if (file.indexOf(".js") > 0) {
      var name = file.replace(".js","");
      homebridge.registerPlatform("homebridge-legacy-plugins", name, function(logger, config) {
        console.log("Loading legacy platform " + name);
        
        var platformModule = require(path.join(platformsDir, file));
        return new platformModule.platform(logger, config);
      });
    }
  });
}
