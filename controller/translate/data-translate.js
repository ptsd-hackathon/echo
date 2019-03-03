const KEY_API = require('../../data-const/post-consts').KEY_API_TRANSLATE;
const HOST = require('../../data-const/post-consts').HOST_TRANSLATE;
var sendReq = require('../post/sendReq');

var postUrl = "https://" + HOST;
var newsDoc = 'מה קורה גבר';
var formJson = {key : KEY_API, lang : 'he-en', text: newsDoc};
var headers = {}

sendReq.PostRequest(postUrl, formJson, headers);