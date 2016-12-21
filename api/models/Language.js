/**
* Language.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	migrate: 'alter',
	schema: true,
	tableName: 'REF_Language',
 	attributes: {
		id: {
			type : 'string',
			required : true,
			max : 2,
			primaryKey: true,
			columnName: 'code'
		},
		name: {
			type : 'string',
			required : true,
			max : 255,
			columnName: 'name'
		}  
	}
};

