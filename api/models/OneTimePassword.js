/**
* OneTimePassword.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var baseModel  = require('./BaseModel'),
    _          = require('lodash'),
    moment     = require('moment');

module.exports = _.merge({}, baseModel, {
	migrate: 'alter',
	schema: true,
	tableName: 'Sportshub_OTP',
	connection : 'mysqlServer',
  	attributes: {
		otp : {
			type : 'string',
			required : false,
			columnName : 'otp'
		},
		mobile : {
			type : 'string',
			required :false,
			unique : true,
			columnName : 'mobile'
		},
		used : {
			type : 'boolean',
			required :false,
			columnName : 'used'
		},
		createdAt: {
			type: 'datetime',
			defaultsTo: function (){ return new Date(); }
		},
		updatedAt: {
			type: 'datetime',
			defaultsTo: function (){ return new Date(); }
		},
		createdBy : {
			type : 'string',
			required : false,
			columnName : 'created_by'
		},
		updatedBy : {
			type : 'string',
			required : false,
			columnName : 'updated_by'
		}
  	},
  	validationMessages: {
        mobile: {
            unique: 'Mobile is already registered'
        }
    }
});
