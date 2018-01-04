/**
 * @class Controller.partials._tabgroup
 * Display tabgroup bottom view
 *
 */
var rippleEffect = Alloy.createWidget('com.mp5systems.rippleeffect');
(function constructor(args){

  if(args.controller){
    $.tab.controller = args.controller;
  }

  if(args.image){
    $.img.applyProperties(args.image);
  }

  if(args.title){
    $.lblTab.text = args.title;
  }

  if(args.last){
    $.tab.left = -1;
  }

})($.args);

function handleClick(e){

  if(e.source.rippleEffect){
    rippleEffect.create(e);
  }

  $.trigger('click', e);

}
