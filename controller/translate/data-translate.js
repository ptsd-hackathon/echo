const KEY_API = require('../../data-const/post-consts').KEY_API_TRANSLATE;
const HOST = require('../../data-const/post-consts').HOST_TRANSLATE;

var sendReq = require('../post/sendReq');

function TranslateHeToEn(text, callback){
    var headers = {};
    var formJson = {key : KEY_API, lang : 'he-en', text: text};
    var postUrl = "https://" + HOST;

    sendReq.PostRequest(postUrl, formJson, headers, callback);
    }

module.exports = {TranslateHeToEn}