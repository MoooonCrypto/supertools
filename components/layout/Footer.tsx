import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">100式道具箱</h3>
            <p className="text-sm text-muted-foreground">
              100以上の便利なツールを提供する無料サービス
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">ツール</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/tools/text" className="text-muted-foreground hover:text-foreground">
                テキストツール
              </Link>
              <Link href="/tools/image" className="text-muted-foreground hover:text-foreground">
                画像ツール
              </Link>
              <Link href="/tools/dev" className="text-muted-foreground hover:text-foreground">
                開発者ツール
              </Link>
              <Link href="/tools/calc" className="text-muted-foreground hover:text-foreground">
                計算・変換
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">リソース</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                サービスについて
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                利用規約
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">フォロー</h3>
            <div className="flex space-x-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} 100式道具箱. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
