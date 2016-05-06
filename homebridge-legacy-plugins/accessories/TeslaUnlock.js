var types = require("../api").homebridge.hapLegacyTypes;
var tesla = require("teslams");

function TeslaAccessory(log, config) {
    this.log = log;
    this.name = config["name"];
    this.username = config["username"];
    this.password = config["password"];
}

TeslaAccessory.prototype = {

    setPowerState: function(powerOn) {
        var that = this;

        tesla.get_vid({email: this.username, password: this.password}, function(vehicle) {
            /*
            var ROOF_CLOSE   = 0;
            var ROOF_VENT    = 1;
            var ROOF_COMFORT = 2;
            var ROOF_OPEN    = 3;
            */

            if (powerOn) {
                tesla.door_lock({id:vehicle, lock: 1}, function(response) {
                    if (response.result)
                        that.log("Starting to Locking Car.");
                    else
                        that.log("Error Locking Car: " + response.reason);
                });
            }
            else {
                tesla.door_lock({id:vehicle, lock: 0}, function(response) {
                    if (response.result)
                        that.log("Starting to Unlock Car.");
                    else
                        that.log("Error Unlocking Car: " + response.reason);
                });
            }
        })
    },

    getServices: function() {
        var that = this;
        return [{
            sType: types.ACCESSORY_INFORMATION_STYPE,
            characteristics: [{
                cType: types.NAME_CTYPE,
                onUpdate: null,
                perms: ["pr"],
                format: "string",
                initialValue: this.name,
                supportEvents: false,
                supportBonjour: false,
                manfDescription: "Name of the accessory",
                designedMaxLength: 255
            },{
                cType: types.MANUFACTURER_CTYPE,
                onUpdate: null,
                perms: ["pr"],
                format: "string",
                initialValue: "Tesla",
                supportEvents: false,
                supportBonjour: false,
                manfDescription: "Manufacturer",
                designedMaxLength: 255
            },{
                cType: types.MODEL_CTYPE,
                onUpdate: null,
                perms: ["pr"],
                format: "string",
                initialValue: "Rev-1",
                supportEvents: false,
                supportBonjour: false,
                manfDescription: "Model",
                designedMaxLength: 255
            },{
                cType: types.SERIAL_NUMBER_CTYPE,
                onUpdate: null,
                perms: ["pr"],
                format: "string",
                initialValue: "A1S2NA45345SF88EW",
                supportEvents: false,
                supportBonjour: false,
                manfDescription: "SN",
                designedMaxLength: 255
            },{
                cType: types.IDENTIFY_CTYPE,
                onUpdate: null,
                perms: ["pw"],
                format: "bool",
                initialValue: false,
                supportEvents: false,
                supportBonjour: false,
                manfDescription: "Identify Accessory",
                designedMaxLength: 1
            }]
        },{
            sType: types.LOCK_MECHANISM_STYPE,
            characteristics: [{
                cType: types.NAME_CTYPE,
                onUpdate: null,
                perms: ["pr"],
                format: "string",
                initialValue: this.name,
                supportEvents: false,
                supportBonjour: false,
                manfDescription: "Name of service",
                designedMaxLength: 255
            },{
                cType: types.CURRENT_LOCK_MECHANISM_STATE_CTYPE,
                onUpdate: function(value) { that.setPowerState(value); },
                perms: ["pr","ev"],
                		format: "int",
                		initialValue: 0,
                		supportEvents: false,
                		supportBonjour: false,
                		manfDescription: "BlaBla",
                		designedMinValue: 0,
                		designedMaxValue: 3,
                		designedMinStep: 1,
                		designedMaxLength: 1
              },{
              	cType: types.TARGET_LOCK_MECHANISM_STATE_CTYPE,
              	onUpdate: function(value) {
                      console.log(that.name + "...changing status....");
                      that.setPowerState(value);
                       },
              	perms: ["pr","pw","ev"],
          		format: "int",
          		initialValue: 0,
          		supportEvents: false,
          		supportBonjour: false,
          		manfDescription: "BlaBla",
          		designedMinValue: 0,
          		designedMaxValue: 1,
          		designedMinStep: 1,
          		designedMaxLength: 1
            }]
        }];
    }
};

module.exports.accessory = TeslaAccessory;
