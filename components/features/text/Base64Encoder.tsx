'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, ArrowDownUp } from 'lucide-react'

export function Base64Encoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleConvert = () => {
    setError('')
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
      }
    } catch (err) {
      setError('変換に失敗しました。入力内容を確認してください。')
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

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput(input)
    setError('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <Button
          variant={mode === 'encode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('encode')
            setInput('')
            setOutput('')
            setError('')
          }}
        >
          エンコード
        </Button>
        <Button variant="ghost" size="icon" onClick={swapMode}>
          <ArrowDownUp className="h-4 w-4" />
        </Button>
        <Button
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('decode')
            setInput('')
            setOutput('')
            setError('')
          }}
        >
          デコード
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {mode === 'encode' ? '元のテキスト' : 'Base64文字列'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'エンコードしたいテキストを入力...'
                : 'デコードしたいBase64文字列を入力...'
            }
            className="w-full h-40 p-4 border border-border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleConvert} disabled={!input} className="flex-1">
            変換
          </Button>
        </div>

        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive/50">
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              {mode === 'encode' ? 'Base64文字列' : '元のテキスト'}
            </label>
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
            placeholder="変換結果がここに表示されます..."
            className="w-full h-40 p-4 border border-border rounded-lg resize-y bg-muted font-mono text-sm"
          />
        </div>
      </div>
    </div>
  )
}
