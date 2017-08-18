/**
 * @class Lib.install
 * install lib
 */
(function(){

  var db = require('db');


  /**
   * var _exports - description
   *
   * @return {type}  description
   */
  var _exports = function(){

      var version = Ti.App.Properties.getInt('versionDatabase'),
          versionOrigine = version;

      if(!version){
          version = 0;
      }

      if(version < 1){

        Ti.App.Properties.setBool('isConnected', false);
        Ti.App.Properties.setBool('asCrash', false);

        db.execute('CREATE TABLE IF NOT EXISTS variable (id INTEGER PRIMARY KEY AUTOINCREMENT, key_ VARCHAR(255) NOT NULL, value TEXT NULL)');

        version = 1;

      }

      if(version > versionOrigine){
          Ti.App.Properties.setInt('versionDatabase', version);
      }

  };

  module.exports = _exports;

})();
