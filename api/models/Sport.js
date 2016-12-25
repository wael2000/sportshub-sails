/**
* Sport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


var baseModel  = require('./BaseModel'),
    _          = require('lodash');
module.exports = _.merge({}, baseModel, {
	tableName: 'REF_Sport',
  	attributes: {
		name: {
			type : 'string',
			required : true,
			max : 255,
			columnName: 'name'
		},
		createdAt: {
			type: 'datetime',
			defaultsTo: function (){ return new Date(); }
		},
		updatedAt: {
			type: 'datetime',
			defaultsTo: function (){ return new Date(); }
		},
		translations : {
			collection :'dictionary',
			via : 'sport'
		}
	}
});
