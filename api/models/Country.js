/**
* Country.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


var baseModel  = require('./BaseModel'),
    _          = require('lodash');
module.exports = _.merge({}, baseModel, {
	//migrate: 'alter',
	//schema: true,
	tableName: 'REF_Country',
	//connection : 'mysqlServer',
  	attributes: {
		/*id: {
			type : 'string',
			required : true,
			max : 3,
			primaryKey: true,
			columnName: 'code'
		},*/
		code: {
			type : 'string',
			required : true,
			max : 3,
			columnName: 'code'
		},
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
			via : 'country'
		}  
	}
});

