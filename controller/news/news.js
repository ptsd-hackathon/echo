const KEY_API = require('../../data-const/post-consts').KEY_API_NEWS;
const HOST = require('../../data-const/post-consts').HOST_NEWS;
const NEWS_CONSTS = require('../../data-const/news-consts');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(KEY_API);
// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
function TopHeadlines(category, language, country, callback){
    return newsapi.v2.topHeadlines({
        // q: 'trump',
        category: category,
        language: language,
        country: country,
    }).then(callback);
}

/**
 * @return {string}
 */
function ReturnedContent(response) {
    let concArticles = "";
    response.articles.forEach(function(entry) {
        concArticles+= "\n\n"+entry.title+"\n"+entry.description
    })
    return concArticles;//response.articles[0].title + " " + response.articles[0].description + '\n'
}

function EveryArticle(fromDate, toDate, language, sources, sortBy, callback){
    return newsapi.v2.everything({
        sources: sources,
        // from: fromDate,
        // to: toDate,
        language: language,
        sortBy: sortBy,
    }).then(callback);
}

module.exports = { EveryArticle, TopHeadlines, ReturnedContent};
