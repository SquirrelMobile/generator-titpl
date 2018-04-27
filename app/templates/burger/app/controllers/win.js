// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

(function constructor(args){

  var controller = Alloy.createController(args.controller, args);
  controller.on("back",function(){
    $.destroy();
    $.win.close();
  });
  $.win.add(controller.getView());

  if(args.navbar){
    $.navbar.load(args.navbar);
  }

})(args);


function actions(e){

  var type = e.type;

  switch (type) {
    case 'back':
      $.destroy();
      $.win.close();
    break;
    case 'home':
      $.win.close();
      Alloy.Globals.events.trigger("findRowMenu", { id : "home"});
    break;
    default:
    break;
  }

}

function clean(e){
  $.destroy();
}
