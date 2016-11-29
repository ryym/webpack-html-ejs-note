webpackでHTMLファイルをビルドする際、HTMLローダとEJSローダの両方を使いたかったが、
`html!ejs!foo.html.ejs`のようにしても上手くいかなくてちょっとハマった。
これが上手くいかないのは、ローダが基本的にJSコードをexportするため。
webpackはあらゆるファイルをJS内でモジュールとして使えるようにしようという思想だからある意味当然。
なので上記のように書くと、HTMLローダにはEJSローダが生成したJSコードが渡ってしまい、上手くいかない。
こういう時は[val-loader]や[extract-loader]を挟んでexportされたコードを実行し、そのコードが返すHTML文字列を次のローダに渡すようにする。

[val-loader]: https://github.com/webpack/val-loader
[extract-loader]: https://github.com/peerigon/extract-loader

```
HTML -(html loader)-> JS -(extract loader)-> HTML -(ejs loader)-> JS
```

```js
// html-loaderやejs-loaderは、HTMLを入力として受け取ってこんな感じのJS文字列を生成する。
// これをローダ内で実行し、exportされる文字列自体を次のローダに渡せばいい。
module.exports = "<!DOCTYPE html><html>..."
```

`val-loader`はシンプルなので、`${require('./other.html')}`のようにHTML内で別のHTMLファイルをrequireしていると失敗するけど、
extract-loaderはそれにも対応している。

