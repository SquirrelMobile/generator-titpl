const urlBase = "https://maps.googleapis.com/maps/api/geocode/json?";

var height =
  Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight
    ? Ti.Platform.displayCaps.platformWidth
    : Ti.Platform.displayCaps.platformHeight;

var maxHeight = height * 0.3;

export class SearchBar {
  constructor(obj) {
    this.view = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE,
      elevation: 10,
      layout: "vertical"
    });
    this.unroll = false;

    this.list = Ti.UI.createScrollView({
      height: this.unroll ? 50 : 0,
      disableBounce: true,
      layout: "vertical",
      width: Ti.UI.FILL
    });

    this.champ = Ti.UI.createTextField({
      width: Ti.UI.FILL,
      hintText: "Rechercher...",
      color: "black",
      height: 50,
      padding: {
        left: 20
      },
      backgroundColor: "white"
    });
    var _this = this;
    this.champ.addEventListener("change", function(e) {
      _this.searchChange(e);
    });
    this.champ.addEventListener("focus", function(e) {
      _this.champ.value = "";
    });
    this.list.addEventListener("click", function(e) {
      _this.handleClick(e);
    });

    this.callbackValid = obj.valid || function() {};

    this.view.add(this.champ);
    this.view.add(this.list);
  }

  handleClick(e) {
    if (e.source.dataObj) {
      this.list.removeAllChildren();
      this.unroll = false;
      this.list.height = 0;
      this.champ.value = e.source.dataObj.formatted_address;
      this.callbackValid(this.formattedResponse(e.source.dataObj));
    }
  }

  getHeightMax() {
    return 50 * Math.floor(maxHeight / 50);
  }

  searchChange(obj) {
    var _this = this;
    if (obj.value.length > 2) {
      var v = encodeURIComponent(obj.value);
      var xhr = Titanium.Network.createHTTPClient();
      xhr.autoEncodeUrl = false;
      xhr.onload = function(e) {
        if (xhr.status == 200) {
          if (xhr.readyState == 4) {
            var response = JSON.parse(xhr.responseText);
            if (response.results) {
              _this.showResponseToList(response.results);
            }
          }
        } else {
          $.noResult.setVisible(true);
        }
      };
      xhr.onerror = function(e) {};
      var url =
        urlBase +
        "&address=" +
        v +
        "&key=AIzaSyCa_dB58TM2l3eDdP5CrcZKyLqSPaZL22E"; //AIzaSyCa_dB58TM2l3eDdP5CrcZKyLqSPaZL22E";
      xhr.open("GET", url, true);
      xhr.send();
    }
  }

  reverseGeocoder(obj) {
    var _this = this;
    var v = encodeURIComponent(obj.latitude + "," + obj.longitude);
    var xhr = Titanium.Network.createHTTPClient();
    xhr.autoEncodeUrl = false;
    xhr.onload = function(e) {
      if (xhr.status == 200) {
        if (xhr.readyState == 4) {
          var response = JSON.parse(xhr.responseText);
          if (response.results && response.results[0]) {
            obj.callback(_this.formattedResponse(response.results[0]));
          }
        }
      } else {
        $.noResult.setVisible(true);
      }
    };
    xhr.onerror = function(e) {};
    var url =
      urlBase + "&latlng=" + v + "&key=AIzaSyCa_dB58TM2l3eDdP5CrcZKyLqSPaZL22E"; //AIzaSyCa_dB58TM2l3eDdP5CrcZKyLqSPaZL22E";
    Ti.API.log(url);
    xhr.open("GET", url, true);
    xhr.send();
  }

  showResponseToList(e) {
    var _this = this;
    this.list.removeAllChildren();
    _.each(e, function(res, i) {
      var lbl = Ti.UI.createLabel({
        height: 50,
        left: 20,
        right: 20,
        width: "100%",
        text: res.formatted_address,
        color: "black",
        touchEnabled: false,
        backgroundColor: "white"
      });
      var view = Ti.UI.createView({
        height: 50,
        touchFeedback: true,
        touchFeedbackColor: "#EEEEEE",
        width: "100%",
        color: "black",
        backgroundColor: "white",
        dataObj: res
      });
      view.add(lbl);
      _this.list.add(view);

      _this.list.add(
        Ti.UI.createView({
          height: 1,
          width: "90%"
        })
      );
      _this.unroll = true;
      if (i > Math.floor(maxHeight / 50)) {
        _this.list.height = _this.unroll ? _this.getHeightMax() : 0;
      } else {
        _this.list.height = _this.unroll ? Ti.UI.SIZE : 0;
      }
    });
  }

  formattedResponse(e) {
    return {
      address_components: e.address_components,
      address: e.formatted_address || "",
      longitude: e.geometry.location.lng || 0,
      latitude: e.geometry.location.lat || 0
    };
  }
}
