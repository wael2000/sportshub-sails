/**
* SportsHuber.js
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
	tableName: 'Sportshub_User',
	connection : 'mysqlServer',
  	attributes: {
		firstName: {
			type : 'string',
			required : true,
			minLength: 3,
	    maxLength: 255,
			columnName: 'first_name'
		},
		lastName: {
			type : 'string',
			required : true,
			minLength: 3,
	      	maxLength: 255,
			columnName: 'last_name'
		},
		otp : {
			type : 'string',
			required : false,
			columnName : 'otp'
		},
		gender: {
			type: 'string',
			required : false,
			unique: false,
			columnName : 'gender'
		},
		birthday: {
			type: 'date',
			unique: false,
			required :false,
			columnName : 'birthday'
		},
		localizedBirthday: function (){
			moment.locale(sails.config.i18n.defaultLocale);
		  	return this.birthday?moment(this.birthday).format("Do MMM YYYY"):'';
		},
		mobile : {
			type : 'string',
			required :false,
			unique : true,
			columnName : 'mobile'
		},
		email : {
			type : 'string',
			required : false,
			unique : true,
			columnName : 'email'
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
		},
		notificationLanguage : {
		  model: 'language',
		  required : true,
		  columnName: 'notification_language'
		},
		nationality : {
			model:'country',
			required : false,
			columnName : 'nationality_id'
		},
		translations : {
			collection :'dictionary',
			via : 'sportsHuber'
		},
    otp : {
      model : 'oneTimePassword',
      columnName: 'otp_id',
      required : true
    }

  	},
  	validationMessages: { //hand for i18n & l10n
        email: {
            email: 'Provide valid email address',
            unique: 'Email address  is already registered'
        },
        firstName: {
            required: 'First Name is required',
            minLength: 'First Name has to be at least 5 letters'
        },
        lastName: {
            required: 'Last Name is required',
            minLength: 'Last Name has to be at least 5 letters'
        },
        personalMobile : {
        	unique: 'Personal Mobile is already registered'
        }
    }
});
