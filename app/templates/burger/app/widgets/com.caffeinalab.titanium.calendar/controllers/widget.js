
var args = arguments[0] || {};
var Moment = require('moment');
Ti.API.log('--- Ti.Locale.currentLocale ' + Ti.Locale.currentLocale);
Moment.locale(Ti.Locale.currentLocale);

_.defaults(args, {

  nb_display_month : 12,
	day: Moment().date(),
	month: Moment().month(),
	year: Moment().year(),
	active_dates: null,

	backgroundColor: 'transparent',
	dateBackgroundColor: '#6000',
	todayBackgroundColor: '#af80',
	dateTextColor: '#fff',
	todayTextColor: '#000',
	activePinColor: 'orange',
	inactivePinColor: 'transparent',
	selectedBackgroundColor: '#6f80'

});

var active_dates = args.active_dates ? getMomentDates(args.active_dates) : [];
var current_page = 0;

/////////////
// Methods //
/////////////

function getDayLabels() {
	var days = Moment.weekdaysShort();
	days.push(days.shift()); // Moment week has Sunday at index 0
	_.each(days, function(day) {
		var $view = $.UI.create('View', {
			classes: ['dayLabelView'],
			width: Math.floor($.calendar.rect.width / 7)
		});
		$view.add($.UI.create('Label', {
			classes: ['dayLabel'],
			text: day
		}));

		$.dayLabelsRow.add($view);
	});
}

function getMomentDates(dates) {
	return _.map(dates, function(date) {
		return Moment(date);
	});
}

function isInMomentsList(date, dates) {
	return _.find(dates, function(day) {
		return date.isSame(day);
	});
}

function getDayView(date, current, active) {
	var is_today = date.isSame(Moment(), 'day');
	var $this = $.UI.create('View', {
		classes: ['day'],
		width: Math.floor($.calendar.rect.width / 7),
		backgroundColor: is_today ? args.todayBackgroundColor : args.dateBackgroundColor,
		opacity: current ? 1 : 0.5,
		date: date,
		active: active,
	});
	$this.add($.UI.create('Label', {
		classes: ['dayNumber'],
		color: is_today ? args.todayTextColor : args.dateTextColor,
		text: date.date()
	}));
	$this.add($.UI.create('View', {
		classes: ['dayDot'],
		backgroundColor: active ? args.activePinColor : args.inactivePinColor
	}));

	return $this;
}

function getDayContainer(number) {
	var $this = $.UI.create('View', {
		classes: ['day'],
		width: Math.floor($.calendar.rect.width / 7),
		backgroundColor: '#6000',
		opacity: 1,
		date: null,
		active: null,
	});
	$this.add($.UI.create('Label', {
		classes: ['dayNumber'],
		color: '#fff',
		text: number
	}));
	$this.add($.UI.create('View', {
		classes: ['dayDot'],
		backgroundColor: 'transparent'
	}));

	return $this;
}

function setItemDate($item, date) {
	$item.date = date;
	$item.children[0].text = date.date();
}

function setItemActive($item, active) {
	$item.active = active;
	$item.children[1].backgroundColor = active ? 'orange' : 'transparent';
}

function setItemToday($item, is_today) {
	$item.backgroundColor = is_today ? '#9f80' : '#6000';
}

function setItemCurrent($item, current) {
	$item.opacity = current ? 1 : 0.5;
}

function getMonthView(month, year) {
	var month_rows = [];
	var num_cols = 7;
	var num_rows = 5;
	var start_date = Moment().month(month).year(year).startOf('month').startOf('week');

	var $month_view = $.UI.create('View', {
		classes: ['month'],
		month: month,
		year: year,
		backgroundColor: args.backgroundColor,
		ready: false
	});

	return $month_view;
}

function buildMonth($month_view, dates) {

	if (!$month_view || $month_view.ready) return;
	Ti.API.debug('===> buildMonth start');
	Ti.API.log('--- $month_view.ready ' + $month_view.ready);
	var month_rows = [];
	var num_cols = 7;
	var num_rows = 5;
	var num_length = num_rows*num_cols;
	var start_date = Moment().month($month_view.month).year($month_view.year).startOf('month').startOf('week');

	for (var i = 0; i < num_rows; i++) {
		month_rows.push($.UI.create('View', {
			classes: ['monthRow']
		}));
	}

	// Add day containers
	var curday = null,
	    $curview = null;

	for (var d = 0; d < num_length; d++) {

		curday = Moment(start_date).add(d, 'days');
		$curview = getDayContainer(curday.date());

		setItemDate($curview, curday);
		setItemActive($curview, isInMomentsList(curday, dates));
		setItemCurrent($curview, curday.month() === $month_view.month);
		setItemToday($curview, curday.isSame(Moment(), 'day'));

		month_rows[Math.floor(d/num_cols)].add($curview);
	}

	// Add rows
	_.each(month_rows, function(row) {
		$month_view.add(row);
	});

	$month_view.ready = true;

	Ti.API.log('===> buildMonth end');
}

function buildCalendar() {
	$.main.removeEventListener('postlayout', buildCalendar);

	// Add top labels
	getDayLabels();
	// Create the calendar views
	/*for (var m = 0; m < 12; m++) {
		$.monthScroll.addView(getMonthView(m, args.year));
	}*/

	var current = Moment([args.year, args.month]);
	for(var m = 0; m <= args.nb_display_month; m++){
	    $.monthScroll.addView(getMonthView(current.month(), current.year()));
	    current = current.add(1, 'M');
	}

	current_page = 0;//args.month;

	//setCurrentMonth(args.month);
	setCurrentMonth(0);
	//if (args.month - 1 > -1) buildMonth($.monthScroll.views[args.month-1], active_dates);
	//if (args.month + 1 < 12)
	buildMonth($.monthScroll.views[1], active_dates);
}

function setCurrentMonth(m) {
	$.monthScroll.currentPage = m;
	$.monthName.text = Moment().month($.monthScroll.views[m].month).year($.monthScroll.views[m].year).format('MMMM YYYY');
	buildMonth($.monthScroll.views[m], active_dates);
}

///////////////
// Listeners //
///////////////

$.main.addEventListener('postlayout', buildCalendar);

$.monthScroll.addEventListener('scrollend', function(e) {
	if (e.currentPage === current_page) return;

	var old_page = current_page;
	current_page = e.currentPage;

	// Genereate the adjacent views
	if (current_page > old_page) {
		buildMonth($.monthScroll.views[current_page+1], active_dates);
	} else {
		buildMonth($.monthScroll.views[current_page-1], active_dates);
	}

	// Build the new month
	var mm = $.monthScroll.views[current_page];
	$.monthName.text = Moment().month(mm.month).year(mm.year).format('MMMM YYYY');
	buildMonth(e.view, active_dates);
});


function calendarClicked(e){

    $.trigger('click', { date : Moment(e.source.date) });

}
