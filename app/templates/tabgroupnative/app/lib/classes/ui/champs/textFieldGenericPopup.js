import { FakeTextField } from "classes/ui/champs/fakeTextField";
import { Dialog } from "classes/ui/genericDialog";

class TextFieldPopup extends FakeTextField {
	constructor(obj) {
		super(obj);
		let that = this;
		this.callback = obj.callback || function() {};
		this.currentValue = null;
		this.container.addEventListener("click", function() {
			let dialog = new Dialog({
				title: obj.dialog.title,
				content: Alloy.createController(obj.dialog.content, {
					data: that.currentValue,
				})
					.on("select", function(ev) {
						that.currentValue = ev;
						that.faketextField.value = ev;
						that.callback(ev);
						dialog.close();
					})
					.getView(),
				modal: obj.dialog.modal,
				modalStyle: obj.dialog.modalStyle,
			});
			dialog.open();
		});
	}
}

exports.TextFieldPopup = TextFieldPopup;

exports.createView = e => {
	let textfield = new TextFieldPopup(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
