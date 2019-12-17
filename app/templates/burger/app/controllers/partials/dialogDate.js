/**
 * @class Controller.partials._list
 * Display list view
 *
 */

var picker = Ti.UI.createPicker({
  top: 10,
  type: Ti.UI.PICKER_TYPE_DATE
  // maxDate : Alloy.Globals.moment().subtract(18,"years").toDate()
  // value : new Date(),
});

/**
 * @method Controller
 * Display list view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
  $.pickerContent.add(picker);
  if (args.title) {
    $.title.text = args.title;
  }
  if (args.date) {
    if (args.date.isValid()) {
      picker.value = args.date.toDate();
    }
  }
  if (!args.persistent) {
    $.win.addEventListener("click", close);
  } else {
    if (OS_ANDROID) {
      $.win.addEventListener("androidback", function() {});
    }
  }
})($.args);

function valid(e) {
  $.trigger("date", picker.getValue());
  close();
}

function handleOpen(e) {
  var matrix = Ti.UI.create2DMatrix();
  var matrix1 = matrix.scale(0.1, 0.1);
  var matrix2 = matrix.scale(1, 1);
  var matrix3 = matrix.scale(1.12, 1.1);
  $.main.transform = matrix1;
  setTimeout(function() {
    $.main.animate(
      { transform: matrix3, opacity: 1.2, duration: 150 },
      function() {
        matrix = matrix.scale(1, 1);
        $.main.animate(
          { transform: matrix2, opacity: 1, duration: 200 },
          function() {
            $.main.opacity = 1;
            $.main.transform = matrix;
            ($.main.height = Ti.UI.SIZE), ($.main.width = Ti.UI.FILL);
          }
        );
      }
    );
  }, 0);
}

function close() {
  var matrix = Ti.UI.create2DMatrix();
  var matrix1 = matrix.scale(0.1, 0.1);
  var matrix3 = matrix.scale(1.12, 1.1);
  setTimeout(function() {
    $.main.animate(
      { transform: matrix3, opacity: 1.2, duration: 150 },
      function() {
        $.main.animate(
          { transform: matrix1, opacity: 1, duration: 100 },
          function() {
            if (OS_IOS) {
              $.win.close();
            } else {
              $.win.close({
                activityEnterAnimation: Ti.Android.R.anim.fade_out
              });
            }
          }
        );
      }
    );
  }, 100);
}
$.close = close;
