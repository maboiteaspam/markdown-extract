# markdown-extract

A module on top of https://github.com/chjj/marked to extract a paragraph from your markdown.

## Installation
Run the following commands to download and install the application:

```sh
$ npm i markdown-extract --save
```

## Documentation

It exposes an unique function, with three signatures

    mdExtract (what[, markedOpt[, text]])
    mdExtract (what, markedOpt)
    mdExtract (what, text)
    
* __what__: The lookup object, regexp, or string
* __markedOpt__: The options passed to `marked`, default to `{gfm:true}`
* __text__: The markdown text to parse, it not provided it will fallback to `README.md` file on `cwd`

This function parses the markdown content, searching for nodes that matches your criterions.

It will return only their text, as an array of string, in order of appearance in the file.

##### __what__
* if it s a string or a regexp, it selects nodes with matching type or text property
* if it s an array of string, it selects nodes of those types
* if it s a number, it selects nodes with given depth
* if it s a object, then it can have type/text/depth properties with values that matches above logic.
* if it s a object, and it s have a property (`grepNextParagraph` || `gnp`)==`true`, 
then, the search is made based on `heading` nodes, 
the results is al the following text of each matched `heading`.

Last options is the most interesting to me as you can match a `heading` such `## Usage`, 
but gets only it s following `text`.

## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
WTF.