// RegistrationService.js - in api/services
async = require("async");

module.exports = {

	generateOTP: function() {
			var num = Math.floor(Math.random() * 9000) + 1000;
      return num;
  },
  requestOTP: function(mobile,callback) {
  	// check if mobile already registered, otherwise generate OTP and send it
  	// to registered mobile number
  	OneTimePassword.findOne({mobile: mobile}).exec(function (err,oneTimePassword){
			if(err)
				callback({"response":"error", "message" : "Error validating mobile!"});
			if(oneTimePassword) {
				// this mobile is already registered
				callback({"response":"already_registered", "message" : "This mobile is already registered!"});
			}  else {
				// OPT is generate and sent to your mobile
				var otp= RegisterationService.generateOTP();
				OneTimePassword.create({otp:otp,mobile:mobile}).exec(function (err, oneTimePassword) {
						if(err) {
							callback({"response":"error", "message" : "Can't register mobile, try again later","mobile": mobile});
						} else {
							callback({"response":"otp_sent", "message" : "OTP is sent to mobile","otp": otp});
					  }
				});
			}
		});
  },
	resendOTP: function(mobile,callback) {
  	// check if mobile already registered, otherwise generate OTP and send it
  	// to registered mobile number
  	OneTimePassword.findOne({mobile: mobile}).exec(function (err,oneTimePassword){
			if(err)
				callback({"response":"error", "message" : "Error validating mobile!"});
			if(oneTimePassword) {
				// this mobile is already registered, generate another OTP and send it
				var otp= RegisterationService.generateOTP();
				OneTimePassword.update({id:oneTimePassword.id},{otp:otp,mobile:mobile}).exec(function (err, oneTimePassword) {
						if(err) {
							callback({"response":"error", "message" : "Can't resend OTP, try again later","mobile": mobile});
						} else {
							NotificationService.sendSMS({otp:otp,mobile:mobile});
							callback({"response":"otp_sent", "message" : "OTP is re-sent to your mobile","opt": otp});
					  }
				});
			}  else {
				callback({"response":"not_registered", "message" : "This mobile is not registered!"});
			}
		});
  },
	// testing the api
	// http://localhost:1337/registeration/register?firstName=wael&lastName=eldoamiry&mobile=09716655431&gender=male&email=wael@wael.com&notificationLanguage=en&otp=1234
	register: function(detachedSportsHuber,otp,mainCallback) {
		// check if mobile and opts exist and no account was created for the same
		OneTimePassword.findOne({otp:otp,mobile:detachedSportsHuber.mobile},function(err,oneTimePassword) {
			if(err)
				mainCallback({"response":"error", message: "SportsHuber can't be registered, try again later", "error" : err});
			else if(oneTimePassword){
				if(oneTimePassword.used!=null)
					mainCallback({"response":"error", message: "this mobile number is already registered, you can request new OTP!"});
				else {
					// register the user
					async.parallel({
						sportsHuber: function(callback){
							detachedSportsHuber.otp = oneTimePassword.id;
							SportsHuber.create(detachedSportsHuber).exec(function (err, sportsHuber) {
									if(err)
										callback({"response":"error", message: "SportsHuber can't be registered, try again later", "error" : err}, sportsHuber);
									else
										callback(null,{"response":"ok",sportsHuber:sportsHuber , message: "SportsHuber is successfully registered"});
							});
						},
						otp : function(callback){
								oneTimePassword.used = true;
								OneTimePassword.update({id:oneTimePassword.id} , oneTimePassword).exec(function(err,oneTimePassword){
									if(err)
											callback({"response":"error", message: "SportsHuber can't be registered, try again later", "error" : err}, oneTimePassword);
										else
											callback(null,{"response":"ok",oneTimePassword:oneTimePassword , message: "OneTimePassword is marked as used"});
									});
						},
					},
					function(err, results){
								if(err)
									mainCallback({"response":"error", message: "SportsHuber can't be registered, try again later", "error" : err});
								else
									mainCallback({"response":"ok",id:results.sportsHuber.id , message: "SportsHuber is successfully registered", details:results});
					});


				}

			} else
				mainCallback({"response":"error", message: "Invalid mobile and OTP combination"});
		});



  },



};
