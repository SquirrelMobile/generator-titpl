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
      text : 'Profil'
    }
  });

  $.paging.setScrollableView($.scrollableView);

  var photo = require('dao/variable').get('photo');

  if(photo){
    $.top.photo.image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, photo);
  }

})($.args);


/**
 * openMedia - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function openMedia(e){

  var opts = {
    cancel: 2,
    options: ['Prendre une photo', 'Choisir une photo', 'Annuler'],
    title: 'Choisir une photo'
  };

  var dialog = Ti.UI.createOptionDialog(opts);
  dialog.addEventListener("click",choisirOption);
  dialog.show();

}


/**
 * choisirOption - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function choisirOption(e){

  if(e.index === 0)
  {
    require('media').takePhoto(function(photo,ext){
      $.top.photo.image = photo;
      var name  = require('media').saveFile({
        blob : photo,
        ext : ext
      });
      require('dao/variable').set('photo', name);
    });

  }
  else if(e.index === 1)
  {
    require('media').openGallery(function(photo,ext){
      $.top.photo.image = photo;
      var name  = require('media').saveFile({
        blob : photo,
        ext : ext
      });
      Ti.API.log('-- name ' +name);
      require('dao/variable').set('photo', name);
    });

  }
}
