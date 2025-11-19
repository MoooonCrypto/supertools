# 100式道具箱

100以上の便利なツールを提供する無料オンラインサービス。テキスト処理、画像編集、開発者ツール、計算機など、日常業務から開発まで幅広くサポート。

## 🚀 特徴

- **完全無料**: すべてのツールを無料で使用可能、登録不要
- **プライバシー重視**: すべてクライアントサイドで処理、サーバーにデータ送信なし
- **高速・軽量**: Next.js 15とTurbopackによる高速ビルド
- **モダンUI**: Tailwind CSSによるレスポンシブデザイン
- **日本語ファースト**: 完全日本語対応

## 📦 実装済みツール (MVP: 9ツール)

### テキストツール (4ツール)
- 文字数カウンター - リアルタイム文字数・単語数カウント
- ケース変換 - 9種類のケース変換（camelCase, snake_case等）
- Base64エンコーダー/デコーダー
- JSON整形・圧縮・検証

### 開発者ツール (3ツール)
- UUID生成器 - 複数UUID生成対応
- ハッシュ生成器 - MD5, SHA1, SHA256, SHA512, SHA3
- カラーコード変換 - HEX/RGB/HSL相互変換

### ユーティリティ (2ツール)
- ストップウォッチ - ラップ機能付き
- タイマー - カウントダウン、クイック設定

### 準備中ツール
- 残り85ツールは実装テンプレート完成、順次追加予定

## 🛠 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript (strict mode)
- **スタイリング**: Tailwind CSS v4
- **状態管理**: Zustand (LocalStorage永続化)
- **ビルド**: Turbopack
- **デプロイ**: Vercel

### 主要ライブラリ
- lucide-react - アイコン
- date-fns - 日付処理
- crypto-js - 暗号化・ハッシュ
- nanoid - UUID生成
- marked, js-yaml - テキスト処理
- qrcode, html5-qrcode - QRコード
- jspdf, pdf-lib - PDF操作

## 🏃 セットアップ

### 必要要件
- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリクローン
git clone https://github.com/yourusername/supertools.git
cd supertools

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

開発サーバーが http://localhost:3000 で起動します。

### ビルド

```bash
# 本番ビルド
npm run build

# ビルド後のプレビュー
npm run start
```

## 📁 プロジェクト構造

```
supertools/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ
│   └── tools/             # ツールページ
│       ├── [category]/    # カテゴリページ
│       └── [category]/[id]/  # 個別ツールページ
├── components/
│   ├── ui/                # UIコンポーネント
│   ├── layout/            # レイアウトコンポーネント
│   └── features/          # ツール実装
│       ├── text/          # テキストツール
│       ├── dev/           # 開発者ツール
│       └── utility/       # ユーティリティツール
├── lib/
│   ├── constants/         # 定数・ツール定義
│   ├── store/             # Zustandストア
│   └── utils/             # ユーティリティ関数
├── types/                 # TypeScript型定義
├── docs/                  # プロジェクトドキュメント
└── public/                # 静的ファイル
```

## 🎨 デザインシステム

### カラーパレット
- Primary: #3b82f6 (Blue)
- Secondary: #8b5cf6 (Purple)
- Accent: #10b981 (Green)

### ダークモード
システム設定に自動対応、CSS変数で実装

## 📝 ツール追加方法

1. `components/features/[category]/` に新しいコンポーネント作成
2. `lib/constants/tools.ts` にツール定義を追加
3. `app/tools/[category]/[id]/page.tsx` の `toolComponents` に登録

例:
```typescript
// 1. コンポーネント作成
export function NewTool() {
  return <div>新しいツール</div>
}

// 2. ツール定義追加
{
  id: 'new-tool',
  name: 'New Tool',
  nameJa: '新しいツール',
  category: 'text',
  // ...
}

// 3. 登録
const toolComponents = {
  'new-tool': NewTool,
}
```

## 🚀 デプロイ

### Vercel デプロイ

```bash
# Vercel CLIインストール
npm i -g vercel

# デプロイ
vercel
```

または、GitHubリポジトリをVercelに接続して自動デプロイ。

### 環境変数

```bash
NEXT_PUBLIC_APP_NAME="100式道具箱"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

## 📊 パフォーマンス

- 初回読み込み: < 3秒
- ツール切り替え: < 0.5秒
- Lighthouse スコア: 90+

## 🔒 プライバシー

- すべての処理はブラウザ内で完結
- ファイルやデータをサーバーに送信しない
- LocalStorageのみで永続化（お気に入り、最近使用等）
- Cookie不使用

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエスト歓迎！以下の手順で貢献できます：

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📮 お問い合わせ

- Issues: [GitHub Issues](https://github.com/yourusername/supertools/issues)

## 🙏 謝辞

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- その他すべてのオープンソースライブラリ

---

Made with ❤️ by 100式道具箱チーム
