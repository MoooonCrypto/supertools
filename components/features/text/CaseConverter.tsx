'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function CaseConverter() {
  const [text, setText] = useState('')

  const convertCase = (type: string): string => {
    if (!text) return ''

    switch (type) {
      case 'upper':
        return text.toUpperCase()
      case 'lower':
        return text.toLowerCase()
      case 'title':
        return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      case 'sentence':
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      case 'camel':
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, '')
      case 'pascal':
        return text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/\s+/g, '')
      case 'snake':
        return text.replace(/\s+/g, '_').toLowerCase()
      case 'kebab':
        return text.replace(/\s+/g, '-').toLowerCase()
      case 'constant':
        return text.replace(/\s+/g, '_').toUpperCase()
      default:
        return text
    }
  }

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const cases = [
    { id: 'upper', name: '大文字（UPPERCASE）', example: 'HELLO WORLD' },
    { id: 'lower', name: '小文字（lowercase）', example: 'hello world' },
    { id: 'title', name: 'タイトルケース（Title Case）', example: 'Hello World' },
    { id: 'sentence', name: '文章ケース（Sentence case）', example: 'Hello world' },
    { id: 'camel', name: 'キャメルケース（camelCase）', example: 'helloWorld' },
    { id: 'pascal', name: 'パスカルケース（PascalCase）', example: 'HelloWorld' },
    { id: 'snake', name: 'スネークケース（snake_case）', example: 'hello_world' },
    { id: 'kebab', name: 'ケバブケース（kebab-case）', example: 'hello-world' },
    { id: 'constant', name: '定数ケース（CONSTANT_CASE）', example: 'HELLO_WORLD' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">元のテキスト</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="hello world"
          className="w-full h-32 p-4 border border-border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((caseType) => {
          const converted = convertCase(caseType.id)
          return (
            <Card key={caseType.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{caseType.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(converted)}
                  disabled={!text}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="min-h-[60px] p-3 bg-muted rounded text-sm font-mono break-all">
                {converted || <span className="text-muted-foreground">{caseType.example}</span>}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
