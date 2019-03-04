var express = require("express");
var news = require("./controller/news/news");
var translator = require("./controller/translate/data-translate");
const HOST_TRANSLATE = require('./data-const/post-consts').HOST_TRANSLATE;
const NEWS_CONSTS = require('./data-const/news-consts');
var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", function (req, res){
    res.send("HABATZORET KEN KEN HABATZORET\n\n\n\n\n\n <h1>DRORRRRRRRRRRRR</h1>");
})

app.get("/newsJson", function(req, res){
    var textToTranslate, translatedText;
    news.EveryArticle(NEWS_CONSTS.fromDate, NEWS_CONSTS.toDate, NEWS_CONSTS.language, NEWS_CONSTS.sources, NEWS_CONSTS.sortBy, next => {
        textToTranslate = news.ReturnedContent(next);
        translator.TranslateHeToEn(textToTranslate, (translatorErr, translatorRes, translatorBody) => {
            res.send((JSON.parse(translatorBody).text[0]));
        });
        }
    );

})