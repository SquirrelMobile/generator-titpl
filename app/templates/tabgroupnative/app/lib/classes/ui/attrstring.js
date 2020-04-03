//import { underlineall } from "/classes/ui/attrstring";
//label.attributedString = require("core").getAttributed(underlineall(alltext));
exports.underlineall = function(text) {
	return {
		newText: text,
		attrs: [
			{
				words: [text],
				type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
				value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
			},
		],
	};
};

//import { underline } from "/classes/ui/attrstring";
//label.attributedString = require("core").getAttributed(underline(alltext, wordToUnderline));
//label.attributedString = require("core").getAttributed(underline(alltext, [wordToUnderline1, wordToUnderline2]));
exports.underline = function(text, words) {
	return {
		newText: text,
		attrs: [
			{
				words: _.isArray(words) ? words : [words],
				type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
				value: Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
			},
		],
	};
};

//import { colorfont } from "/classes/ui/attrstring";
//label.attributedString = require("core").getAttributed(colorfont(alltext, wordToUnderline, "#000", { fontFamily : "yourFont", fontSize : "yourSize"}));
//label.attributedString = require("core").getAttributed(colorfont(alltext, [wordToUnderline1, wordToUnderline2], "#000", { fontFamily : "yourFont", fontSize : "yourSize"}));
exports.colorfont = function(text, words, color, font) {
	let conf = {
		newText: text,
		attrs: [],
	};
	if (color) {
		conf.attrs.push({
			words: _.isArray(words) ? words : [words],
			type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value: color,
		});
	}
	if (font) {
		conf.attrs.push({
			words: _.isArray(words) ? words : [words],
			type: Ti.UI.ATTRIBUTE_FONT,
			value: font,
		});
	}
	return conf;
};
