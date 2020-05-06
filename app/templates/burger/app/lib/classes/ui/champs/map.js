import { Field } from "classes/ui/champs/field";
import { Button } from "classes/ui/button";

var MapView = require("ti.map");
class Map extends Field {
	constructor(obj) {
		super(obj);
		this.map = MapView.createView(
			_.extend(
				{
					mapType: MapView.NORMAL_TYPE,
				},
				_.omit(obj.map, "top", "left", "right"),
			),
		);
		this.overlay = Ti.UI.createView({
			backgroundColor: "black",
			opacity: 0.2,
		});
		this.createAndSetView(
			"label",
			"createLabel",
			(this.defaultParams && this.defaultParams.labelMap) || {
				text: L("select.map"),
				backgroundColor: "#20000000",
				height: 40,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				width: 200,
				touchFeedback: true,
				borderColor: Alloy.CFG.COLORS.black,
				borderRadius: 20,
			},
			obj.label,
		);

		this.value = obj.value;
		var that = this;
		this.label.addEventListener("click", function() {
			var geoCoding = Alloy.createWidget("fr.squirrel.geocoding", {
				longitude: (this.value ? this.value.longitude : 0) || 0,
				latitude: (this.value ? this.value.latitude : 0) || 0,
			});
			geoCoding.on("valid", function(ev) {
				that.setValue(ev);
				geoCoding.close();
			});
			geoCoding.open();
		});
		var that = this;
		this.label.addEventListener("touchstart", _ => {
			that.label.animate({
				opacity: 0.2,
				duration: 250,
			});
		});
		this.label.addEventListener("touchend", _ => {
			setTimeout(function() {
				that.label.animate({
					opacity: 1,
					duration: 250,
				});
			}, 300);
		});
		this.label.addEventListener("touchcancel", _ => {
			setTimeout(function() {
				that.label.animate({
					opacity: 1,
					duration: 250,
				});
			}, 300);
		});

		this.fieldView.add(this.map);
		this.fieldView.add(this.overlay);
		this.fieldView.add(this.label);
	}

	getValue() {
		return this.value;
	}

	setValue(val) {
		if (val.longitude && val.latitude) {
			this.value = val;
			this.map.removeAllAnnotations();
			var annotation = MapView.createAnnotation({
				longitude: val.longitude,
				latitude: val.latitude,
			});
			this.map.addAnnotation(annotation);
			this.map.region = {
				longitude: val.longitude,
				latitude: val.latitude,
				latitudeDelta: 0.006866,
				longitudeDelta: 0.004757,
			};
		}
	}
}

exports.Map = Map;

exports.createView = e => {
	let textfield = new Map(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
