/**
 * @class Controller.partials._menu
 * Display menu view
 *
 */
 var currentTab = null;
 var objTab = {};

(function constructor(args){

  _.each(args.menu, function(m){
    objTab[m.controller] = Alloy.createController('/partials/_tab', m);
    $.menu.add(objTab[m.controller].getView());

    if(m.id === args.currentController){
      objTab[m.controller].enable();
    }
  });

})($.args);

function handleClick(e){

  var s = e.source,
    type = s.type;

  if(type === "menu" || type === "view"){
    $.trigger('click', {
      controller : s.controller,
      type : type,
      id : s.idMenu,
      submenu : true
    });

    if(type === 'menu'){

      if(currentTab){
        if(objTab[currentTab]){
          objTab[currentTab].disable();
        }
      }
      currentTab = s.controller;
      if(objTab[s.controller]){
        objTab[s.controller].enable();
      }

    }

  }

}
