---
tags:
  - TypeScript
date: 2019-11-04
title: TypeScriptの型定義をテーブル定義書やAPI仕様書として使う
description: TypeScriptオンリーでWebアプリ開発をする際に、型定義をテーブル定義書やAPI仕様書として活用するアイデアについて書きました。
---

## TypeScriptでドキュメントを書く

最終的にコードを読んだりするとしても、開発においてドキュメントはなんだかんだで重要な役目を担っています。
新たにアサインされたチームメンバーがみんなコードを読んですぐに仕様を把握できる人でも無いでしょうし、その際には日本語の文章がシステムの仕様をかなり分かりやすくしてくれます。

ただし、ExcelではなくMarkdownなどのモダンな形式でドキュメントが書いてあったとしても、実装の途中で仕様が頻繁に変更される現場（ex. 趣味、Web系）にいる際にはついみんな億劫になり、どんどんドキュメントがメンテナンスされていかなくなっていったりします。
特にテーブルやAPI周りで変更が入ったときにドキュメントが更新されなかったりすると、JavaScriptのような型が無い言語だとそもそもの型が分からなくなってきます。

そこで、 **そもそもドキュメント自体を更新しなければ機能の追加や変更をできないようにすればよい** のではないかと思いました。
具体的にはTypeScriptの型定義として仕様書を書いていくことで、型安全にしつつドキュメントを常に参照できる状態にしていきます。

## ドキュメントの書き方

型定義としてドキュメントを書いていく用のプライベートリポジトリを作成し、GitHub Packagesで公開してインストールするのが良いと思います。
ユーティリティをまとめたリポジトリに型定義も入れておくといいかもしれません。
欠点として、型定義に変更を加えた後には他のリポジトリでも依存関係を更新する必要があります。


型定義に加えて必ず **JSDoc** を書くようにすると、VSCodeなどのエディタでドキュメントを参照できるようになります。
また、`Ctrl + クリック`で型定義元のファイルまで飛んで行って、型定義の詳細を見られるのも嬉しいですね。

基本となるテーブル定義書とAPI仕様書の書き方のアイデアを紹介します。

### テーブル定義書

テーブル定義書を型定義化することで、以下のような恩恵を得られます。

- ALTER TABLEしたときに型チェックで事前にエラーが発生する場所を把握できる
- 他のテーブルとJOINする際にintersection型(`&`)が使える
- 一部の行のみSELECTする際も`Pick`や`Omit`が使える
- API仕様書でもテーブル定義書の型定義が使えることが多い

試しに適当な`users`テーブル、`bookmarks`テーブルの型定義をしてみます。
`PrimaryKey`や`ForeignKey`などのエイリアスを作っておくことである程度可読性をよくできます。
汎用的なエイリアスに関しては別のファイルにまとめておくとよいでしょう。

```ts
export type UUID = string;
export type PrimaryKey<T> = T;
export type ForeignKey<T> = T;
export type Unique<T> = T;
export type Timestamp = string;

/**
 * `users`テーブル
 * ホゲホゲゲームのユーザーアカウント
 */
export type User = {
  /** 一意のユーザーID */
  id: PrimaryKey<UUID>;
  /**
   * ゲーム内で表示されるユーザー名  
   * 所有欲を満たすために一意にする必要がある
   */
  name: Unique<string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

/**
 * `bookmarks`テーブル  
 * ユーザーが登録したしおり
 */
export type Bookmark = {
  id: PrimaryKey<UUID>;
  /** 紐づくユーザー */
  userId: ForeignKey<User["id"]>;
  /** しおり名 */
  name: string;
  /** リンク先 */
  to: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

例えば`User`の情報と`Bookmark`の一覧を同時に持って来たときは以下のように利用します。

```ts
const hoge: User & { bookmarks?: Array<Bookmark> } = {
  id: "1111",
  name: "ほげ",
  bookmarks: [{
    id: "2222",
    userId: "1111",
    name: "ふが",
    to: "example.com",
    createdAt: "2019-01-01",
  }],
  createdAt: "2019-01-01",
};
```

### API仕様書

API仕様書を型定義化することで、以下のような恩恵を得られます。

- Nuxt.js + Node.jsのような構成なら、フロント・API間の型定義の共通化と共有ができる
- リクエストやレスポンスの中身が分からなくなったとき、型定義から情報を引っ張ってこれる
- 同じパスでもGETやPOSTで処理が違うとき、型定義で見分けることができる

実際に型定義をしてみます。
先ほどの`User`をそのまま使って、ユーザーの一覧を取ってくるAPIの仕様を書きます。

```ts
/**
 * **GET**  
 * ユーザーを検索する
 */
export type APIRequest = {
  /** ユーザー名で検索するときのキーワード */
  keyword?: string;
  /** 現在のページ数 */
  page?: number;
  /** 1ページあたりのアイテム数 */
  perPage?: number;
};

/**
 * ユーザーの検索結果を返す
 */
export type APIResponse = {
  /** 検索結果にヒットしたユーザー */
  users: Array<User>;
  /** 検索にヒットした合計数 */
  total: number;
};
```

例えば[axios](https://github.com/axios/axios)なら次のように利用できます。

```ts
import axios from "axios";
// パスを実際のAPIのエンドポイントと同じにしておくと分かりやすい
import { APIRequest, APIResponse } from "@/types/search/users";

(async () => {
  const response = await axios.get<APIResponse>("/search/users", {
    params: {
      keyword: "aaa",
    } as APIRequest,
  });
})();
```

## 所感

最近は[Swagger](https://swagger.io/)のようなツールを導入している現場があるようですが、TypeScriptを導入しているなら型定義で済ませた方が開発が複雑化せずに分かりやすくなるのではないかと思いました:thinking:
業務だと色々あって導入できないかもしれませんが、趣味や小規模での開発でミニマルにまとめたいといったときに効果を発揮するかもしれません。
