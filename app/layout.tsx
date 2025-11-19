import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '100式道具箱 - 100以上の便利なツール',
  description: '100以上の便利なツールを提供するサービス。テキスト処理、画像編集、開発者ツール、計算機など、日常業務から開発まで幅広くサポート。',
  keywords: ['ツール', 'オンラインツール', '無料ツール', '変換ツール', '計算機'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  )
}
