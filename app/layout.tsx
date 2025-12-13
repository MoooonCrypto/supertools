import type { Metadata } from 'next'
import { Exo_2, Zen_Kaku_Gothic_New } from 'next/font/google'
import { clsx } from 'clsx'
import './globals.css'

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  weight: ['400', '700', '900'],
})

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  // @ts-expect-error In the current version of next/font, the 'japanese' subset is not officially supported in the type definitions.
  subsets: ['latin', 'japanese'],
  variable: '--font-zen-kaku',
  weight: ['400', '700', '900'],
})

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
    <html lang="ja" className="dark">
      <body className={clsx('font-sans', 'antialiased', exo2.variable, zenKakuGothicNew.variable)}>{children}</body>
    </html>
  )
}
