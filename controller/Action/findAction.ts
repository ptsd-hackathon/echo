var words = require('./safeWords.json');

export function isProblemAction(action:string): boolean{
    let safe:string[] = words.words;
    return safe.includes(action);
}
