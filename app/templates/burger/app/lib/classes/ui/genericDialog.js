export class Dialog {
	constructor(obj) {
		this.title = obj.title || {};
		this.content = obj.content || Ti.UI.createView({});
		this.modal = !!obj.modal;
		this.modalStyle = obj.modalStyle || {};

		this.popup = Alloy.createController("/component/genericDialog", {
			title: this.title,
			content: this.content,
			modal: this.modal,
			modalStyle: this.modalStyle,
		});
	}

	open() {
		this.popup.open();
	}

	close() {
		this.popup.close();
	}
}
