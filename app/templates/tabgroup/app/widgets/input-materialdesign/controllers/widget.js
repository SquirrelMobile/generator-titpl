/** @author: Nádson Fernando
 *  @email: nadsonfernando1@gmail.com
 *  @description: controller input
 */

'use strict';

var args = arguments[0] || {};
var _init = {};
var _config = {
	color : {
		pattern : '#aaa',
		post : '#208FE5',
		exceedingColor : "#FF0000"
	},
	duration : 200,
	editable : true,
	exceeding : false,
	up : false
};

var _events = {
	CLICK : 'click',
	FOCUS : 'focus',
	BLUR : 'blur',
	CHANGE : 'change'
};

var mask = {
	NUMBER : {
		type : 'number',
		exp : /^[0-9]+$/
	},
	CUSTOM : {
		exp : ''
	}
};

var _animation = {
	ANIMATION_UP : function() {
		if (!_config.editable)
			return;

		var color = _config.exceeding ? _config.color.exceeding : _config.color.post;

		_.defer(function() {
			$.footer.animate({
				"backgroundColor" : color,
				"height" : 2
			});
		});

		_.defer(function() {
			$.hint.animate({
				"top" : 0,
				"color" : color,
				"transform" : Ti.UI.create2DMatrix().scale(0.7),
				"left" : Ti.Platform.osname == "android" ? (-configHintSize() + 2) : -configHintSize(), //Fix hint being cut off on Android
				"duration" : _config.duration
			});
		});
		_config.up = true;
	},

	ANIMATION_DOWN : function() {
		if (!_config.editable)
			return;

		var color = _config.exceeding ? _config.color.exceeding : _config.color.pattern;
		_.defer(function() {
			$.footer.animate({
				"backgroundColor" : color,
				"height" : 1
			});
		});

		var attrsHint = {
			"top" : $.textfield.top,
			"color" : color,
			"transform" : Ti.UI.create2DMatrix().scale(1),
			"left" : 0,
			"duration" : _config.duration
		};

		if ($.textfield.getValue()) {
			attrsHint["top"] = 0;
			attrsHint["transform"] = Ti.UI.create2DMatrix().scale(0.7);
			attrsHint["left"] = -configHintSize();
		}
		$.hint.animate(attrsHint);

		_config.up = false;
	}
};

function resetColorWarning() {
	_config.exceeding = false;
	$.footer.backgroundColor = _config.color.pattern;
	$.counter["color"] = _config.color.pattern;
	$.hint.color = _config.color.pattern;
}

function minMaxLength(event) {
	var eventSize = event.value.length;

	if (eventSize == 0 && !_config.up) {
		$.counter.animate({
			"right" : -64,
			"duration" : 350
		});
		resetColorWarning();

		return;

	} else if (eventSize == 1) {
		$.counter.animate({
			right : 0,
			duration : 350
		});
	}

	if (eventSize < _init.minLength || eventSize > _init.maxLength)
		exceeding();
	else if ($.footer.backgroundColor != _config.color.post)
		notExceeding();

	$.counter.setText(eventSize + " / " + _init.maxLength);
}

function exceeding() {
	_config.exceeding = true;

	$.footer.backgroundColor = _config.color.exceeding;
	$.counter["color"] = _config.color.exceeding;
	$.hint.color = _config.color.exceeding;
}

function notExceeding() {
	_config.exceeding = false;

	$.footer.backgroundColor = _config.color.post;
	$.counter["color"] = "#000";
	$.hint.color = _config.color.post;
}

function configHintSize() {
	var sizeHint = _.size($.hint.getText());
	sizeHint += sizeHint * (Number(sizeHint) > 25 ? 0.20 : 0.10);

	return sizeHint;
}

function validation(evt) {

	var value = $.textfield.getValue().toString();

	if (_init.toUpperCase)
		$.textfield.setValue(value.toUpperCase());

	if (_init.mask) {

		if (_init.mask == mask.NUMBER.type)
			$.textfield.setValue(regExp(value, mask.NUMBER.exp));
		else
			$.textfield.setValue(regExp(value, mask.CUSTOM.exp));
	}
}

function regExp(value, regExp) {
	var expression = value.match(regExp);
	return expression ? expression.toString() : "";
}

/**
 * apply properties to widget
 * @param {Object} properties
 */
function applyProperties(properties) {
	if (_.isObject(properties)) {
		if (_.has(properties, 'colorFocus')) {
			_config.color.post = properties.colorFocus;
		}
		if (_.has(properties, 'colorPattern')) {
			_config.color.pattern = properties.colorPattern;
		}

		if (_.has(properties, 'exceedingColor')) {
			_config.color.exceeding = properties.exceedingColor;
		}

		if (_.has(properties, 'animationDuration')) {
			config.duration = properties.animationDuration;
		}

		_init = {
			titleHint : properties.titleHint,
			width : properties.width,
			top : properties.top,
			left : properties.left,
			right : properties.right,
			bottom : properties.bottom,
			colorFont : properties.colorFont,
			keyboardType : properties.keyboardType,
			returnKey : properties.returnKey,
			password : properties.password,
			editable : properties.editable,
			maxLength : properties.maxLength,
			minLength : properties.minLength,
			toUpperCase : properties.toUpperCase,
			mask : properties.mask,
			autocapitalization : properties.autocapitalization,
			autocorrect : properties.autocorrect,
			tintColor : properties.tintColor,
			required : false
		};

		if (_.has(properties, 'required')) {
			_init.required = properties.required;
		}

		if ( typeof _init.editable == "string")
			_init.editable = eval(_init.editable);

		if (_.has(properties, 'titleHintVisible')) {
			$.hint.setVisible(properties.titleHintVisible);
		}

		/**
		 * attrs element {id} container
		 */
		if (_init.width)
			$.container.setWidth(_init.width);

		if (_init.top)
			$.container.setTop(_init.top);

		if (_init.bottom)
			$.container.setBottom(_init.bottom);

		if (_init.left)
			$.container.setLeft(_init.left);

		if (_init.right)
			$.container.setRight(_init.right);

		if (_init.colorFont)
			$.textfield.setColor(_init.colorFont);

		if (OS_IOS && _init.colorFont)
			$.textfield.setTintColor(_init.colorFont);

		if (_init.keyboardType)
			$.textfield.setKeyboardType(_init.keyboardType);

		if (_init.returnKey)
			$.textfield.setReturnKeyType(_init.returnKey);

		if (_init.password)
			$.textfield.setPasswordMask(_init.password);

		if (_init.mask != mask.NUMBER.type)
			mask.CUSTOM.exp = eval(_init.mask);

		if (_init.autocapitalization !== null)
			$.textfield.setAutocapitalization(_init.autocapitalization);

		if (_init.autocorrect !== null)
			$.textfield.setAutocorrect(_init.autocorrect);

		if (_.has(properties, 'titleHint')) {
			$.hint.setText(properties.titleHint);
		}

		$.hint.setColor(_config.color.pattern);
		$.footer.setBackgroundColor(_config.color.pattern);

		if (_init.editable == false) {
			$.container.setOpacity(0.3);
			$.textfield.setEditable(false);

			_config.editable = false;
		}
	}
};

(function() {
	applyProperties(args);
	$.textfield.addEventListener(_events.FOCUS, _animation.ANIMATION_UP);
	$.textfield.addEventListener(_events.CHANGE, function(event) {
		validation(event);

		if (_init.required) {
			if ($.textfield.getValue()) {
				notExceeding();
				$.required.setText("");
			}
		}

		if (_init.maxLength)
			minMaxLength(event);
	});
	$.textfield.addEventListener(_events.BLUR, function(event) {
		_animation.ANIMATION_DOWN(event);

		if (_init.maxLength)
			minMaxLength(event);

		if (_init.required) {
			if (!$.textfield.getValue()) {
				exceeding();
				$.required.setText(_init.required);
			}
		}
	});
})();

exports.getValue = function() {
	return $.textfield.getValue();
};

exports.ANIMATION_UP = function() {
	_animation.ANIMATION_UP();
};

exports.ANIMATION_DOWN = function() {
	_animation.ANIMATION_DOWN();
};

exports.setValue = function(value, up) {
	if (up)
		_animation.ANIMATION_UP();

	$.textfield.setValue(value);
};

exports.listener = function(event, callback) {
	$.textfield.addEventListener(event, function(e) {
		callback(e);
	});
};

exports.blur = function(toFocus) {
	$.textfield.blur();
};

exports.focus = function() {
	$.textfield.focus();
};

exports.applyProperties = applyProperties;
