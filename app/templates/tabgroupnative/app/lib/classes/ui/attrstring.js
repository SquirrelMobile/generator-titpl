exports.getObjAttr = function(text, word) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: Alloy.CFG.FONTS.bold, fontSize: 14 }
      },
      {
        words: [word],
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "white"
      }
    ]
  };
};

exports.getLoseAttr = function(text, word) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-SemiBold", fontSize: 14 }
      },
      {
        words: [word],
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "#E36051"
      }
    ]
  };
};

exports.getWinnerAttr = function(text, word) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-SemiBold", fontSize: 14 }
      },
      {
        words: [word],
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "#3C4BF0"
      }
    ]
  };
};

exports.getLevelAttr = function(text, words) {
  return {
    newText: text,
    attrs: [
      {
        words: words,
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-SemiBold", fontSize: 14 }
      },
      {
        words: words,
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "white"
      },
      {
        words: [words[1]],
        type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
        value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE
      }
    ]
  };
};

exports.getNameAttr = function(text, word) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-Bold", fontSize: 14 }
      }
    ]
  };
};

exports.getRuleAttr = function(text, words) {
  return {
    newText: text,
    attrs: [
      {
        words: words,
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-Bold", fontSize: 14 }
      },
      {
        words: words,
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "white"
      }
    ]
  };
};

exports.getLevelHomeAttr = function(text, words) {
  return {
    newText: text,
    attrs: [
      {
        words: words,
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-SemiBold", fontSize: 14 }
      },
      {
        words: words,
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "#0B0D2B"
      },
      {
        words: [words[1]],
        type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
        value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE
      },
      {
        words: [words[0]],
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "#3C4BF0"
      }
    ]
  };
};

exports.getUnderlineAttr = function(text, word) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
        value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE
      }
    ]
  };
};

exports.getLevelsAttr = function(text, word) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-SemiBold", fontSize: 26 }
      },
      {
        words: [word],
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "#3C4BF0"
      }
    ]
  };
};

exports.getRatioAttr = function(text, word) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-SemiBold", fontSize: 14 }
      },
      {
        words: [word],
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: "white"
      }
    ]
  };
};

exports.getPointAttr = function(text, word, color) {
  return {
    newText: text,
    attrs: [
      {
        words: [word],
        type: Ti.UI.ATTRIBUTE_FONT,
        value: { fontFamily: "SourceSansPro-SemiBold", fontSize: 43 }
      },
      {
        words: [word],
        type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
        value: color || "white"
      }
    ]
  };
};
