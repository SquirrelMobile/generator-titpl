import { Field } from "classes/ui/champs/field";
import { Button } from "classes/ui/button";

class PhotoSelector extends Field {
	constructor(obj) {
		super(obj);
		this.id = obj.id;
		this.container.height = Ti.UI.SIZE;
		this.fieldView.height = Ti.UI.SIZE;

		// this.containerPhoto = Ti.UI.createView({
		// 	layout: "vertical",
		// 	height: Ti.UI.SIZE,
		// });

		this.createAndSetView(
			"containerPhoto",
			"createView",
			this.defaultParams && this.defaultParams.containerPhoto,
			obj.containerPhoto,
		);

		this.containerPhoto.applyProperties({
			height: Ti.UI.SIZE,
		});

		this.createAndSetView(
			"image",
			"createImageView",
			this.defaultParams && this.defaultParams.photo,
			obj.image,
		);

		this.button = new Button((this.defaultParams && this.defaultParams.button) || {});
		this.button.label.text = L("choosePicture");

		this.containerPhoto.add(this.image);
		this.containerPhoto.add(this.button.parent);
		this.fieldView.add(this.containerPhoto);
		var that = this;
		this.button.parent.addEventListener("click", e => {
			require("/media").openDialogCamera(function(photo, ext) {
				that.image.image = that.value = photo;
			});
		});
	}

	focus() {}

	blur() {}

	getValue() {
		return this.value;
	}

	setValue(val) {}
}

exports.PhotoSelector = PhotoSelector;

exports.createView = e => {
	let photoSelector = new PhotoSelector(e);
	photoSelector.parent.super = () => {
		return photoSelector;
	};

	return photoSelector.parent;
};
