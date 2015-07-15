
var fs = require('fs')
var _ = require('underscore')
var marked = require('marked')

function markdownExtract(what, markedOpt, text){

  var defOpt = {
    gfm:true
  }

  if (!text) {
    if (markedOpt && _.isString(markedOpt) && fs.existsSync(markedOpt)) {
      text = fs.readFileSync(markedOpt, 'utf-8')
      markedOpt = defOpt
    } else if (_.isString(markedOpt)) {
      text = markedOpt + ''
      markedOpt = defOpt
    } else if (fs.existsSync('README.md')) {
      text = fs.readFileSync('README.md', 'utf-8')
    }
  }

  if (!markedOpt) {
    markedOpt = defOpt
  }

  var lexer       = new marked.Lexer(markedOpt)
  var origTokens  = lexer.lex(text)
  var tokens      = _.clone(origTokens)

  if (_.isString(what) | _.isRegExp(what)) {
    tokens = _.filter(tokens, function (token) {
      return ((token.type).match(what))
            || (token.text && token.text.match(what));
    })

  } else if (_.isNumber(what)) {
    tokens = _.filter(tokens, function(token){
      return (token.depth === what);
    })

  } else {
    if (what.type) {
      tokens = _.filter(tokens, function(token){
        return (_.isArray(what.type) && what.type.indexOf(token.type)>-1)
          || ((token.type).match(what.type));
      })
    }

    if (what.depth) {
      tokens = _.filter(tokens, function(token){
        return (_.isArray(what.depth) && what.depth.indexOf(token.depth)>-1)
          || ((token.depth + '').match(what.depth));
      })
    }

    if (what.text) {
      tokens = _.filter(tokens, function(token){
        return (token.text && token.text.match(what.text));
      })
    }

    if (what.grepNextParagraph || what.gnp) {
      var paragraphs = []

      _.each(tokens, function(token){
        var hasMatched = false
        _.each(origTokens, function(origToken){
          if (!hasMatched && _.isEqual(origToken, token)) {
            hasMatched = true;
          } else if(hasMatched){
            if (origToken.type.match(/heading/)) {
              hasMatched = false
            }else{
              paragraphs.push(origToken)
            }
          }
        })
      })
      tokens = paragraphs
    }
  }

  var onlyText = []
  _.each(tokens, function(token){
    if(token.text){
      onlyText.push(token.text)
    }
  })

  return onlyText;
}

module.exports = markdownExtract;