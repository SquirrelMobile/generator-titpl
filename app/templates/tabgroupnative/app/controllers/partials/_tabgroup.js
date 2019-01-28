/**
 * @class Controller.partials._tabgroup
 * Display tabgroup bottom view
 *
 */
var objTab = {};

(function constructor(args){

  load(Alloy.Globals.tabmenu);

 })($.args);

function handleClick(e){

  $.trigger("select",e);

}

function setActive(idMenu){

  console.log("setActive  " + idMenu);
  objTab[idMenu].enable();

}

$.setActive = setActive;

function load(menu){

   _.each(menu, function(m){

     objTab[m.id] = Alloy.createController('/partials/_tab', m);
     $.tabgroup.add(objTab[m.id].getView());

   });

  if($.args.tabActive) {
    setActive($.args.tabActive);
  }

}
