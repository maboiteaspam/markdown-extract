# TOC
   - [markdown extract](#markdown-extract)
<a name=""></a>
 
<a name="markdown-extract"></a>
# markdown extract
should find the heading with depth = 1.

```js
mdExtract(1)[0].should.eql('markdown-extract')
```

should find texts with the word Install inside.

```js
mdExtract('Instal')[0].should.eql('Installation')
mdExtract('Instal').length.should.eql(1)
```

should find text given their type as a string.

```js
mdExtract({type: 'heading'})[0].should.eql('markdown-extract')
mdExtract({type: 'heading'})[1].should.eql('Installation')
mdExtract({type: 'heading'}).length.should.eql(7)
```

should find text given their type as a regexp.

```js
mdExtract({type: /heading/})[0].should.eql('markdown-extract')
mdExtract({type: /heading/})[1].should.eql('Installation')
mdExtract({type: /heading/}).length.should.eql(7)
```

should find text given their type as an array.

```js
mdExtract({type: ['heading', 'paragraph']})[0].should.eql('markdown-extract')
mdExtract({type: ['heading', 'paragraph']})[2].should.eql('Installation')
mdExtract({type: ['heading', 'paragraph']}).length.should.eql(14)
```

should find next paragraph.

```js
mdExtract({gnp: true, type: ['heading'], text: /Installation/}).length.should.eql(2)
mdExtract({gnp: true, type: 'heading', text: /Installation/})[0].should.eql('Run the following commands to download and install the application:')
mdExtract({gnp: true, type: 'heading', text: /Installation/})[1].should.eql('$ npm i markdown-extract --save')
```

should accept marked options as a second argument.

```js
mdExtract('heading', {gfm:false}).length.should.eql(12)
mdExtract('heading', {gfm:false})[0].should.eql('markdown-extract')
mdExtract('heading', {gfm:false})[1].should.eql('Installation')
```

should accept MD content as second argument.

```js
mdExtract('heading', '# head1\ntext\n# head2\ntext\n').length.should.eql(2)
mdExtract('heading', '# head1\ntext\n# head2\ntext\n')[0].should.eql('head1')
```

should accept MD content as third argument.

```js
mdExtract('heading', {gfm:false}, '# head1\ntext\n# head2\ntext\n').length.should.eql(2)
mdExtract('heading', {gfm:false}, '# head1\ntext\n# head2\ntext\n')[0].should.eql('head1')
```

