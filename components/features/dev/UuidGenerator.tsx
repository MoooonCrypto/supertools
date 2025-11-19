'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, RefreshCw } from 'lucide-react'
import { nanoid } from 'nanoid'

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)

  const generateUUIDs = () => {
    const newUUIDs = Array.from({ length: count }, () => generateUUID())
    setUuids(newUUIDs)
  }

  const generateUUID = (): string => {
    return nanoid()
  }

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join('\n'))
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyOne = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-2">生成数</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button onClick={generateUUIDs} className="h-10">
          <RefreshCw className="mr-2 h-4 w-4" />
          生成
        </Button>
        <Button onClick={copyAll} variant="outline" disabled={uuids.length === 0} className="h-10">
          <Copy className="mr-2 h-4 w-4" />
          全てコピー
        </Button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">生成されたUUID ({uuids.length}個)</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {uuids.map((uuid, index) => (
              <Card key={index} className="p-3 flex items-center justify-between">
                <code className="flex-1 text-sm font-mono">{uuid}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyOne(uuid)}
                  className="h-8 w-8 ml-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
