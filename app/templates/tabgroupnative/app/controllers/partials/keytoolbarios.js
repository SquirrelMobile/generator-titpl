var args = arguments[0] || {};

(function constructor(args) {

  load(args);

})(arguments[0] || {});


function load(e){
  Ti.API.log("LOAD",e.hintText);
  if (e.previous) {
    $.previous.opacity = 1;
  }
  if (e.hintText) {
    $.hintext.title = e.hintText;
  }
  if (e.next) {
    $.next.opacity = 1;
  }
}
$.reload = load;

function closeKeyboard(e){
  $.trigger("close",e);
}

function next(e){
  $.trigger("next",e);
}

function previous(e){
  $.trigger("previous",e);
}
