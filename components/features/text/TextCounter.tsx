'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function TextCounter() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpace: 0,
    words: 0,
    lines: 0,
    bytes: 0,
  })

  useEffect(() => {
    const characters = text.length
    const charactersNoSpace = text.replace(/\s/g, '').length
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    const lines = text === '' ? 0 : text.split('\n').length
    const bytes = new Blob([text]).size

    setStats({
      characters,
      charactersNoSpace,
      words,
      lines,
      bytes,
    })
  }, [text])

  return (
    <div className="space-y-6">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="テキストを入力してください..."
          className="w-full h-64 p-4 border border-border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.characters.toLocaleString()}</CardTitle>
            <CardDescription>文字数（スペース含む）</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.charactersNoSpace.toLocaleString()}</CardTitle>
            <CardDescription>文字数（スペース除く）</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.words.toLocaleString()}</CardTitle>
            <CardDescription>単語数</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.lines.toLocaleString()}</CardTitle>
            <CardDescription>行数</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{stats.bytes.toLocaleString()}</CardTitle>
            <CardDescription>バイト数</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {text.trim() === '' ? 0 : Math.ceil(stats.characters / 400)}
            </CardTitle>
            <CardDescription>原稿用紙（400字）</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
