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

  getHeight();

})($.args);


/**
 * getHeight - description
 *
 * @return {type}  description
 */
function getHeight(){

  var height = $.grpView.getRect().height;
  var radius = height/2;

  $.radius.width = height;
  $.radius.borderRadius = radius;

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
