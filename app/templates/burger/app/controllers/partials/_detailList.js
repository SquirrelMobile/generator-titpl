/**
 * @class Controller.home
 * Display home view
 *
 */
import { Photo } from "classes/photos";
var currentData = [];
var filter = null;
var listType = "list";
/**
 * @method Controller
 * Display home view, load home
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
  $.navbar.load({
    logo: {
      visible: true
    },
    burger: {
      visible: true
    }
  });

  Alloy.CFG.baseurl = "https://jsonplaceholder.typicode.com";
  require("net/apiconfig").init();
  _.defer(function() {
    load();
  });
  if (OS_ANDROID) {
    $.list.header.on("change", function(e) {
      Alloy.Globals.log.info(e.row);
      if (e.row.id === "filter") {
        filter = e.row.val;
        displayList();
      }
      if (e.row.id === "style") {
        listType = e.row.val;
        displayList();
      }
    });
  }
})($.args);

function displayList() {
  if (listType === "list") {
    populateData();
  } else {
    populateDatainColumn();
  }
}

function load() {
  Alloy.Globals.Api.photos({}, function(response) {
    currentData = response;
    displayList();
  });
}

function populateData() {
  var items = _.chain(currentData)
    .sortBy(function(obj) {
      var currentFilter = filter === "name" ? "title" : "id";
      return obj[currentFilter];
    })
    .map(function(obj) {
      var photo = new Photo(obj);
      return {
        properties: _.extend(photo, {
          accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
        }),
        template: "photo",
        title: {
          text: photo.title
        },
        image: {
          image: photo.thumbnailUrl
        }
      };
    })
    .value();

  $.list.load([Ti.UI.createListSection({ items: items })]);
}

function populateDatainColumn() {
  var tab = [];
  var data = _.sortBy(currentData, function(obj) {
    var currentFilter = filter === "name" ? "title" : "id";
    return obj[currentFilter];
  });
  for (var i = 0; i < data.length; i += 3) {
    var photo1 = new Photo(data[i]);
    var properties = {
      elem1: photo1
    };
    var obj = {
      template: "column",
      elem1: {
        image: photo1.thumbnailUrl
      }
    };
    if (data[i + 1]) {
      var photo2 = new Photo(data[i + 1]);
      properties = _.extend(properties, {
        elem2: photo2
      });
      obj["elem2"] = {
        image: photo2.thumbnailUrl
      };
    }

    if (data[i + 2]) {
      var photo3 = new Photo(data[i + 2]);
      properties = _.extend(properties, {
        elem3: photo3
      });
      obj["elem3"] = {
        image: photo3.thumbnailUrl
      };
    }
    obj["properties"] = properties;

    tab.push(obj);
  }

  $.list.load([Ti.UI.createListSection({ items: tab })]);
}

function handleClick(e) {
  Alloy.Globals.log.info("test" + e.bindId);
  var obj = {
    controller: "win",
    data: {
      controller: "partials/_detail",
      navbar: {
        back: {
          visible: true
        },
        title: {
          visible: true,
          text: listType === "list" ? e.title : e[e.bindId].title
        }
      },
      data: listType === "list" ? e : e[e.bindId]
    }
  };
  Alloy.Globals.events.trigger("openWindow", obj);
}

var urlExample =
  "https://www.squirrel.fr/wp-content/uploads/2016/06/Livre-blanc-1.pdf";
function headerClick(e) {
  if (e.source.id === "btnPdf") {
    Alloy.Globals.loading.show();
    var client = Ti.Network.createHTTPClient({
      onload: function(e) {
        var f = Ti.Filesystem.getFile(
          Ti.Filesystem.applicationDataDirectory,
          "file.pdf"
        );
        f.write(this.responseData);
        if (OS_IOS) {
          var docViewer = Ti.UI.iOS.createDocumentViewer({ url: f.nativePath });
          docViewer.show();
        } else {
          var win = $.UI.create("Window");
          var pdfView = require("fr.squirrel.pdfview").createView({
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            file: f
          });
          win.add(pdfView);
          win.open();
        }

        Alloy.Globals.loading.hide();
      },
      onerror: function(e) {
        Alloy.Globals.loading.hide();
      }
    });
    client.open("GET", urlExample);
    client.send();
  }
}

function handleChange(e) {
  if (e.row.id === "filter") {
    filter = e.row.val;
    displayList();
  }
  if (e.row.id === "style") {
    listType = e.row.val;
    displayList();
  }
}
