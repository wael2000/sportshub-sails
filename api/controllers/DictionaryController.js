/**
 * DictionaryController
 *
 * @description :: Server-side logic for managing Dictionaries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

async = require("async");

module.exports = {
	create: function (req, res) {
		var params = req.params.all();
		var terms = params.terms;
		var deleted = params.deleted;
		_.each(terms, function(term){
			if(term.id) {
				console.log("update");
				console.log(term);
				Dictionary.update({id:term.id},term).exec(function(err,term){});
			}
			else {
				console.log("create");
				console.log(term);
				Dictionary.create(term, function (err, term) {});
			}
		});
		console.log("deleted");
		console.log(deleted);
		Dictionary.destroy({id: deleted}).exec(function (err, deletedTerms){
        });
		return res.json(terms);
	},
	translate : function(req,res) {
		var params = req.params.all()
		async.parallel({
			languages: function(callback){
				 Language.find({},function(err,languages){
					if(err)
						console.log(err);
					callback(null, languages);
				});	
			},
			terms: function(callback){
				Dictionary.find({objectType: params.objectType,objectId:params.objectId, field:params.field},function(err,terms){
					callback(null, terms);
				});	
			}
		},
		function(err, results){
			console.log(results);
			return res.json(results);
		});			
	}
};

