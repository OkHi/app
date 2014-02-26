cordova.define("cordova/plugin/telephonenumber",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var TelephoneNumber = function () {};
 
    var TelephoneNumberError = function(code, message) {
        this.code = code || null;
        this.message = message || '';
    };
 
    TelephoneNumber.NO_TELEPHONE_NUMBER = 0;
 
    TelephoneNumber.prototype.get = function(success,fail) {
        var errorCallback = typeof fail !== 'function' ? null : function(code) {
            fail({"code": code});
        };
        exec(success,errorCallback,"TelephoneNumber", "get",[]);
    };
 
    var telephoneNumber = new TelephoneNumber();
    module.exports = telephoneNumber;
});