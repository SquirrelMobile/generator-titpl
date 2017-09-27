/**
 * @class Controller.home
 * Display home view
 *
 */


/**
 *
 */
var calendar = null;

/**
 * @method Controller
 * Display home view, load home
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  $.navbar.load({
    logo : {
      visible : true
    }
  });

  calendar = Alloy.createController('common/calendar');

  calendar.on('chooseDate', updateDate);

})($.args);

/**
 * @type {Object} dispatcher of menu item
 */
var dispatcher = require('dispatcher');


/**
 * openWindow - Open new window
 *
 * @param  {Object} e object
 * @param  {Object} e.controller controller name
 * @param  {Object} e.data data to passed to the controller
 */
function openWindow(e){

  var obj = {
    controller : 'win',
    data : {
      controller : 'partials/_detail',
      navbar : {
        back : {
          visible : true
        },
        logo : {
          visible : true
        }
      }
    }
  };
  dispatcher.trigger('openWindow', obj);

}

function openCalendar(e){

  calendar.open({
    args : {
      active_dates : ['2017-09-02'],
      title : 'Date de début',
      showNoReturn : false,

      //WIDGET
      // nb_display_month : 12,
    	// day: Moment().date(),
    	// month: Moment().month(),
    	// year: Moment().year(),
    	// active_dates: null,

    	backgroundColor: 'transparent',
    	dateBackgroundColor: '#6000',
    	todayBackgroundColor: 'blue',
    	dateTextColor: '#fff',
    	todayTextColor: '#000',
    	activePinColor: 'orange',
    	inactivePinColor: 'transparent',
    	selectedBackgroundColor: '#6f80'
    }
  });

}

function updateDate(e){
  Ti.API.log('--- update date '  + JSON.stringify(e));
  //e.reset
  //e.date
  var date = Alloy.Globals.moment(e.date);
  alert('Date choisie ' + date.format('dddd DD MMMM YYYY'));
}
