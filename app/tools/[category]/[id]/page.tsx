import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Heart, Clock, Share2, ChevronLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { getToolById } from '@/lib/constants'
import { TextCounter } from '@/components/features/text/TextCounter'
import { CaseConverter } from '@/components/features/text/CaseConverter'
import { Base64Encoder } from '@/components/features/text/Base64Encoder'
import { JsonFormatter } from '@/components/features/text/JsonFormatter'
import { UuidGenerator } from '@/components/features/dev/UuidGenerator'
import { HashGenerator } from '@/components/features/dev/HashGenerator'
import { ColorConverter } from '@/components/features/dev/ColorConverter'

interface ToolPageProps {
  params: Promise<{ category: string; id: string }>
}

// 実装済みツールのマッピング
const toolComponents: Record<string, React.ComponentType> = {
  'text-counter': TextCounter,
  'case-converter': CaseConverter,
  'base64-encoder': Base64Encoder,
  'json-formatter': JsonFormatter,
  'uuid-generator': UuidGenerator,
  'hash-generator': HashGenerator,
  'color-code-converter': ColorConverter,
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { category, id } = await params

  const tool = getToolById(id)
  if (!tool || tool.category !== category) {
    notFound()
  }

  const ToolComponent = toolComponents[id]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href={`/tools/${category}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {category}に戻る
            </Link>
          </div>

          {/* Tool Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {tool.nameJa}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">{tool.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tool Component */}
          <div className="mb-12">
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <div className="rounded-lg border border-border bg-muted/50 p-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">このツールは準備中です</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  近日中に公開予定です。お楽しみに！
                </p>
              </div>
            )}
          </div>

          {/* Usage Tips */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">使い方</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. テキストエリアにテキストを入力します。</p>
              <p>2. リアルタイムで文字数、単語数などが自動的に計算されます。</p>
              <p>3. すべての処理はブラウザ内で完結し、サーバーには送信されません。</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
