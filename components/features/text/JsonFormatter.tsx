'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy } from 'lucide-react'

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const formatJson = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indent)
      setOutput(formatted)
    } catch (err) {
      setError('無効なJSON形式です。入力内容を確認してください。')
      setOutput('')
    }
  }

  const minifyJson = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError('無効なJSON形式です。入力内容を確認してください。')
      setOutput('')
    }
  }

  const validateJson = () => {
    setError('')
    try {
      JSON.parse(input)
      setError('')
      setOutput('✅ 有効なJSON形式です')
    } catch (err) {
      setError('❌ 無効なJSON形式です')
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">JSON入力</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "value", "array": [1, 2, 3]}'
            className="w-full h-64 p-4 border border-border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={formatJson} disabled={!input}>
            整形
          </Button>
          <Button onClick={minifyJson} disabled={!input} variant="outline">
            圧縮
          </Button>
          <Button onClick={validateJson} disabled={!input} variant="outline">
            検証
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm">インデント:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="h-10 px-3 border border-border rounded-md bg-background"
            >
              <option value={2}>2スペース</option>
              <option value={4}>4スペース</option>
              <option value={8}>8スペース</option>
            </select>
          </div>
        </div>

        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive/50">
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">結果</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              disabled={!output}
              className="h-8"
            >
              <Copy className="mr-2 h-4 w-4" />
              コピー
            </Button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="整形・圧縮結果がここに表示されます..."
            className="w-full h-64 p-4 border border-border rounded-lg resize-y bg-muted font-mono text-sm"
          />
        </div>
      </div>
    </div>
  )
}
