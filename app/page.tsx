import Link from 'next/link'
import { ArrowRight, FileText, Image, Code, Calculator, FileType, TrendingUp, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

export default function HomePage() {
  const highPriorityTools = getHighPriorityTools().slice(0, 8)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            100式道具箱
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            100以上の便利なツールを無料で提供。テキスト処理、画像編集、開発者ツール、計算機など、日常業務から開発まで幅広くサポート。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#categories">
                ツールを探す
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">サービスについて</Link>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">94+</div>
                <div className="mt-2 text-sm text-muted-foreground">ツール数</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">7</div>
                <div className="mt-2 text-sm text-muted-foreground">カテゴリ</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">100%</div>
                <div className="mt-2 text-sm text-muted-foreground">無料</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">0</div>
                <div className="mt-2 text-sm text-muted-foreground">登録不要</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="container mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">カテゴリから探す</h2>
            <p className="mt-2 text-muted-foreground">用途に応じてカテゴリからツールを選択できます</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOOL_CATEGORIES.map((category) => {
              const Icon = iconMap[category.icon]
              return (
                <Link key={category.id} href={`/tools/${category.id}`}>
                  <Card className="transition-all hover:shadow-lg hover:border-primary/50 h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        {Icon && (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-lg">{category.nameJa}</CardTitle>
                          <CardDescription className="mt-1 text-xs">{category.name}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">人気のツール</h2>
              <p className="mt-2 text-muted-foreground">よく使われているツールをピックアップ</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highPriorityTools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.category}/${tool.id}`}>
                  <Card className="transition-all hover:shadow-lg hover:border-primary/50 h-full">
                    <CardHeader>
                      <CardTitle className="text-base">{tool.nameJa}</CardTitle>
                      <CardDescription className="text-xs">{tool.name}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/tools/text">すべてのツールを見る</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">特徴</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">高速・軽量</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                すべてブラウザ内で処理。サーバーアップロード不要で高速動作。
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">プライバシー重視</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                ファイルはブラウザのメモリ内のみで処理。サーバーに送信されません。
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">完全無料</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                すべてのツールを無料で使用可能。登録も不要です。
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
