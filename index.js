const pv = require('poetic-vomit');

const { reservedWords } = require('./constants');
function pigLatinify(words) {
  return words
    .map(word => {
      var array = word.split('');
      var vowels = ['a', 'e', 'i', 'o', 'u'];
      var newWord = '';
      for (var i = 0; i < vowels.length - 1; i++) {
        for (var y = 0; y < word.length - 1; y++) {
          if (word[y] === vowels[i]) {
            for (var x = y; x < word.length; x++) {
              newWord = newWord + word[x];
            }
            for (var n = 0; n < y; n++) {
              newWord = newWord + word[n];
            }
            newWord = newWord + 'ay';
            return newWord;
          }
        }
      }
    })
    .join('');
}

const upperCaseFirst = string => {
  let downString = string.toLowerCase();
  return downString.charAt(0).toUpperCase() + downString.slice(1);
};

function crimeify(path, words) {
  const name = path.node.name;
  return (convertedWords = words
    .map((w, i) => {
      let newWord = pv(w, 1)
        .replace(/[^a-zA-Z]/g, '')
        .toLowerCase();
      if (reservedWords.includes(newWord)) return w;
      if (i > 0) newWord = upperCaseFirst(newWord);
      return newWord;
    })
    .join(''));
}

const dictionary = {};

function isObjectProperty(path) {
  return (
    path.findParent(p => p.isMemberExpression()) && path.key === 'property'
  );
}

function weirdify({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        const conversion = state.opts.conversion || 'crime';
        const name = path.node.name;

        if (
          path.scope.globals[name] ||
          reservedWords.includes(name) ||
          isObjectProperty(path) ||
          dictionary[name]
        ) {
          // do nothing
        } else {
          let newName;
          const words = path.node.name.replace(/([A-Z])/g, ' $1').split(' ');
          if (conversion === 'atinLay') {
            newName = pigLatinify(words);
          } else if (conversion === 'crime') {
            newName = crimeify(path, words);
          }
          dictionary[newName] = true;
          path.scope.rename(name, newName);
        }
      },
    },
  };
}
module.exports = weirdify;
