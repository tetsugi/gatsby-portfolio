---
tags:
  - Docker
  - imgproxy
  - TypeScript
date: 2019-11-03
title: 高速で画像リサイズができるセキュアな画像プロキシサーバーimgproxyを使う
description: HTTPS化の壁となる混合コンテンツを防ぎつつ、画像のリサイズまでできる画像プロキシサーバーimgproxyについて紹介しています。
---

## imgproxyとは

[imgproxy](https://imgproxy.net/)は画像プロキシサーバーです。
画像のURLを変換する機能の他に、なんと画像をリサイズする機能までついています:tada:
リサイズはリクエストのたびに行われます(on-the-fly)が、高速で変換できることが売りなようで、[ベンチマーク](https://github.com/imgproxy/imgproxy/blob/master/BENCHMARK.md)を見るとパフォーマンスが非常に良いことがわかると思います。

## 画像プロキシサーバって何？

HTTPS化して暗号化した接続にしたとしても、サイト内のリソースをHTTPでリクエストしていると脆弱になります。
HTTPSとHTTPの両者が混じっている状態が[混合コンテンツ](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content?hl=ja)で、セキュリティを低下させる上にChromeなどのブラウザでブロックされる可能性があります。

しかし、記事や画像を投稿できるサービスでは、ユーザーがHTTPで配信している画像を貼りつけることができたりします。
そこで、画像の配信については画像プロキシサーバーを介するようにあらかじめURLを変形することによって、（自分で証明書を取得して設定していれば）暗号化通信を強制することができます。

従来の画像プロキシだと、QiitaやGitHubで使われている[atmos/camo](https://github.com/atmos/camo)が有名でした。
しかし、camoはすでに保守されていないようで、2年ほど前から一切コミットされていない状況が続いています:thinking:

今だったらimgproxyを使った方が、リサイズの機能や明らかにサイズの大きい画像を弾いたりする機能もついているので、リッチなアプリケーションを開発できるようになると思います。
シグネチャをURLに含んでいるので、想定していないコンテンツを配信するなどといった悪意のある行為も防ぐことができます。

## Docker上で起動してみる

imgproxyはDocker Hubから[darthsim/imgproxy](https://hub.docker.com/r/darthsim/imgproxy)をpullしてくればすぐに環境構築することができます。
開発環境では他のコンテナも起動すると思うので、`docker-compose.yml`を作成もしくは編集して以下の設定をします。

```yml
version: "3.7"
services: 
  imgproxy:
    image: darthsim/imgproxy:latest
    environment:
      # 本番環境ではランダムな16進数の値を用いる
      IMGPROXY_KEY: 1111
      IMGPROXY_SALT: 1111
    ports:
      - "3002:8080"
    restart: always
```

ポートはなんとなく`3002`に変更してあります。
これで`docker-compose up -d`して`http://localhost:3002`に接続すれば **Hey, I'm imgproxy!** の文字列が表示されます。

## 画像のURLを変換しつつリサイズしてみる

画像のURLを次のように変換することで、imgproxyの機能を利用できるようになります。

```
/%signature/%resizing_type/%width/%height/%gravity/%enlarge/%encoded_source_url.%extension
```

詳しい設定は[Generating the URL (Basic)](https://docs.imgproxy.net/#/generating_the_url_basic)に細かく載っています。

[Calculating URL signature](https://docs.imgproxy.net/#/signing_the_url?id=calculating-url-signature)を読むと、次のことが書かれています。

- Path(`/%resizing_type/%width/%height/%gravity/%enlarge/%encoded_source_url.%extension`)を取得する
- keyとsaltを追加する
- SHA256を使用してHMAC digestを計算する
- 結果をURL-SafeなBase64に変換する

とはいえ微妙によく分からないので、公式で公開している[各言語のサンプルコード](https://github.com/imgproxy/imgproxy/tree/master/examples)を見るのが手っ取り早そうです。

自分はTypeScriptを使っているので、以下のような`toImgproxy.ts`を作成して利用することにしました。

```ts
import { createHmac } from "crypto";

type ImgproxyOptions = {
  resizeTypes: "fit" | "fill" | "auto";
  width: number;
  height: number;
  /**
   * 画像が切り取られたときにどこに合わせるか  
   * `"no" | "so" | "ea" | "we" | "noea" | "nowe" | "soea" | "sowe" | "ce" | "sm" | "fp:%x:%y"` 
   */
  gravity: string;
  enlarge: number;
  extension: "jpg" | "png" | "webp" | "gif" | "ico" | "heic" | "tiff" | "mp4";
};

/**
 * 文字列をURL-SafeなBase64に変換する
 */
const encode = (str: string | Buffer): string => Buffer.from(str as string)
  .toString("base64")
  .replace(/=/g, "")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");

const decode = (hex: string): Buffer => Buffer.from(hex, "hex");

const { IMGPROXY_ORIGIN, IMGPROXY_KEY, IMGPROXY_SALT } = process.env;
const [KEY, SALT] = [IMGPROXY_KEY, IMGPROXY_SALT].map(decode);

const sign = (path: string): string => encode(
  createHmac("sha256", KEY)
    .update(SALT)
    .update(path)
    .digest()
);

export default (url: string | URL, {
  resizeTypes = "auto",
  width = 500,
  height = 500,
  gravity = "ce",
  enlarge = 1,
  extension,
}: Partial<ImgproxyOptions> = {}): URL => {
  if (url instanceof URL) url = url.href;

  const encodedUrl = encode(url);

  let path = "/" + [resizeTypes, width, height, gravity, enlarge, encodedUrl].join("/");
  if (extension) path += `.${extension}`;
  path = sign(path) + path;

  return new URL(path, IMGPROXY_ORIGIN);
};
```

高パフォーマンスらしいとはいえ、どれくらいリソースを食うのかはまだよく分からないので、実運用の際にはCDNやキャッシュサーバーを適宜利用するのを検討するべきでしょう。

**追記**
Cloudinaryあたりのサービスを利用すると高パフォーマンスで同様のことができてしまうので、最初からそちらの選択肢を取るのが賢明そう。
