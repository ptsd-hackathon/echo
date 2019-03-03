var words = require('./safeWords.json');
var tcom = require('thesaurus-com');

export function isProblemAction(action:string){
    let safe:string[] = words.words;
    words.words.forEach(word => {
        tcom.search(word).synonyms.forEach(x => {
            safe.push(x);
        });;
    });;

    return safe.includes(action);
}

