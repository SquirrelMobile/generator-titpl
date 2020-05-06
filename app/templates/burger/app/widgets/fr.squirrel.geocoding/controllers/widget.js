const SearchBar = require(WPATH("searchBar")).SearchBar;
var args = $.args;
var currentRegion = null;

if (OS_IOS) {
	$.btn.bottom = 20 + 10;
}

if (OS_IOS) {
	$.mapview.addEventListener("regionchanged", handleRegion);
} else {
	$.mapview.addEventListener("regionwillchange", handleRegion);
}

function getCurrentPosition() {
	Ti.Geolocation.getCurrentPosition(function(e) {
		if (e.success) {
			$.mapview.region = {
				longitude: e.coords.longitude,
				latitude: e.coords.latitude,
				latitudeDelta: 0.006866,
				longitudeDelta: 0.004757,
			};
		}
	});
}

var searchBar = new SearchBar({
	valid: function(e) {
		var content = formattedAddressComponent(e);
		$.mapview.region = {
			longitude: content.longitude,
			latitude: content.latitude,
			latitudeDelta: 0.006866,
			longitudeDelta: 0.004757,
		};
		currentRegion = content;
	},
});
$.searchBar.add(searchBar.view);
$.open = function(obj) {
	$.win.open({ modal: true });
};
$.close = close;

function close(obj) {
	$.win.close();
}

function handleRegion(e) {
	currentRegion = {
		address_components: [],
		address: "",
		latitude: e.latitude,
		longitude: e.longitude,
	};
	searchBar.reverseGeocoder({
		latitude: e.latitude,
		longitude: e.longitude,
		callback: function(ev) {
			var content = formattedAddressComponent(ev);
			searchBar.champ.value = content.address;
			currentRegion = content;
		},
	});
}

function formattedAddressComponent(obj) {
	var objEnd = {};
	_.each(obj.address_components, function(comp) {
		_.each(comp.types, function(type) {
			objEnd[type] = _.omit(comp, "types");
		});
	});
	obj.address_components = objEnd;
	return obj;
}

function handleClick(e) {
	$.trigger("valid", currentRegion);
}

function handleTouchStart(e) {
	e.source.animate({
		backgroundColor: "#eee",
		duration: 250,
	});
}

function handleTouchEnd(e) {
	setTimeout(function() {
		e.source.animate({
			backgroundColor: "white",
			duration: 250,
		});
	}, 300);
}
searchBar.champ.addEventListener("touchstart", handleTouchStart);
searchBar.champ.addEventListener("touchend", handleTouchEnd);
searchBar.champ.addEventListener("touchcancel", handleTouchEnd);

$.btn.addEventListener("touchstart", handleTouchStart);
$.btn.addEventListener("touchend", handleTouchEnd);
$.btn.addEventListener("touchcancel", handleTouchEnd);

if (OS_ANDROID && args.latitude && args.longitude) {
	$.mapview.region = {
		longitude: args.longitude,
		latitude: args.latitude,
		latitudeDelta: 0.006866,
		longitudeDelta: 0.004757,
	};
}
var fff = true;
function mapReady(e) {
	if (!fff) {
		return false;
	}
	Ti.API.log("args", JSON.stringify(args));
	if (args.latitude && args.longitude) {
		if (OS_IOS) {
			$.mapview.region = {
				longitude: args.longitude,
				latitude: args.latitude,
				latitudeDelta: 0.006866,
				longitudeDelta: 0.004757,
			};
		}
	} else {
		if (
			Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS) ||
			Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)
		) {
			getCurrentPosition();
		} else {
			Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
				if (e.success) {
					getCurrentPosition();
				}
			});
		}
	}
	fff = false;
}
