import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TOOL_CATEGORIES, getToolsByCategory } from '@/lib/constants'
import type { ToolCategoryType } from '@/types'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return TOOL_CATEGORIES.map((category) => ({
    category: category.id,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  const categoryData = TOOL_CATEGORIES.find((c) => c.id === category)
  if (!categoryData) {
    notFound()
  }

  const tools = getToolsByCategory(category as ToolCategoryType)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {categoryData.nameJa}
            </h1>
            <p className="mt-2 text-muted-foreground">{categoryData.description}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {tools.length} ツール
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link key={tool.id} href={`/tools/${category}/${tool.id}`}>
                <Card className="transition-all hover:shadow-lg hover:border-primary/50 h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{tool.nameJa}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {tool.description}
                    </CardDescription>
                    <div className="flex gap-2 mt-2">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
