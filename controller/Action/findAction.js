var words = require('./safeWords.json');

function isProblemAction(action){
    var safe = words.words;
    return safe.includes(action);
}

