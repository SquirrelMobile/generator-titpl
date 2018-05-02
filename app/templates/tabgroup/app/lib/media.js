/**
 * @class Lib.media
 * media lib
 */
(function(){

  var _exports = {

      /**
       * fixImage - description
       *
       * @param  {type} media description
       * @return {type}       description
       */
      fixImage : function(media) {

        if(OS_IOS){

          return media;

        }else{

          var tirotate = require('com.skypanther.tirotate');
          var t = new Date().getTime();
          var mime_type = media.mimeType; // Getting the file type.....
          var arr = Array();
          arr = mime_type.split('/');
          var image_type = arr[1];
          var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, t+'.'+image_type);
          file.write(media);

          var orientation = tirotate.getExifOrientation(file.nativePath);
          if (orientation === tirotate.ORIENTATION_NORMAL) {
            return media;
          }else{
            if (tirotate.rotate(file.nativePath, tirotate.PORTRAIT)) {
                return file.read();
            } else {
                return media;
            }
          }

        }
      },

      /**
       * success - description
       *
       * @param  {type} e        description
       * @param  {type} callback description
       * @return {type}          description
       */
      success : function(e, callback){

        var ImageFactory = require('ti.imagefactory');

        if (e.media) {

           var mime_type = e.media.mimeType; // Getting the file type.....
           var arr = Array();
           arr = mime_type.split('/');
           var image_type = arr[1];
           var image = _exports.fixImage(e.media);

          try{
            var imgCompress = ImageFactory.compress(image,0.3);
            callback(imgCompress, image_type);
          }catch(e){
            callback(image, image_type);
          }
        }

      },

      /**
       * openGallery - description
       *
       * @param  {type} callback description
       * @return {type}          description
       */
      openGallery : function(callback){

        var hasCameraPermissions = Ti.Media.hasCameraPermissions();
        var params = {
          mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
          success: function(e){
            _exports.success(e, callback);
          },
          cancel: function(){
            Ti.API.log('cancel');
          },
          error: function(e){
            Ti.API.error(JSON.stringify(e));
          }
        };

        if(hasCameraPermissions){

          Ti.Media.openPhotoGallery(params);

         }else{

          Ti.Media.requestCameraPermissions(function(e) {

            if(e.success){

              Ti.Media.openPhotoGallery(params);

            }

          });

        }

      },

      /**
       * takePhoto - description
       *
       * @param  {type} callback description
       * @return {type}          description
       */
      takePhoto : function(callback){

        var hasCameraPermissions = Ti.Media.hasCameraPermissions();

        var params = {
          success: function(e){
            _exports.success(e, callback);
          },
          cancel: function() {
            Ti.API.log('canceled');
          },
          error: function(e) {
            Ti.API.error(JSON.stringify(e));
          },
          saveToPhotoGallery: false,
          allowEditing: false,
          autohide: true,
          showControls: true,
          mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
        };

        if(hasCameraPermissions){

          Ti.Media.showCamera(params);

        }else{

          Ti.Media.requestCameraPermissions(function(e) {

            if(e.success){

              Ti.Media.showCamera(params);

            }

          });

        }
      },

      /**
       * saveFile - description
       *
       * @param  {type} o description
       * @return {type}   description
       */
      saveFile : function(o){

        var blob = o.blob,
            ext = o.ext;

        if(blob){

          var t = new Date().getTime();
          var image_type = ext;
          var name = t+"."+image_type;
          var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, name);
          file.write(blob);

          return name;

        }
      },

      /**
       * decompressionZip - description
       *
       * @param  {type} o description
       * @return {type}   description
       */
      decompressionZip : function(o){

        var zipname = o.zipname || '',
            success = o.success || function(){},
            directory = o.directory || Ti.Filesystem.applicationDataDirectory,
            destinationFolder = o.destinationFolder || Titanium.Filesystem.getApplicationDataDirectory()

        var Compression = require('ti.compression');
        var fileArchive = Titanium.Filesystem.getFile(directory, zipname);

        if(!fileArchive.exists()){

          Ti.UI.createAlertDialog({
            title : L('error'),
            message : L('errorMessageData')
          }).show();
          return false;

        }else{

          var result = Compression.unzip(destinationFolder, fileArchive.getNativePath() , true);

          _.defer(function(){
            if (result === "success") {
              if(success){
                success();
              }
            }else{
              Ti.UI.createAlertDialog({
                title : L('error'),
                message : L('errorMessageData')
              }).show();
            }
          });

        }
      }
  };

  module.exports = _exports;

})();
