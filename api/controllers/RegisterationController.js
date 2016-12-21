/**
 * RegistrationController
 *
 * @description :: Server-side logic for managing SportsHubers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
async = require("async");

module.exports = {
	requestOTP : function(req,res) {
		var params = req.params.all();
		RegisterationService.requestOTP(params.mobile, function (response) {
			return res.json(response);
		});
	},
	resendOTP : function(req,res) {
		var params = req.params.all();
		RegisterationService.resendOTP(params.mobile, function (response) {
			return res.json(response);
		});
	},
	register : function(req,res) {
		var params = req.params.all();
		RegisterationService.register(params, params.otp, function (response) {
			return res.json(response);
		});
	},
};
