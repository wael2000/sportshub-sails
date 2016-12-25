/**
* SportsHuberSport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


var baseModel  = require('./BaseModel'),
    _          = require('lodash');
module.exports = _.merge({}, baseModel, {
	tableName: 'Sportshub_Fav_Sport',
  	attributes: {
    sportsHuber : {
      model : 'sportsHuber',
      columnName: 'sportsHuber_id'
    },
    sport : {
      model : 'sport',
      columnName: 'sport_id'
    }
	}
});
