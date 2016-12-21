// TranslationService.js - in api/services
module.exports = {
    languageList: function() {
       Language.find({},function(err,languages){
       		if(err)
       			console.log(err);
			return languages;
		});	
    }
};