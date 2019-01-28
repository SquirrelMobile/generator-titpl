/**
 * @class Lib.dao.database
 * database lib
 */
(function(){

  var db = require('db');

  var _exports = {

      /**
       * reset - description
       *
       * @param  {type} table description
       * @return {type}       description
       */
      reset : function(table){

        db.execute('DELETE FROM '+table);

      },

      /**
       * getAll - description
       *
       * @param  {type} table description
       * @param  {type} where description
       * @return {type}       description
       */
      getAll : function(table, where){

          var w = where || '';
          
          var res = db.execute('SELECT * FROM '+ table+' '+w);

          var all = [], d = null, name = null;

          if(res){

            var nb  = res.getFieldCount();

            while(res.isValidRow()){

                d = {};

                for(var j = 0; j < nb; ++j){

                    name = res.fieldName(j);

                    d[name] = res.fieldByName(name);

                }

                all.push(d);

                res.next();
            }

          }

          return all;

      },

      /**
       * setTable - description
       *
       * @param  {type} nom     description
       * @param  {type} donnees description
       * @return {type}         description
       */
      setTable: function(nom, donnees){

        _exports.reset(nom);

        var req = [],
          elt = null;

        if(donnees.length > 0){
          var props = [];
          var fields = _exports.getInsertFieldTemplate(nom);
          props.push(fields);

          var ligne = '',fct = _exports.getInsertTemplate(nom);

          for(var i=0, n=donnees.length, j = 0, m = 0;i<n;++i){
            elt = donnees[i];
            req.push(fct(elt));
          }
          // Ti.API.log('--- INSERT INTO '+nom);
          // Ti.API.log("props"+ JSON.stringify(props));
          // Ti.API.log('-------------------------');
          // Ti.API.log("req"+ JSON.stringify(req));
          // Ti.API.log('-------------------------');

          var insertReq = 'INSERT INTO '+nom+' ('+props.join(',')+') ',
              iMoinsUn = 0;

          if(req.length>0){

            for(i=400,n=req.length;i<n;i+= 400){

               try{
                db.execute(insertReq+req.slice(iMoinsUn, i+1).join(' UNION '));
              }catch(e){
                Ti.API.error('Erreur d\'insertion dans la table '+nom+' erreur => ' + JSON.stringify(e));
              }

              iMoinsUn = i+1;
            }

            if(iMoinsUn<n){

               try{
                db.execute(insertReq+req.slice(iMoinsUn, n).join(' UNION '));
              }catch(e){
                Ti.API.error('Erreur d\'insertion dans la table '+nom+' erreur => ' + JSON.stringify(e));
              }

            }
          }
        }
    },

    /**
     * set - description
     *
     * @param  {type} nom    description
     * @param  {type} donnee description
     * @return {type}        description
     */
    set: function(nom, donnee){

      if(donnee.id){
        var requeteVide = 'DELETE FROM '+ nom + ' WHERE id = '+donnee.id;
        var res = db.execute(requeteVide);
      }

      var req = [],
        elt = null;

      if(donnee){
        var props = [];
        var fields = _exports.getInsertFieldTemplate(nom);
        props.push(fields);

        var ligne = '',fct = _exports.getInsertTemplate(nom);

        elt = donnee;
        req.push(fct(elt));

        /*Ti.API.log('--- INSERT INTO '+nom);
        Ti.API.log("props"+ JSON.stringify(props));
        Ti.API.log('-------------------------');
        Ti.API.log("req"+ JSON.stringify(req));
        Ti.API.log('-------------------------');*/
        var insertReq = 'INSERT INTO '+nom+' ('+props.join(',')+') '+req[0];
        db.execute(insertReq);

      }
    },

    /**
     * getInsertFieldTemplate - description
     *
     * @param  {type} type description
     * @return {type}      description
     */
    getInsertFieldTemplate: function(type){

      switch(type){
        case 'tableName':
          return ['id', 'field1', 'field2', 'jsonField'];
          break;
        }
    },

    /**
     * getInsertTemplate - description
     *
     * @param  {type} type description
     * @return {type}      description
     */
    getInsertTemplate: function(type){

      switch(type){
        case 'tableName':

          return function(elt){
            return 'SELECT ' +  elt.id                                        +' '+
                        ', "'+  verif(elt.field1)                             +'" '+
                        ', "'+  verif(elt.field2)                             +'" '+
                        ', "'+  verif(JSON.stringify(elt.jsonField))          +'" ';
          };
          break;

      }

      function verif(key){
        return key ? key.replace(/'/g,'\'').replace(/"/g, '\'') : "";
      }

    }
  };

  module.exports = _exports;

})();
