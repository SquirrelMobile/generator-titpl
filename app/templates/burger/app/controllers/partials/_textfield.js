var args = $.args;
$.textfield.applyProperties(
  _.omit(args, "__parentSymbol", "__itemTemplate", "$model", "top")
);
$.textfield.fireEvent(
  "reload",
  _.omit(args, "__parentSymbol", "__itemTemplate", "$model", "top")
);
var picker = null;
var currentChoice = null;

if (args.textfield) {
  $.textfield.applyProperties(args.textfield);
}
if (args.container) {
  $.container2.applyProperties(args.container);
}
if (args.separator) {
  $.separator.applyProperties(args.separator);
}
if (args.imageLeft) {
  $.imageLeft.applyProperties(args.imageLeft);
  $.textfield.left = 34;
  $.imageLeft.visible = true;
}

if (args.lblRight) {
  $.lblRight.applyProperties(args.lblRight);
  $.lblRight.addEventListener("click", function() {
    $.trigger("clickLblRight");
  });
  $.textfield.right = 34;
  $.lblRight.visible = true;
}

if (args.required) {
  $.textfield.hintText = args.hintText ? args.hintText + " *" : "";
}

if (args.imageRight) {
  $.imageRight.applyProperties(args.imageRight);
  $.textfield.right = 34;
  $.imageRight.visible = true;
}

if (args.isDate) {
  $.container.addEventListener("click", handleDate);
  if (OS_ANDROID) {
    $.container2.add(
      $.UI.create("View", {
        touchFeedback: true,
        touchFeedbackColor: "#EEEEEE"
      })
    );
  }
  $.textfield.touchEnabled = false;
  $.textfield.editable = false;
} else if (args.isList) {
  handleList(args.data);
}

if (args.hintTextTitle) {
  // $.textfield.hintText = "";
  var view = Ti.UI.createView({
    width: "100%",
    height: Ti.UI.SIZE,
    top: 5,
    layout: "vertical"
  });
  var lbl = Ti.UI.createLabel({
    width: "99%",
    font: {
      fontSize: 14,
      fontFamily: Alloy.CFG.FONTS.semibold
    },
    color: "#222222",
    height: Ti.UI.SIZE,
    text: args.hintTextTitle
  });
  view.add(lbl);

  var view2 = Ti.UI.createView({
    width: "100%",
    height: Ti.UI.SIZE
  });
  view2.add($.container2);
  view.add(view2);
  $.container.removeAllChildren();
  $.container.add(view);

  // $.container.height = Ti.UI.SIZE;
}

function handleList(list) {
  var data = [];
  $.textfield.editable = false;
  if (OS_ANDROID) {
    if (list) {
      var first = _.first(list);
      if (first) {
        currentChoice = first;
      }
      picker = Ti.UI.createPicker({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        left: 7,
        zIndex: 99,
        backgroundColor: "white",
        font: { fontFamily: Alloy.CFG.FONTS.semibold, fontSize: 14 }
      });
      $.background.backgroundColor = "white";
      if (_.isFunction($.textfield.hide)) {
        $.textfield.hide();
      }
      var column1 = Ti.UI.createPickerColumn({ width: Ti.UI.FILL });
      _.each(list, function(ev, index) {
        var title = args.noTrad ? ev.text : "picker." + ev.text;
        var titleComplete = args.noTrad ? title : L(title);
        var properties = _.extend(ev, {
          title: titleComplete,
          val: ev.text,
          textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        column1.addRow(Ti.UI.createPickerRow(properties));
      });
      picker.add([column1]);
      $.picker.add(picker);
      picker.addEventListener("change", function(ev) {
        // Alloy.Globals.log.info(JSON.stringify(ev.row));
        handleChange(_.extend(ev.row, args));
      });
      $.textfield.right = 34;
    }
  }
  if (!args.imageRight) {
    $.lblRight.visible = true;
  }
  if (!list) {
    $.container2.add(
      $.UI.create("View", {
        touchFeedback: true,
        touchFeedbackColor: "#EEEEEE"
      })
    );
  }
  if (OS_IOS) {
    var first = _.first(list);
    if (first) {
      currentChoice = first;
      var key = args.noTrad ? first.text : "picker." + first.text;
      $.textfield.applyProperties(first);
      $.textfield.value = L(key);
      $.textfield.val = first.text;
    }
  }
  $.container2.addEventListener("click", function(e) {
    $.trigger("click");
    // require("/core").rippleEffect(e);
    if (list) {
      if (OS_IOS) {
        Alloy.createController("/partials/_picker", {
          noTrad: args.noTrad,
          data: list,
          title: args.hintText || args.hintTextTitle
        })
          .on("click", function(val) {
            Alloy.Globals.log.info("val", JSON.stringify(val));
            handleChange(_.extend(val, args));
            if (val.color) {
              $.textfield.color = val.color;
            }
            $.textfield.value = val.value;
            $.textfield.val = val.val;
          })
          .getView()
          .open();
      }
    }
  });
  $.textfield.touchEnabled = false;
}
$.loadList = handleList;

function handleDate(e) {
  var controller = Alloy.createController("/partials/dialogDate", {
    date: args.subtractDate
      ? Alloy.Globals.moment().subtract(args.subtractDate, "year")
      : Alloy.Globals.moment()
  });
  controller.on("date", function(date) {
    currentDate = Alloy.Globals.moment(date);
    $.textfield.setValue(currentDate.format("DD MMMM YYYY"));
    $.textfield.date = currentDate;
    if (OS_IOS) {
      controller.getView().close({ animated: true });
    } else {
      controller.getView().close({
        activityEnterAnimation: Ti.Android.R.anim.fade_out
      });
    }
    $.textfield.fireEvent("change", {});
  });
  if (OS_IOS) {
    controller.getView().open();
  } else {
    controller.getView().open({
      activityEnterAnimation: Ti.Android.R.anim.fade_in
    });
  }
}

function getValue() {
  if (args.isDate) {
    return Alloy.Globals.moment($.textfield.date).format();
  } else {
    if (args.isList) {
      Alloy.Globals.log.info("valSS", $.textfield.val);
      return currentChoice.val;
    } else {
      return $.textfield.getValue();
    }
  }
}
$.getValue = getValue;

function returnF(e) {
  $.trigger("previous", e);
}

function next(e) {
  Alloy.Globals.log.info(JSON.stringify(e.source.next));
  $.trigger("next", e);
}

function handleClick(e) {
  $.trigger("click");
}

function focus() {
  $.textfield.focus();
}
$.focus = focus;

function handleFocus(e) {
  if (args.isList) {
    if (OS_IOS) {
      $.container2.fireEvent("click");
    } else {
      if (picker) {
        picker.fireEvent("click");
      }
    }
  } else if (args.isDate) {
    $.container.fireEvent("click");
  }
}

function handleChange(e) {
  currentChoice = e;
  $.trigger("change", e);
}
function show() {
  $.container.visible = true;
  $.container.height = Ti.UI.SIZE;
}
$.show = show;

function hide() {
  $.container.visible = false;
  $.container.height = 0;
}
$.hide = hide;

function getVisible() {
  return $.container.visible;
}
$.getVisible = getVisible;

function getObj() {
  return currentChoice;
}
$.getObj = getObj;

function setValue(e) {
  if (args.isDate) {
    var date = Alloy.Globals.moment(e);
    if (date.isValid()) {
      $.textfield.date = date;
      $.textfield.value = date
        ? Alloy.Globals.moment(date).format("DD MMMM YYYY")
        : "";
    } else {
      $.textfield.value = "";
    }
  } else {
    if (args.isList && args.data) {
      Alloy.Globals.log.info("val", picker.getSelectedRow(0));
      if (OS_ANDROID) {
        var indexSelected = _.findIndex(args.data, function(ev) {
          return ev.text === e;
        });
        if (indexSelected > -1) {
          picker.setSelectedRow(0, indexSelected);
          var columns = picker.columns[0];
          handleChange(_.extend(columns.rows[indexSelected], args));
        }
      }

      // $.textfield.value = e ? e : "";
      $.textfield.value = e ? L(e) : "";
      $.textfield.val = e ? e : "";
    } else {
      $.textfield.value = e ? e : "";
    }
  }
}
$.setValue = setValue;
