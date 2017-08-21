/**
 * @class Lib.data
 * data lib
 */
(function(){

  var w = {

    /**
     * data - description
     *
     * @return {type}  description
     */
    data : function(){

      return [];

    },

    /**
     * dataList - description
     *
     * @return {type}  description
     */
    dataList : function(){

      return [
        {
          "id": 1,
          "name": "Item 1",
          "position": 1
        },
        {
          "id": 2,
          "name": "Item 2",
          "position": 2
        },
        {
          "id": 3,
          "name": "Item 3",
          "position": 3
        },
        {
          "id": 4,
          "name": "Item 4",
          "position": 4
        }
      ];

    },

    /**
     * dataSectionList - description    
     *
     * @return {type}  description
     */
    dataSectionList : function(){

      return [
        {
          "id": 1,
          "name": "Section 1",
          "position": 1
        },
        {
          "id": 2,
          "name": "Section 2",
          "position": 2
        },
      ];
    }
  };

  module.exports = w;

})();
