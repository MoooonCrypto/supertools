import Link from 'next/link'
import { Github, X, Rss } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/your-repo', label: 'GitHub' },
    { icon: X, href: 'https://x.com/your-account', label: 'X / Twitter' },
    { icon: Rss, href: '/rss.xml', label: 'RSS Feed' },
  ]

  const footerNav = [
    {
      title: 'ツール',
      links: [
        { label: 'テキストツール', href: '/tools/text' },
        { label: '画像ツール', href: '/tools/image' },
        { label: '開発者ツール', href: '/tools/dev' },
        { label: '計算・変換', href: '/tools/calc' },
      ],
    },
    {
      title: 'リソース',
      links: [
        { label: 'サービスについて', href: '/about' },
        { label: 'プライバシーポリシー', href: '/privacy' },
        { label: '利用規約', href: '/terms' },
        { label: 'お問い合わせ', href: '/contact' },
      ],
    },
  ]

  return (
    <footer className="w-full border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-black uppercase tracking-wider text-primary">
                100<span className="text-foreground">式</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/60">
              100以上の便利なオンラインツールを無料で提供するサービス。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 transition-colors hover:text-primary"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-2 grid grid-cols-2 gap-8">
            {footerNav.map((nav) => (
              <div key={nav.title}>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground/80">
                  {nav.title}
                </h3>
                <nav className="mt-4 flex flex-col space-y-2">
                  {nav.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-foreground/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {currentYear} 100式道具箱. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
