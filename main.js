var spellcheck = require('./spellcheck.js');

var sampleText = "Hellllo Worlld! Howw are you?"
spellcheck.checkspellings(sampleText).then(spellingSuggestions => {

    console.log(spellingSuggestions);
});