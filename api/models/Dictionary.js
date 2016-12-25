/**
* Dictionary.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	migrate: 'alter',
	schema: true,
	tableName: 'REF_Dictionary',
  	attributes: {
  		language : {
			model:'language',
			required : true,
			columnName : 'language'
		},
		objectType: {
			type : 'string',
			required : true,
			max : 20,
			columnName: 'object_type'
		},
		objectId : {
			type : 'integer',
			required : true,
			columnName: 'object_id'
		},
		field: {
			type : 'string',
			required : true,
			max : 30,
			columnName: 'field_name'
		},
		translation: {
			type : 'string',
			required : true,
			max : 2,
			columnName: 'translation'
		},
		country : {
			model : 'country',
			columnName: 'object_id'
		},
		sportsHuber : {
			model : 'sportsHuber',
			columnName: 'object_id'
		},
		sport : {
			model : 'sport',
			columnName: 'object_id'
		}
  }
};
