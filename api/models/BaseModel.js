/**
* BaseModel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	migrate: 'alter',
	schema: true,
	connection : 'mysqlServer',	
  	attributes: {
		translate: function(field){
			if(this.translations.length>0)
				for(var index=0;index<this.translations.length;index++){
					if(this.translations[index].field==field && this.translations[index].language==sails.config.i18n.defaultLocale){
						return this.translations[index].translation;
					}
				}
			return this[field];
		}
   }
}