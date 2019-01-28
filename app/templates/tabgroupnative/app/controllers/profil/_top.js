/**
 * @class Controller.profil._top
 * Display top profil view
 *
 */

/**
 * @method Controller
 * Display top profil view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

})($.args);


/**
 * getHeight - description
 *
 * @return {type}  description
 */
function getHeight(e){

  var height = e.source.rect.height;
  var radius = height/2;

  $.photo.width = height;
  $.photo.borderRadius = radius;

}

/**
 * selectPhoto - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function selectPhoto(e){
  $.trigger("openMedia", e);
}
