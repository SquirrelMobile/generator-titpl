/**
 * @class Controller.partials._list
 * Display list view
 *
 */

var control = Ti.UI.createRefreshControl({
  tintColor: Alloy.CFG.COLORS.main
});
control.addEventListener("refreshstart", function(e) {
  $.trigger("refresh", e);
});

(function constructor(args) {
  if (!args.noRefresh) {
    $.listview.setRefreshControl(control);
  }
  if (args.header) {
    $.header.add(
      Alloy.createController(args.header)
        .on("change", headerChange)
        .getView()
    );
    $.header.height = Ti.UI.SIZE;
  }

  if (args.footer) {
    $.footer.add(Alloy.createController(args.footer).getView());
    $.footer.height = Ti.UI.SIZE;
  }
})($.args);

function headerClick(e) {
  $.trigger("headerClick", e);
}

/**
 * handleClick - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function handleClick(e) {
  var row = e.section.getItemAt(e.itemIndex),
    prop = row.properties;
  Ti.API.log("tst");
  $.trigger(
    "click",
    _.extend(prop, {
      source: e.source,
      row: row,
      bindId: e.bindId,
      sectionIndex: e.sectionIndex,
      itemIndex: e.itemIndex
    })
  );
}

/**
 * marker - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function marker(e) {
  $.trigger("marker", e);
}

$.beginRefreshing = function() {
  control.beginRefreshing();
};

/**
 * addMarkerlist - description
 *
 * @param  {type} section description
 * @return {type}         description
 */
$.addMarkerlist = function(section) {
  $.listview.addMarker(section);
};

/**
 * addItemSection - description
 *
 * @param  {type} section description
 * @return {type}         description
 */
$.addItemSection = function(section) {
  $.listview.appendSection(section);
};

/**
 * load - description
 *
 * @param  {type} sections description
 * @return {type}          description
 */
$.load = function(sections) {
  $.listview.setSections(sections);

  _.defer(function() {
    control.endRefreshing();
  });
};

$.getControl = function() {
  return control;
};

function headerChange(e) {
  if (OS_IOS) {
    $.trigger("headerChange", { row: e });
  }
}
