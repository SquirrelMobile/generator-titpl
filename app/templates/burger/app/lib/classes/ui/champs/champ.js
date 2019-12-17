export class Champs {
  constructor(obj) {
    this.view = Ti.UI.createView({
      height: Ti.UI.SIZE,
      layout: "vertical",
      width: Ti.UI.FILL
    });
    // this.type = obj.type;
    this.isDate = obj.isDate;
    this.next = obj.next;
    this.isList = obj.isList;
    if (obj.hintTextTitle) {
      this.hintTextTitleView = Ti.UI.createLabel(
        _.extend(
          {
            left: 0,
            width: Ti.UI.SIZE,
            color: "#222222",
            borderRadius: 5,
            height: Ti.UI.SIZE
          },
          obj.hintTextTitle
        )
      );
      this.view.add(this.hintTextTitleView);
    }
  }

  getValue() {
    if (this.isDate) {
      if (this.champ.date) {
        return Alloy.Globals.moment(this.champ.date)
          .utc()
          .hour(0)
          .minute(0)
          .second(0)
          .format();
      }
      return null;
    } else {
      if (this.isList) {
        return this.champ.val;
      } else {
        Ti.API.log(this.champ);
        return this.champ.getValue();
      }
    }
  }

  setValue(e) {
    if (this.isDate) {
      var date = Alloy.Globals.moment(e);
      if (date.isValid()) {
        this.champ.date = date;
        this.champ.text = date
          ? Alloy.Globals.moment(date).format("DD MMMM YYYY")
          : "";

        this.champ.color = "black";
      } else {
        this.champ.value = "";
      }
    } else {
      if (this.isList) {
        Ti.API.log("setValue", e);
        if (OS_ANDROID) {
          Ti.API.log("this.list", this.list);
          Ti.API.log("indexOf", _.findIndex(this.list, e));
          this.champ.setSelectedRow(0, _.findIndex(this.list, { text: e }));
        }
        this.champ.text = L("picker." + e);
        this.champ.value = e;
        this.champ.val = e;
      } else {
        this.champ.value = e ? e : "";
      }
    }
  }
}
