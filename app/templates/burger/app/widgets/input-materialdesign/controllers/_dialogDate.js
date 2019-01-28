/**
 * @class Controller.partials._list
 * Display list view
 *
 */
/**
 * @method Controller
 * Display list view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  $.picker.value = new Date();

  if (args.date) {
    if (args.date.isValid()) {
      $.picker.value = args.date.toDate();
    }
  }

})($.args);

function valid(e){
  $.trigger("date",$.picker.getValue());
}

function close(e){
  if (OS_IOS) {
    $.win.close({animated:true});
  }
  else {
    $.win.close({
      activityEnterAnimation: Ti.Android.R.anim.fade_out,
    });
  }
}
