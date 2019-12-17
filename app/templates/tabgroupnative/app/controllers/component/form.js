var args = $.args;
import { AlertDialog } from "classes/ui/dialog";

var champs = [];
_.each(args.champs, function(e, i) {
  if (e.type === "textfield") {
    var champ = require("/classes/ui/champs/textfield").createTextField(
      _.extend(
        {
          color: "#0B0D2B",
          next: args.champs[i + 1] ? args.champs[i + 1] : null,
          previous: args.champs[i - 1] ? args.champs[i - 1] : null,
          top: 18,
          borderColor: Alloy.CFG.COLORS.main,
          borderRadius: 5,
          left: 50,
          right: 50,
          activeColor: Alloy.CFG.COLORS.main2,
          autoCorrect: false,
          autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
          backgroundColor: "white",
          hintTextColor: "#CC9498BE",
          font: { fontFamily: Alloy.CFG.FONTS.regular, fontSize: 14 },
          hintTextTitleView: {
            color: Alloy.CFG.COLORS.main2,
            bottom: 10,
            font: { fontFamily: Alloy.CFG.FONTS.regular, fontSize: 14 }
          },
          imageRightView: {
            tint: Alloy.CFG.COLORS.main,
            font: { fontFamily: Alloy.CFG.FONTS.fareg, fontSize: 14 },
            opacity: 0.6
          },
          imageLeftView: {
            tint: Alloy.CFG.COLORS.main
          }
        },
        e
      )
    );
    champs.push(champ);
    $.container.add(champ);
  } else if (e && e.type === "checkbox") {
    var champ = require("/classes/ui/champs/checkbox").createCheckbox(
      _.extend(
        {
          top: Alloy.Globals.smallScreen ? 10 : 18,
          left: 50,
          lblView: {
            color: "black"
          },
          right: 50
        },
        e
      )
    );
    champs.push(champ);
    $.container.add(champ);
  } else if (e.type === "valid") {
    var champ = require("/classes/ui/buttons").createButton(
      _.extend(
        {
          top: Alloy.Globals.smallScreen ? 10 : 18,
          backgroundColor: Alloy.CFG.COLORS.main2,
          touchFeedback: true,
          color: "white",
          width: 185
        },
        e
      )
    );
    champs.push(champ);
    champ.addEventListener("click", handleValid);
    $.container.add(champ);
  }
});

function handleValid() {
  var obj = {};
  _.each(champs, function(e, i) {
    if (e.type !== "valid") {
      obj[e.id] = e.getValue();
    }
  });
  if (verif(champs)) {
    Ti.API.log(JSON.stringify(obj));
    $.trigger("valid", obj);
  }
}

function verif(obj) {
  var d = [];
  _.each(obj, function(elem) {
    if (elem.required && (!elem.getValue() || elem.getValue() === "")) {
      var keyEntire = elem.hintTextTitle ? elem.hintTextTitle.text : elem.id;
      d.push(keyEntire);
    }
  });
  if (d.length > 0) {
    var d = new AlertDialog({
      title: L("warning"), //"Attention",
      message: {
        top: 10,
        text: L("dialog.missingsField") + "\n\n" + d.join("\n")
      },
      confirm: {
        text: L("OK"),
        top: 30,
        backgroundColor: Alloy.CFG.COLORS.main2,
        touchFeedback: true,
        color: "white",
        width: "99%",
        click: function() {
          d.hide();
        }
      }
    });
    d.show();
    return false;
  }
  return true;
}

function getChamps() {
  var obj = {};
  _.each(champs, function(e) {
    obj[e.id] = e;
  });
  return obj;
}
$.getChamps = getChamps;

function blurAll(e) {
  _.each(champs, function(champ) {
    if (champ.blur) {
      champ.blur();
    }
  });
}
$.blurAll = blurAll;

function handleNext(e) {
  var id = OS_IOS ? e.id : e.source.next.id;

  var find = _.findWhere(champs, { id: id });
  if (find) {
    find.focus();
  }
}
