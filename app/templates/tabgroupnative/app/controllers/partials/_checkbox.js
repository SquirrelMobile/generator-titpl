// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var colorActive = Alloy.CFG.COLORS.second;
var backgroundColorSave = null;
var active = false;
// Pass through all the properties set on the button, except for meta data and text
$.buttonWrapper.applyProperties(
  _.omit(
    args,
    "id",
    "__parentSymbol",
    "__itemTemplate",
    "$model",
    "text",
    "color"
  )
);
$.textContent.applyProperties(
  _.omit(
    args,
    "id",
    "__parentSymbol",
    "__itemTemplate",
    "$model",
    "height",
    "text",
    "color",
    "top"
  )
);

active = args.active || false;
$.textContent.text = args.text || "?";
setActive(active);

if (args.value) {
  setActive(args.value);
}

if (args.hide) {
  hide();
}
$.textContent.left = args.leftContent || 25;

if (args.checkBoxView) {
  $.checkBoxView.applyProperties(args.checkBoxView);
}

if (args.buttonWrapper) {
  $.buttonWrapper.applyProperties(args.buttonWrapper);
}

if (args.font) {
  $.textContent.font = args.font;
}
if (args.color) {
  $.textContent.color = args.color;
  $.checkBoxView.borderColor = args.color;
}
if (args.textContent) {
  $.textContent.applyProperties(args.textContent);
}

if (args.rightStyle) {
  $.buttonWrapper.width = Ti.UI.FILL;
  $.checkBoxView.right = 0;
  $.checkBoxView.left = null;
  $.textContent.left = 0;
  $.textContent.right = 20;
  $.buttonWrapper.top = 15;
}

function setVisible(value) {
  $.buttonWrapper.visible = $.buttonWrapper.touchEnabled = Boolean(value);
}

function setAttr(text) {
  $.textContent.attributedString = text;
}

function getValue() {
  return active;
}

function getVisible() {
  return $.buttonWrapper.visible;
}
$.getVisible = getVisible;

function setActive(value) {
  // Alloy.Globals.log.info("setActive", value)
  if (value) {
    // $.check.visible = true;

    $.checkBoxView.backgroundColor = Alloy.CFG.COLORS.main;
    active = true;
  } else {
    // $.check.visible = false;
    $.checkBoxView.backgroundColor = "white";

    active = false;
  }
  $.buttonWrapper["activer"] = Boolean(value);
  $.textContent["activer"] = Boolean(value);
}

function show() {
  $.buttonWrapper.visible = true;
  $.buttonWrapper.height = Ti.UI.SIZE;
}
$.show = show;

function hide() {
  $.buttonWrapper.visible = false;
  $.buttonWrapper.height = 0;
}
$.hide = hide;

exports.getValue = getValue;
exports.setVisible = setVisible;
exports.setActive = setActive;
exports.setValue = setActive;
exports.setAttr = setAttr;

function toggle(e) {
  setActive(!active);
  $.trigger("change", _.extend(args, { activer: active }));
}
