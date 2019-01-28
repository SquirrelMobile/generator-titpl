/**
 * @class Controller.profil.profil
 * Display profil view
 *
 */

/**
 * @method Controller
 * Display profil view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  $.navbar.load({
    burger : {
      visible : true
    },
    title : {
      visible : true,
      color : 'black',
      text : L('account')
    }
  });

  $.paging.setScrollableView($.scrollableView);

  var photo = require('dao/variable').get('photo');

  if(photo){
    $.top.photo.image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, photo).read();
  }

})($.args);

/**
 * openDialogCamera - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function openDialogCamera(e){

  require('/media').openDialogCamera(function(photo,ext){
    $.top.photo.image = photo;
    var name  = require('/media').saveFile({
      blob : photo,
      ext : ext
    });
    require('dao/variable').set('photo', name);
  });

}
