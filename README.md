# "Randomise" Your Code!

`babel-crime` takes your variable names in your code, and transpiles them to all
new ones. By default, babel-crimes creates a version where variables are split
up by camelcase and then have rhyming words found to replace each one.

If you pass in the option: `{ conversion: 'atinLay' }`, it will instead give you
pig latin.

## WARNING

As the rhyming words provided are random, running the rhyme-converter multiple
times may cause some drift.
