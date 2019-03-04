const TextRazor = require('textrazor');
const textRazor = new TextRazor('d57ee749a1c8ef620d105548b7611647534b4519a46cdd78ed2bc2ec')
const content = 'The Federal Reserve is the enemy of Ron Paul.'
const options = { extractors: 'entities,topics,relations' }

function getRootOfSentence(content,options) {
    return textRazor.exec(content, options)
        .then(value => {
            let mashu = [];

            for(let i = 0; i < value.response.sentences.length; i++){
                for(let j=0; j<value.response.sentences[i].words.length;j++){
                    let relationToParent = value.response.sentences[i].words[j]
                    if(!relationToParent.hasOwnProperty("relationToParent")){
                        mashu.push(value.response.sentences[i].words[j].token);
                    }
                }
            }

            return mashu;

        })
        .catch(err => console.error(err))

}

function getLocationFromMetadata(content,options) {
    return textRazor.exec(content, options)
        .then(value => {
            let mashu = [];

            for(let i = 0; i < value.response.entities.length; i++){
                // for(let j=0; j<value.response.entities[i].type.length;j++){
                //     let relationToParent = value.response.sentences[i].words[j]
                    // if(value.response.entities[i].type.indexOf("Place") > -1){
                    //     mashu.push(value.response.sentences[i].words[j].token);
                    // }
                    if(value.response.entities[i].type.indexOf("City") > -1){
                        mashu.push(value.response.entities[i].entityId);
                    }
                // }
            }

            return mashu;

        })
        .catch(err => console.error(err))
}


getLocationFromMetadata("hello, my name is Tel-Aviv",options).then(answer => {
    console.log(answer);
});