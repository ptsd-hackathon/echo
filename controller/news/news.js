const KEY_API = require('../../data-const/post-consts').KEY_API_NEWS;
const HOST = require('../../data-const/post-consts').HOST_NEWS;
var sendReq = require('../post/sendReq');

var postUrl = "https://" + HOST;
var country = 'us';
var formJson = {apiKey : KEY_API, country : country};
var headers = {}

// sendReq.PostRequest(postUrl, formJson, headers);
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(KEY_API);