/**
 * @class Controller.partials._navbar
 * Create a _navbar
 */

 /**
  * @method Controller
  * Create a _navbar view
  * @param  {Object} args Arguments passed to the controller
  */
(function constructor(args){

})($.args);

var dispatcher = require('dispatcher');


/**
 * actions - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function actions(e){

  if(e.source.type === "Left" || e.source.type === "Right"){
    dispatcher.trigger('openMenu', { type : e.source.type });
  }else if(e.source.type === "home"){
    dispatcher.trigger('findRowMenu', { id : 'home' });
  }else{
    $.trigger('click', { type : e.source.type });
  }

}


/**
 * load - description
 *
 * @param  {type} conf description
 * @return {type}      description
 */
$.load = function(conf){

  if(conf.nav){
    $.nav.applyProperties(conf.nav);
    if(conf.nav.backgroundColor){
      $.container.backgroundColor = conf.nav.backgroundColor;
    }
  }

  if(conf.back){
    $.back.applyProperties(conf.back);
  }

  if(conf.burger){
    $.burger.applyProperties(conf.burger);
  }

  if(conf.close){
    $.close.applyProperties(conf.close);
  }

  if(conf.logo){
    $.logo.applyProperties(conf.logo);
  }

  if(conf.title){
    $.title.applyProperties(conf.title);
  }

};
