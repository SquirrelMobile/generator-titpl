import { Champs } from "classes/ui/champs/champ";

class TextField extends Champs {
  constructor(obj) {
    super(obj);

    this.container = Ti.UI.createView({
      borderWidth: "1px",
      height: Ti.UI.SIZE,
      width: Ti.UI.FILL,
      backgroundColor: obj.backgroundColor || "white",
      borderRadius: obj.borderRadius,
      touchFeedback: true,
      borderColor: obj.borderColor ? obj.borderColor : "#CCC2C4D8",
      touchFeedbackColor: "#EEEEEE"
    });

    if (obj.isDate) {
      this.buildDate(obj);
    } else if (obj.isList) {
      this.buildList(obj);
    } else {
      this.champ = Ti.UI.createTextField(obj.textfield);
      this.champ.hintText = obj.hintText
        ? obj.hintText
        : obj.hintTextTitle
        ? L("form.beginHintextDefault") +
          (obj.hintTextTitle
            ? obj.hintTextTitle.text.toLowerCase()
            : obj.hintText)
        : obj.hintText;
    }
    this.activeColor = obj.activeColor;
    this.addTextfieldView(obj);
    this.checkRequired(obj);
    this.view.add(this.container);
    var _this = this;
    this.champ.addEventListener("focus", function() {
      _this.container.borderColor = _this.activeColor;
      _this.container.borderWidth = "3px";
      if (_this.imageRightView) {
        _this.imageRightView.tint = _this.activeColor;
        _this.imageRightView.color = _this.activeColor;
      }
    });
    this.champ.addEventListener("blur", function() {
      _this.container.borderColor = obj.borderColor;
      _this.container.borderWidth = "1px";
      if (_this.imageRightView) {
        _this.imageRightView.tint = obj.imageRightView.tint;
        _this.imageRightView.color = obj.imageRightView.color;
      }

      // _this.imageRightView.tint = _this.activeColor;
      // _this.imageRightView.color = _this.activeColor;
    });

    if (obj.bottom) {
      var bottom = Ti.UI.createView(
        _.extend(obj.bottom, {
          bottom: 0,
          zIndex: 99
        })
      );
      this.container.add(bottom);
    }
  }

  addTextfieldView(obj) {
    if (obj.imageRight) {
      this.imageRightView = Ti.UI[
        (obj.imageRightView
        ? obj.imageRightView.text
        : false)
          ? "createLabel"
          : "createMaskedImage"
      ](_.extend({ right: 20, touchEnabled: false }, obj.imageRight));
      this.container.add(this.imageRightView);
      if (!obj.isList) {
        this.champ.right =
          this.imageRightView.right +
          (this.imageRightView.height ? this.imageRightView.height : 0);
      }
    }
    if (obj.imageLeft) {
      this.imageLeftView = Ti.UI[
        (obj.imageLeftView
        ? obj.imageLeftView.text
        : false)
          ? "createLabel"
          : "createMaskedImage"
      ](_.extend({ left: 20, touchEnabled: false }, obj.imageLeft));
      this.container.add(this.imageLeftView);
      if (!obj.isList) {
        this.champ.left =
          this.imageLeftView.right +
          (this.imageLeftView.height ? this.imageLeftView.height : 0);
      }
    }

    this.container.add(this.champ);
  }

  buildDate(obj) {
    this.champ = Ti.UI.createLabel(obj.textfield);
    this.champ.text =
      obj.textfield.hintText || obj.textfield.hintTextTitle || "";
    this.champ.left = "50px";
    this.champ.color = obj.textfield.hintTextColor;
    this.champ.touchEnabled = false;
    this.container.touchFeedbackColor = "#9498BE";
    var _this = this;
    this.container.addEventListener("click", function() {
      var controllerDate = Alloy.createController("/partials/dialogDate", {
        date: Alloy.Globals.moment(),
        title: obj.hintTextTitle2
          ? L("form.beginHintextDefault") + obj.hintTextTitle2.toLowerCase()
          : obj.hintTextTitle
      });
      controllerDate.on("date", function(date) {
        var currentDate = Alloy.Globals.moment(date);
        if (_this.champ) {
          _this.champ.text = currentDate.format("DD MMMM YYYY");
          _this.champ.date = currentDate;
        }
        _this.champ.fireEvent("change", {});
        _this.champ.color = obj.color;
      });
      if (OS_IOS) {
        controllerDate.getView().open({ animated: true });
      } else {
        controllerDate.getView().open({
          activityEnterAnimation: Ti.Android.R.anim.fade_in
        });
      }
      controllerDate.getView().open();
    });
  }

  buildList(obj) {
    this.champ = Ti.UI.createLabel(obj.textfield);

    if (OS_ANDROID) {
      var data = [];
      if (obj.list) {
        this.currentChoice = _.first(obj.list);
        this.champ = Ti.UI.createPicker({
          width: Ti.UI.FILL,
          height: obj.textfield.height || 35,
          bottom: 2,
          left: 7,
          color: "white",
          zIndex: 100,
          backgroundColor: obj.backgroundColor ? obj.backgroundColor : "white"
        });

        var column1 = Ti.UI.createPickerColumn({ width: Ti.UI.FILL });
        this.list = obj.list;
        _.map(obj.list, function(ev) {
          var title = "picker." + ev.text;
          var titleComplete = L(title);
          return column1.addRow(
            Ti.UI.createPickerRow(
              _.extend(ev, {
                title: titleComplete,
                val: ev.text,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
              })
            )
          );
        });

        this.champ.add([column1]);
      }
    }
    if (OS_IOS) {
      var first = _.first(obj.list);
      if (first) {
        this.currentChoice = first;
        if (first.text === "") {
          this.champ.applyProperties(first);
          (this.champ.color = "gray"), (this.champ.text = "Non renseigné");
          this.champ.val = first.text;
        } else {
          var key = "picker." + first.text;
          this.champ.applyProperties(first);
          this.champ.text = L(key);
          this.champ.val = first.text;
        }
      }
      var _this = this;
      this.champ.addEventListener("click", function(e) {
        if (obj.list) {
          Alloy.createController("/partials/_pickeriOS", {
            data: obj.list,
            title: obj.hintText || obj.hintTextTitle
          })
            .on("click", function(val) {
              _this.champ.fireEvent("change", {
                row: {
                  val: val.val,
                  value: val.value
                }
              });
              _this.champ.value = val.value;
              _this.champ.val = val.val;
              _this.champ.text = L("picker." + val.val);
            })
            .getView()
            .open();
        }
      });
    }
  }

  checkRequired(obj) {
    if (obj.required) {
      if (obj.isDate) {
        this.champ.text = this.champ.text ? this.champ.text + " *" : "";
      } else {
        this.champ.hintText = this.champ.hintText
          ? this.champ.hintText + " *"
          : "";
      }
    }
  }
}

exports.createTextField = function(args) {
  var textFieldObject = _.extend(args, {
    textfield: _.extend(
      {
        keyboardType: Titanium.UI.KEYBOARD_TYPE_ASCII,
        left: 0,
        right: 0,
        padding: { left: OS_ANDROID ? 50 : 15 },
        backgroundColor: "transparent",
        color: "#222222",
        height: Alloy.Globals.smallScreen ? 40 : 50
      },
      _.omit(
        args,
        "left",
        "backgroundColor",
        "right",
        "top",
        "bottom",
        "width",
        "height",
        "borderColor",
        "borderWidth"
      )
    )
  });

  if (args.imageRight) {
    textFieldObject["imageRight"] = _.extend(
      {
        mask: args.imageRight,
        height: 24,
        width: 24
      },
      args.imageRightView
    );
  }

  if (args.imageLeft) {
    textFieldObject["imageLeft"] = _.extend(
      {
        mask: args.imageLeft,
        height: 24,
        width: 24
      },
      args.imageLeftView
    );
  }
  if (args.hintTextTitle) {
    textFieldObject["hintTextTitle"] = _.extend(
      {
        text: args.hintTextTitle,
        color: "gray"
      },
      args.hintTextTitleView
    );
  }
  var textField = new TextField(textFieldObject);
  textField.view.applyProperties(
    _.omit(args, "backgroundColor", "borderColor")
  );
  textField.container.applyProperties(
    _.omit(args, "left", "right", "top", "bottom", "width", "height")
  );
  textField.view.getValue = textField.getValue;

  textField.view["validFunction"] = function(bool) {
    if (bool) {
      if (!textField.animationValid) {
        textField.imageRightView.hide();
        textField.animationValid = require("ti.animation").createAnimationView({
          height: 30,
          width: 30,
          right: 20,
          visible: true,
          background: "white",
          zIndex: 99,
          file: "animAccept.json"
        });
        textField.container.add(textField.animationValid);
        textField.animationValid.start();
      }
    } else {
      if (textField.animationValid) {
        textField.imageRightView.show();
        textField.container.remove(textField.animationValid);
        textField.animationValid = null;
      }
    }
  };

  textField.view.blur = function() {
    if (textField.champ && textField.champ.blur) {
      textField.champ.blur();
    }
  };

  if ((args.next || args.previous) && OS_IOS) {
    var toolbar = Alloy.createController("/partials/keytoolbarios", {
      next: args.next,
      hintText: args.hintTextTitle.text || args.hintText,
      previous: args.previous
    });
    toolbar.on("close", function() {
      textField.champ.blur();
    });
    if (args.previous) {
      toolbar.on("previous", function() {
        textField.champ.fireEvent("previous", { id: args.previous.id });
      });
    }
    if (args.next) {
      toolbar.on("next", function() {
        textField.champ.fireEvent("return", { id: args.next.id });
      });
    }

    textField.champ.keyboardToolbar = toolbar.getView();
  }

  textField.view.setValue = function(val) {
    textField.setValue(val);
  };

  textField.view.setPasswordMask = function(bool) {
    textField.champ.passwordMask = bool;
    textField.imageRightView.text = bool ? "\uf06e" : "\uf070";
  };

  textField.view.listener = function(name, event) {
    textField.champ.addEventListener(name, event);
  };

  textField.view.deleteListener = function(name, event) {
    textField.champ.removeEventListener(name, event);
  };

  textField.view.focus = function() {
    if (textField.champ.focus && !textField.isDate) {
      textField.champ.focus();
    } else {
      textField.container.fireEvent("click");
    }
  };

  textField.view.getValue = function() {
    return textField.getValue();
  };
  return textField.view;
};
