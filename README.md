# web_site_translate_knitting_pattern_pdf

Mac 用アプリ [Knitting Translator](https://github.com/azimicat/translate_knitting_pattern_pdf) を紹介し、配布するための静的サイトです。
ビルドの工程はなく、HTML と CSS をそのまま GitHub Pages で公開します。

## ファイル構成

```
.
├── index.html            # トップ：紹介とダウンロード
├── install/index.html    # ダウンロードから初回起動まで（Gatekeeper の警告への対処）
├── guide/index.html      # API キーの登録、翻訳、保存
├── faq/index.html        # 料金、回数、プライバシー、開けないとき
├── assets/
│   ├── css/style.css     # 全ページ共通のスタイルと配色
│   ├── img/icon.png      # アプリのアイコン（AppIcon.icns から 256px で書き出し）
│   └── js/
│       ├── site.js       # メニューの開閉と、スクロールで要素をふわっと表示する動き
│       └── release.js    # GitHub API から直近のリリースのバージョン名と公開日を表示
└── .nojekyll             # GitHub Pages の Jekyll 変換を止める
```

ヘッダー、メニュー、フッターは各 HTML に直接書いています。
リンクを変えるときは 4 つの HTML すべてを書き換えてください。

## 見た目

余白を広く取った雑誌風のつくりです。
丸みのある不定形の図形の後ろに、色違いの図形をずらして重ねています。
見出しは Playfair Display（英字）と Noto Serif JP（日本語）、本文は DM Sans と Noto Sans JP で、どれも Google Fonts から読み込みます。

| 色 | 値 | 使う場所 |
|---|---|---|
| クリーム | `#fdf7db` | ページの地 |
| オレンジ | `#f0a260` | トップの大きな図形、フッター、注意書きの印 |
| 水色 | `#60cbd5` | 図形の重ね色、特長の図形。文字に使うときは濃くした `#1a6f77` |
| 緑 | `#7fdd87` | 図形の重ね色、特長の図形 |

## ダウンロードのリンク

アプリのリリースはコミットごとにタグが変わりますが、添付される zip の名前は `KnittingTranslator.zip` で固定です。
そのため、ダウンロードボタンは次の URL を指しています。

```
https://github.com/azimicat/translate_knitting_pattern_pdf/releases/latest/download/KnittingTranslator.zip
```

アプリ側でファイル名を変えた場合は、各 HTML の `data-download` を付けたリンクも書き換えてください。

## 手元で確認する

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。
サイト内のリンクは `./` や `../` から始まる相対パスで書いているため、GitHub Pages のサブパス（`/web_site_translate_knitting_pattern_pdf/`）でもそのまま動きます。

## 公開する

1. GitHub にリポジトリを作り、このフォルダを push する
2. リポジトリの Settings → Pages で、Source を「Deploy from a branch」、ブランチを `main`、フォルダを `/ (root)` にする
3. 数分後に `https://azimicat.github.io/<リポジトリ名>/` で公開される
