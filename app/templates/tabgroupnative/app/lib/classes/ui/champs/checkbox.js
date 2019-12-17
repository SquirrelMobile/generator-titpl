import { Champs } from "classes/ui/champs/champ";

class CheckBox extends Champs {
  constructor(obj) {
    super(obj);
    this.container = Ti.UI.createView({
      height: Ti.UI.SIZE,
      layout: "horizontal",
      horizontalWrap: false,
      width: Ti.UI.FILL
    });
    this.value = false;
    this.champ = require("ti.animation").createAnimationView({
      height: 45,
      width: 45,
      visible: true,
      background: "white",
      zIndex: 99,
      startFrame: 30,
      endFrame: 75,
      file: "animCheckbox.json"
    });
    // this.label = Alloy.createWidget(
    //   "nl.fokkezb.html2as.widget",
    //   obj.lblView
    // ).getView();

    this.label = Ti.UI.createLabel(obj.lblView);
    this.champ.setFrame(1);
    var _this = this;
    this.champ.addEventListener("click", function() {
      _this.value = !_this.value;
      Ti.API.log(_this.value);
      _this.setValue(_this.value);
    });
    this.container.add(this.champ);
    this.container.add(this.label);
    this.view.add(this.container);
    this.champ.start(0, 30);
    this.champ.getValue = function() {
      return _this.value;
    };
  }

  setValue(bool) {
    if (bool) {
      this.champ.stop();
      this.champ.start(30, 75);
    } else {
      this.champ.stop();
      this.champ.start(95, 150);
      // this.checkboxView.start(75.0, 0.0);
    }
  }
}

exports.createCheckbox = function(args) {
  var checkBox = new CheckBox({
    lblView: {
      html: args.required ? args.text + " *" : args.text,
      width: Ti.UI.FILL,
      font: { fontFamily: "SourceSansPro-Regular", fontSize: 13 },
      color: "#0A0C2A"
    }
  });

  checkBox.view.listener = function(name, event) {
    checkBox.label.addEventListener(name, event);
  };
  checkBox.view.applyProperties(args);
  checkBox.view.getValue = function() {
    return checkBox.getValue();
  };
  return checkBox.view;
};
