exports.createButton = function(args) {
  var container = Ti.UI.createView(
    _.extend(
      {
        height: Alloy.Globals.smallScreen ? 40 : 46,
        elevation: 10,
        bottom: 10,
        borderRadius: 6
      },
      args
    )
  );
  var label = Ti.UI.createLabel(
    _.extend(
      {
        left: 0,
        id: "lbl",
        touchEnabled: false,
        height: Ti.UI.FILL,
        right: 0,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        minimumFontSize: 7,
        font: { fontFamily: "SourceSansPro-SemiBold", fontSize: 15 }
      },
      _.omit(
        args,
        "left",
        "bottom",
        "top",
        "right",
        "width",
        "height",
        "opacity",
        "borderColor",
        "touchFeedback",
        "touchFeedbackColor"
      )
    )
  );
  function handleTouchStart(e) {
    label.animate({
      opacity: 0.2,
      duration: 250
    });
  }

  function handleTouchEnd(e) {
    setTimeout(function() {
      label.animate({
        opacity: 1,
        duration: 250
      });
    }, 300);
  }

  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchend", handleTouchEnd);
  container.addEventListener("touchcancel", handleTouchEnd);
  container.focus = function() {
    Ti.API.log("focus");
    container.fireEvent("click");
  };
  container.add(label);
  return container;
};
