import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  Image,
  Code,
  Calculator,
  FileType,
  TrendingUp,
  Wrench,
  Rocket,
  Lock,
  Zap,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TOOL_CATEGORIES, getHighPriorityTools } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Image,
  Code,
  Calculator,
  FileType,
  TrendingUp,
  Wrench,
}

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="relative overflow-hidden rounded-lg border border-border bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-primary/20">
    <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-primary/20 blur-2xl"></div>
    <div className="relative z-10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="mb-2 font-bold text-xl text-foreground">{title}</h3>
      <p className="text-sm text-foreground/80">{children}</p>
    </div>
  </div>
)

export default function HomePage() {
  const highPriorityTools = getHighPriorityTools().slice(0, 8)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background opacity-50"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="font-display text-5xl font-black uppercase tracking-wider text-primary sm:text-7xl md:text-8xl">
              100<span className="text-foreground">式</span>道具箱
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl">
              100以上の便利なツールを無料で提供。テキスト処理、画像編集、開発者ツールなど、日常業務から開発まで幅広くサポート。
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="#categories" className="group relative inline-block">
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-75 transition-all group-hover:opacity-100"></span>
                <span className="relative flex items-center justify-center rounded-lg bg-muted px-6 py-3 font-bold text-foreground transition-all group-hover:bg-opacity-90">
                  ツールを探す <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border/50 bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: '94+', label: 'ツール数' },
                { value: '7', label: 'カテゴリ' },
                { value: '100%', label: '無料' },
                { value: '0', label: '登録不要' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-5xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-2 text-sm uppercase tracking-widest text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-foreground sm:text-5xl">
              カテゴリから探す
            </h2>
            <p className="mt-4 text-foreground/80">用途に応じてカテゴリからツールを選択できます</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOOL_CATEGORIES.map((category) => {
              const Icon = iconMap[category.icon]
              return (
                <Link
                  key={category.id}
                  href={`/tools/${category.id}`}
                  className="group block rounded-lg border-2 border-border/50 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
                >
                  <div className="flex items-center space-x-4">
                    {Icon && <Icon className="h-8 w-8 text-secondary" />}
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{category.nameJa}</h3>
                      <p className="text-sm text-foreground/60">{category.name}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-foreground sm:text-5xl">
                人気のツール
              </h2>
              <p className="mt-4 text-foreground/80">よく使われているツールをピックアップ</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {highPriorityTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.category}/${tool.id}`}
                  className="block rounded-md border border-border/50 bg-card p-4 transition-all hover:bg-muted"
                >
                  <h3 className="font-bold text-base text-foreground">{tool.nameJa}</h3>
                  <p className="text-xs text-foreground/60">{tool.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-foreground sm:text-5xl">
              特徴
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard icon={<Zap />} title="高速・軽量">
              すべてブラウザ内で処理。サーバーアップロード不要で高速動作。
            </FeatureCard>
            <FeatureCard icon={<Lock />} title="プライバシー重視">
              ファイルはブラウザのメモリ内のみで処理。サーバーに送信されません。
            </FeatureCard>
            <FeatureCard icon={<Rocket />} title="完全無料">
              すべてのツールを無料で使用可能。登録も不要です。
            </FeatureCard>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
