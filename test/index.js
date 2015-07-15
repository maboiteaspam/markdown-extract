require('should')

var mdExtract = require('../index.js')

describe('markdown extract', function(){
  it('should find the heading with depth = 1', function(){
    mdExtract(1)[0].should.eql('markdown-extract')
  })
  it('should find texts with the word Install inside', function(){
    mdExtract('Instal')[0].should.eql('Installation')
    mdExtract('Instal').length.should.eql(1)
  })
  it('should find text given their type as a string', function(){
    mdExtract({type: 'heading'})[0].should.eql('markdown-extract')
    mdExtract({type: 'heading'})[1].should.eql('Installation')
    mdExtract({type: 'heading'}).length.should.eql(7)
  })
  it('should find text given their type as a regexp', function(){
    mdExtract({type: /heading/})[0].should.eql('markdown-extract')
    mdExtract({type: /heading/})[1].should.eql('Installation')
    mdExtract({type: /heading/}).length.should.eql(7)
  })
  it('should find text given their type as an array', function(){
    mdExtract({type: ['heading', 'paragraph']})[0].should.eql('markdown-extract')
    mdExtract({type: ['heading', 'paragraph']})[2].should.eql('Installation')
    mdExtract({type: ['heading', 'paragraph']}).length.should.eql(14)
  })
  it('should find next paragraph', function(){
    mdExtract({gnp: true, type: ['heading'], text: /Installation/}).length.should.eql(2)
    mdExtract({gnp: true, type: 'heading', text: /Installation/})[0].should.eql('Run the following commands to download and install the application:')
    mdExtract({gnp: true, type: 'heading', text: /Installation/})[1].should.eql('$ npm i markdown-extract --save')
  })
  it('should accept marked options as a second argument', function(){
    mdExtract('heading', {gfm:false}).length.should.eql(12)
    mdExtract('heading', {gfm:false})[0].should.eql('markdown-extract')
    mdExtract('heading', {gfm:false})[1].should.eql('Installation')
  })
  it('should accept MD content as second argument', function(){
    mdExtract('heading', '# head1\ntext\n# head2\ntext\n').length.should.eql(2)
    mdExtract('heading', '# head1\ntext\n# head2\ntext\n')[0].should.eql('head1')
  })
  it('should accept MD content as third argument', function(){
    mdExtract('heading', {gfm:false}, '# head1\ntext\n# head2\ntext\n').length.should.eql(2)
    mdExtract('heading', {gfm:false}, '# head1\ntext\n# head2\ntext\n')[0].should.eql('head1')
  })
})