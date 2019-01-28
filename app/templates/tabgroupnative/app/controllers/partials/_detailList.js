/**
 * @class Controller.partials._detailList
 * Display detail list view
 *
 */

/**
 * @method Controller
 * Display detail list view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  $.navbar.load({
    burger : {
      visible : true
    },
    logo : {
      visible : true
    }
  });

  load();

})($.args);

/**
 * load - description
 *
 * @return {type}  description
 */
function load(){

  var data = require('data').dataList();
  var sections = require('data').dataSectionList();

  var sectionData = [];
  var sectionList = [];
  var currentSection = null;
  var row = {};

  _.each(sections, function(section){

    currentSection = Alloy.createController('partials/_listSection', { title : section.name }).getView();
    sectionList.push(currentSection);

    sectionData = [];

    _.each(data, function(d){

        row = {
          template : 'default',
          properties : d,
          title : {
            text : d.name
          }
        };

        sectionData.push(row);

     });

     currentSection.setItems(sectionData);

  });

  $.listview.load(sectionList);

}


/**
 * openWindow - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function openWindow(e){

  var obj = {
    controller : 'win',
    data : {
      controller : 'partials/_detail',
      navbar : {
        nav : {
          backgroundColor : 'blue',
        },
        btnLeft : {
          visible : true
        },
        logo : {
          visible : true
        }
      }
    }
  };
  Alloy.Globals.events.trigger('openWindow', obj);

}


/**
 * handleClick - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function handleClick(e){

  openWindow();

}
