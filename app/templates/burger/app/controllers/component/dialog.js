var args = $.args;
var loader = null;

if (args.title) {
  $.title.text = args.title;
}

if (args.message) {
  $.desc.applyProperties(args.message);
}

if (args.image) {
  $.imageTitle.add(Ti.UI.createImageView(args.image));
}

if (args.loader) {
  loader = require("ti.animation").createAnimationView({
    height: 100,
    width: 100,
    zIndex: 99,
    visible: true,
    loop: true,
    autoStart: true,
    file: "animLoader.json"
  });

  $.imageTitle.add(loader);
}

$.stopLoader = function() {
  if (loader) {
    loader.stop();
  }
};

$.playLoader = function() {
  if (loader) {
    loader.start();
  }
};

if (args.buttons) {
  _.each(args.buttons, function(btn) {
    $.btnView.add(btn);
  });
}

function handleOpen(e) {
  if (loader) {
    setTimeout(function() {
      loader.start();
    }, 50);
  }
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

function closeWin() {
  var matrix = Ti.UI.create2DMatrix();
  var matrix1 = matrix.scale(0.1, 0.1);
  var matrix3 = matrix.scale(1.12, 1.1);
  setTimeout(function() {
    $.main.animate(
      { transform: matrix3, opacity: 1.2, duration: 150 },
      function() {
        $.main.animate(
          { transform: matrix1, opacity: 1, duration: 200 },
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
$.closeWin = closeWin;
if (OS_ANDROID) {
  $.win.addEventListener("androidback", function() {});
}
function handleTouch(e) {
  if (
    OS_ANDROID &&
    e.source.apiName !== "Ti.UI.TextField" &&
    e.source.apiName !== "Ti.UI.TextArea"
  ) {
    Ti.UI.Android.hideSoftKeyboard();
  }
}
