// NotificationService.js - in api/services
var plivo = require('plivo');
var clicksend = require('clicksend');

module.exports = {
  sendSms: function (messages, callback) {
      clicksend.SMSController.sendSms(messages, callback);
   },

  sendSMSPlivo : function(msg) {
    var p = plivo.RestAPI({
      authId: 'MAZTA5ZTA3YWIYYTCZMM',
      authToken: 'ZDJkMmVmOTEwMTViMTFmODBlN2M4OTk2YjBmZTg0'
    });
    var params = {
      'src': '+971524393220', // Sender's phone number with country code
      'dst' : msg.mobile , // Receiver's phone Number with country code
      'text' : "Hi, Your SportsHub verification code is" + msg.otp, // Your SMS Text Message - English
      //'url' : "http://example.com/report/", // The URL to which with the status of the message is sent
      'method' : "GET" // The method used to call the url
    };
    // Prints the complete response
    p.send_message(params, function (status, response) {
      console.log('Status: ', status);
      console.log('API Response:\n', response);
      console.log('Message UUID:\n', response['message_uuid']);
      console.log('Api ID:\n', response['api_id']);
    });
  }

};
