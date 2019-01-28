// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var tabgroup = null;

(function constructor(args){

  $.container.add(Alloy.createController(args.controller).getView());
  tabgroup = Alloy.createController("/partials/_tabgroup", { tabActive : args.id });
  tabgroup.on('select', changeTab);
  $.footer.add(tabgroup.getView());

})(args);

function changeTab(e){

  $.trigger('select', e);

}
