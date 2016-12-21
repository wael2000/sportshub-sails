var changeCase = require('change-case')

module.exports = function translate(sails) {
  var stopColumns = ["code","language","object_type","field_name","translation","event_date",
  					 "start_time","end_time","emiratesID","passport_number","birthday",
  					 "telephone","fax","personal_mobile","official_mobile","email","created_by","updated_by"];
   return {
   	initialize: function(cb) {
	   //sails.on('hook:orm:loaded', function() {
		  console.log('translation hook starts');
		  console.log(sails.config.i18n.defaultLocale);
		  
		   for (var key in sails.models) {
				model = sails.models[key];
				for (var attributeKey in model.attributes){
					var columnName=model.attributes[attributeKey].columnName;
					if(columnName && columnName.indexOf('_id')==-1 && stopColumns.indexOf(columnName)==-1){
						var upperCamelColumnName = changeCase.upperCaseFirst(changeCase.camelCase(columnName));
						model.attributes['translate' + upperCamelColumnName] = function() {
							//console.log(arguments.callee.prototype.name);
							return this.translate(arguments.callee.prototype.name);
						}
						model.attributes['translate' + upperCamelColumnName].prototype.name = columnName;
					}
				}
		   }
		  return cb();
	   //});
	}
   }
   
}