var $calendar, calendarView, triggerCalendar;

(function constructor(args) {

    $.navbar.load({
      logo : {
        visible : false
      },
      title : {
        visible : true,
        text : L('chooseDate'),
        color : "white"
      },
      btnLeft : {
        visible : true
      }
    });

})(arguments[0] || {});

function close(e){

    if($calendar){
        $calendar.off('click', triggerCalendar);
        $.containerCalendar.remove(calendarView);
        calendarView = null;
        $calendar = null;
    }

    $.win.close();

}

function triggerCalendar(e){
  Ti.API.log('--- e ' + JSON.stringify(e));

    $.trigger('chooseDate', e);

    close();
    Ti.API.log('--- date choose  ' + JSON.stringify(e));

}

exports.open = function(e){

  var args = e.args || {};

  $calendar = Alloy.createWidget('com.caffeinalab.titanium.calendar', e.args);
  calendarView = $calendar.getView();

  $calendar.on('click', triggerCalendar);

  $.containerCalendar.add(calendarView);

  Ti.API.log('--- construct calendar view');

  $.win.open({ opacity : 1 });

};
