/**
 * @class Controller.partials._list
 * Display list view
 *
 */

/**
 * @method Controller
 * Display list view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

})($.args);


/**
 * handleClick - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function handleClick(e){

  var row = e.section.getItemAt(e.itemIndex),
      prop = row.properties;

  $.trigger('click', prop);

}


/**
 * marker - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function marker(e){

    $.trigger('marker', e);

}


/**
 * addMarkerlist - description
 *
 * @param  {type} section description
 * @return {type}         description
 */
$.addMarkerlist = function(section){
    $.listview.addMarker(section);
};


/**
 * addItemSection - description
 *
 * @param  {type} section description
 * @return {type}         description
 */
$.addItemSection = function(section){
    $.listview.appendSection(section);
};


/**
 * load - description
 *
 * @param  {type} sections description
 * @return {type}          description
 */
$.load = function(sections){
    $.listview.setSections(sections);
};
