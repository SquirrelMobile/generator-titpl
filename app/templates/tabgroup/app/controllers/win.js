// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var controller = null;

(function constructor(args){

  controller = Alloy.createController(args.controller, args);
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
    case 'action':
      if (_.isFunction(controller.submit)) {
        controller.submit();
      }
    case 'home':
      $.win.close();
    break;
    default:
    break;
  }

}
