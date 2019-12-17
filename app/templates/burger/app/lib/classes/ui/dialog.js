import { createButton } from "classes/ui/buttons";

export class AlertDialog {
  constructor(obj) {
    this.title = obj.title || "";
    this.message = obj.message || "";
    this.buttons = [];
    if (obj.cancel) {
      var _this = this;
      this.cancel = createButton(obj.cancel); //Alloy.createController("/components/buttons", obj.cancel);
      if (obj.cancel.click) {
        this.cancel.addEventListener("click", obj.cancel.click);
      }
      this.buttons.push(_this.cancel);
    }
    if (obj.confirm) {
      this.confirm = createButton(obj.confirm); //Alloy.createController("/components/buttons", obj.confirm);
      var _this = this;
      if (obj.confirm.click) {
        this.confirm.addEventListener("click", obj.confirm.click);
      }
      this.buttons.push(_this.confirm);
    }

    if (obj.special) {
      this.special = createButton(obj.special); //Alloy.createController("/components/buttons", obj.confirm);
      var _this = this;
      if (obj.special.click) {
        this.special.addEventListener("click", obj.special.click);
      }
      this.buttons.push(_this.special);
    }

    this.controller = Alloy.createController("/component/dialog", {
      title: this.title,
      message: this.message,
      loader: obj.loader,
      image: obj.image,
      buttons: this.buttons
    });
  }

  show() {
    if (OS_IOS) {
      this.controller.getView().open();
    } else {
      this.controller.getView().open({
        activityEnterAnimation: Ti.Android.R.anim.fade_in
      });
    }
  }

  hide() {
    this.controller.closeWin();
  }
}
