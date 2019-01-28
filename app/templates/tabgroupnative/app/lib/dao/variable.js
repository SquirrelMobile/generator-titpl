/**
 * @class Lib.dao.variable
 * variable lib
 */
(function(){

	var db = require('db');

	var _exports = {

		/**
		 * getAll - description
		 *
		 * @return {type}  description
		 */
		getAll: function(){

			var res = db.execute('SELECT key_ AS cle, value AS valeur FROM variable');

			var all = {};

			while(res.isValidRow()){

				all[res.fieldByName('cle')] = {valeur : res.fieldByName('valeur')};

				res.next();
			}

			return all;
		},

		/**
		 * get - description
		 *
		 * @param  {type} key description
		 * @return {type}     description
		 */
		get: function(key){

			var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', key);

			if(res.isValidRow()){

				return res.fieldByName('valeur');

			}

			return null;
		},

		/**
		 * getBool - description
		 *
		 * @param  {type} key description
		 * @return {type}     description
		 */
		getBool: function(key){

			var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', key);

			if(res.isValidRow()){

				return res.fieldByName('valeur') == '1';

			}

			return null;
		},

		/**
		 * getInt - description
		 *
		 * @param  {type} key description
		 * @return {type}     description
		 */
		getInt: function(key){

			var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', key);

			if(res.isValidRow()){

				return parseInt(res.fieldByName('valeur')) || 0;

			}

			return null;
		},

		/**
		 * getJSON - description
		 *
		 * @param  {type} key description
		 * @return {type}     description
		 */
		getJSON: function(key){

			var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', key);

			if(res.isValidRow()){

				if(res.fieldByName('valeur')){

					return JSON.parse(res.fieldByName('valeur'));

				}else{

					null;

				}

			}

			return null;
		},

		/**
		 * remove - description
		 *
		 * @param  {type} key description
		 * @return {type}     description
		 */
		remove: function(key){

			var res = db.execute('DELETE FROM variable WHERE key_ = ?', key);

			return null;
		},

		/**
		 * set - description
		 *
		 * @param  {type} cle    description
		 * @param  {type} valeur description
		 * @return {type}        description
		 */
		set: function(cle, valeur){

			var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', cle);

			if(res.isValidRow()){

				if(res.fieldByName('valeur') !== valeur){

					db.execute('UPDATE variable SET value = ? WHERE key_ = ?', valeur, cle);

				}

			}else{

				db.execute('INSERT INTO variable (key_, value) VALUES (?, ?) ', cle, valeur);

			}

		}
	};

	module.exports = _exports;

})();
