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
			if(response.response=="otp_sent") {
				var messages = {
				  "messages": [
				    {
				      "source": "nodeJS",
				      "from": "sportsHub",
				      "body": "Your sportsHub OTP is " + response.otp + ", This OTP is valid for the next 10 minutes.",
				      "to": params.mobile,
				      "schedule": 1436874701,
				      "custom_string": "this is a test"
				    }
				  ]
				};
				NotificationService.sendSms(messages,function(responseMsg,obj1,obj2) {
						return res.json(response);
				});
			} else
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
