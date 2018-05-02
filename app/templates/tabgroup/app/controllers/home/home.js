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

function openCalendar(e){

  calendar.open({
    args : {
      active_dates : ['2017-09-02'],
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
  alert('Choosen date ' + date.format('dddd DD MMMM YYYY'));
}

$.load = function(){
  //reload data here that enabledCache is true on dashboard.js
};
