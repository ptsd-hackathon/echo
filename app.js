var express = require("express");
var news = require("./controller/news/news");
var translator = require("./controller/translate/data-translate");
const HOST_TRANSLATE = require('./data-const/post-consts').HOST_TRANSLATE;
const NEWS_CONSTS = require('./data-const/news-consts');
const nlp = require('./controller/nlp/nlp');
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
        console.log(textToTranslate);
        translator.TranslateHeToEn(textToTranslate, (translatorErr, translatorRes, translatorBody) => {
            translatedText = (JSON.parse(translatorBody).text[0]);
            console.log(translatedText)
            nlp.GetLocationFromMetadata(translatedText,value => {
                let mashu = []
                for(let i = 0; i < value.response.entities.length; i++){
                    // for(let j=0; j<value.response.entities[i].type.length;j++){
                    //     let relationToParent = value.response.sentences[i].words[j]
                    // if(value.response.entities[i].type.indexOf("Place") > -1){
                    //     mashu.push(value.response.sentences[i].words[j].token);
                    // }

                    if(value.response.entities[i].type && value.response.entities[i].type.indexOf("Company") > -1){
                        mashu.push(value.response.entities[i].entityId);
                    }
                    // }
                }
                console.log(mashu);
                res.send(mashu);
            });
        });

        }
    );
})