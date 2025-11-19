'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy } from 'lucide-react'
import CryptoJS from 'crypto-js'

export function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})

  const generateHashes = () => {
    if (!input) {
      setHashes({})
      return
    }

    const newHashes = {
      MD5: CryptoJS.MD5(input).toString(),
      SHA1: CryptoJS.SHA1(input).toString(),
      SHA256: CryptoJS.SHA256(input).toString(),
      SHA512: CryptoJS.SHA512(input).toString(),
      SHA3: CryptoJS.SHA3(input).toString(),
    }

    setHashes(newHashes)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">入力テキスト</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ハッシュ化したいテキストを入力..."
            className="w-full h-32 p-4 border border-border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button onClick={generateHashes} disabled={!input}>
          ハッシュ生成
        </Button>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">生成されたハッシュ値</h3>
          {Object.entries(hashes).map(([algorithm, hash]) => (
            <Card key={algorithm} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{algorithm}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(hash)}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <code className="block p-3 bg-muted rounded text-xs font-mono break-all">
                {hash}
              </code>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
