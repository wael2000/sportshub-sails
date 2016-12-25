/**
 * SportsHuberController
 *
 * @description :: Server-side logic for managing SportsHubers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
async = require("async");

module.exports = {
	list : function(req,res) {
		var params = req.params.all();
		var criteria = {};
		if(params.search) {
			var search = '%' + params.search + '%';
			criteria = {or :[
							{ name: { 'like': search  }},
							{ email: { 'like': search }},
							{ officialMobile: { 'like': search }}
						    ]
						};
		}
		SportsHuber.find(criteria).
				populate('nationality').
				exec(function(err,sportsHubers){
				if(err)
					return res.json({"response":"error", "message" : "SportsHubers cant not be retreived"});
				return res.view({sportsHubers:sportsHubers,msg:'',search:params.search});
		});
	},
	create : function(req,res) {
		res.locals.flash = _.clone(req.session.flash);
		req.session.flash=null;

		async.parallel({
			countries: function(callback){
				Country.find({}).populate('translations',{objectType:'country',language:sails.config.i18n.defaultLocale}).exec(function(err,countries){
					callback(null, countries);
				});
			},
			languages : function(callback){
				Language.find({}).exec(function(err,languages){
					callback(null, languages);
				});
			},
			sports : function(callback){
				Sport.find({}).exec(function(err,sports){
					callback(null, sports);
				});
			}
		},
		function(err, results){
			res.view({sportsHuber:res.locals.flash?res.locals.flash.params:{pa:{}},msg:'',data:results});
		});

	},
	view : function(req,res) {
		res.locals.flash = _.clone(req.session.flash);
		req.session.flash = null;
		var params = req.params.all();
		SportsHuber.findOne(params.id).exec(function(err,sportsHuber){
			async.parallel({
				nationality: function(callback){
					if(sportsHuber.nationality) {
						Country.findOne(sportsHuber.nationality).exec(function(err,nationality){
							Dictionary.find({objectType:'country',objectId:nationality.id, field:'name'},function(err,terms){
								nationality.translations = terms;
								callback(null, nationality);
							});
						});
				} else
					callback(null, null);

				}
			},
			function(err, associations) {
				sportsHuber.nationality=associations.nationality;
				return res.view({msg:res.locals.flash,sportsHuber:sportsHuber});
			});

		});
	},
	save : function(req,res) {
		var params = req.params.all();
		if(params.id) {
			SportsHuber.update({id:params.id},params).exec(function(err,sportsHuber){
				if(err){
					console.log(err);
					return res.view('/sportsHuber/create',{sportsHuber:sportsHuber,msg: "SportsHuber can't not be saved",err:err});

				}
			});
		} else {
			delete params.id;
			SportsHuber.create(params).exec(function (err, sportsHuber) {
					if(err){
						req.session.flash = {err:err.Errors,params:params};
						return res.redirect('/sportsHuber/create');
					}
					req.session.flash = "SportsHuber is successfully saved";
					return res.redirect('/sportsHuber/view/' + sportsHuber.id);
			});
		}
	}
};
