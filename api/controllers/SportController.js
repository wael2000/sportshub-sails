/**
 * SportController
 *
 * @description :: Server-side logic for managing Countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list : function(req,res) {
		//ip = request.headers["x-forwarded-for"] || request.connection.remoteAddress
		var params = req.params.all();
		var criteria = {};
		if(params.search) {
			var search = '%' + params.search + '%';
			criteria = { name: { 'like': search  }};
		}
		Sport.find(criteria).
				exec(function(err,sports){
				if(err)
					return res.json({"response":"error", "message" : "Sports cant not be retreived"});
				return res.view({sports:sports,msg:'',search:params.search});
		});
	},
};
