var KEY_API = require('../../data-const/post-consts').KEY_API;
const HOST = require('../../data-const/post-consts').HOST;
var request = require('request');

var postUrl = "https://" + HOST;
var formJson = {key : KEY_API, lang : 'en-he', text: 'how are you'};

request.post({url: postUrl , form: formJson}, function(err, res, body){
    console.log(body);
    // console.log(res);
    console.log(res.statusCode);
});
