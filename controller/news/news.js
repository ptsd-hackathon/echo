const KEY_API = require('../../data-const/post-consts').KEY_API_NEWS;
const HOST = require('../../data-const/post-consts').HOST_NEWS;

var country = 'il';
var language = 'en';
var category = 'politics';
var fromDate = '2019-02-03';
var toDate = '2019-03-03';
var sources = 'bbc-news,the-verge';
var sortBy = 'relevancy';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(KEY_API);
// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
function TopHeadlines(category, language, country){
    newsapi.v2.topHeadlines({
        // q: 'trump',
        category: category,
        language: language,
        country: country,
    }).then(response => {
        console.log(response.articles[0].title + response.articles[0].description + '\n');
    });
}

function EveryArticle(fromDate, toDate, language, sources, sortBy){
    newsapi.v2.everything({
        sources: sources,
        from: fromDate,
        to: toDate,
        language: language,
        sortBy: sortBy,
    }).then(response => {
        console.log(response.articles[0].title + " " + response.articles[0].description + '\n');
    });
}

module.exports = { EveryArticle, TopHeadlines};

// TopHeadlines(category , language, country);