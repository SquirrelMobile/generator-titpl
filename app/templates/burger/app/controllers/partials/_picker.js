var args = $.args;
var value = null;
$.title.text = args.title || "";
if (args.type) {
  $.picker.type = args.type;
}
if (args.data) {
  var data = [];
  var column1 = Ti.UI.createPickerColumn({
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
  });
  _.each(args.data, function(ev, index) {
    var title = args.noTrad ? ev.text : "picker." + ev.text;
    var titleComplete = args.noTrad ? title : L(title);
    var properties = _.extend(ev, {
      title: titleComplete,
      val: ev.text,
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    column1.addRow(Ti.UI.createPickerRow(properties));
    if (index === 0) {
      setTimeout(function() {
        handleChange({
          selectedValue: [L(titleComplete)],
          row: { val: ev.text }
        });
      }, 500);
    }
  });
  $.picker.add([column1]);
}

function handleClick(e) {
  if (OS_IOS) {
    $.view.animate(
      {
        bottom: "-30%",
        duration: 150
      },
      function() {
        $.win.close({ animated: true });
      }
    );
  } else {
    $.view.animate(
      {
        bottom: "-30%",
        duration: 150
      },
      function() {
        $.win.close({
          activityEnterAnimation: Ti.Android.R.anim.fade_out
        });
      }
    );
  }
}

function handleChange(e) {
  Alloy.Globals.log.info("handleChange", JSON.stringify(e));
  value = _.extend(e.row, {
    val: e.row.val,
    value: e.selectedValue[0]
  });
  // $.trigger("click",value);
}

function handleOpen(e) {
  setTimeout(function() {
    $.view.animate({
      bottom: 0,
      duration: 150
    });
  }, 150);
}

function valid(e) {
  Alloy.Globals.log.info("valid", JSON.stringify(value));
  $.trigger("click", value);
  handleClick();
}

function cancel(e) {
  handleClick();
}
