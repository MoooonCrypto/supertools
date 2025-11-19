'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6')
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })

  useEffect(() => {
    updateFromHex(hex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1]!, 16),
          g: parseInt(result[2]!, 16),
          b: parseInt(result[3]!, 16),
        }
      : null
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    s /= 100
    l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0
    let g = 0
    let b = 0

    if (h >= 0 && h < 60) {
      r = c
      g = x
      b = 0
    } else if (h >= 60 && h < 120) {
      r = x
      g = c
      b = 0
    } else if (h >= 120 && h < 180) {
      r = 0
      g = c
      b = x
    } else if (h >= 180 && h < 240) {
      r = 0
      g = x
      b = c
    } else if (h >= 240 && h < 300) {
      r = x
      g = 0
      b = c
    } else if (h >= 300 && h < 360) {
      r = c
      g = 0
      b = x
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    }
  }

  const updateFromHex = (newHex: string) => {
    const rgbResult = hexToRgb(newHex)
    if (rgbResult) {
      setHex(newHex)
      setRgb(rgbResult)
      setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b))
    }
  }

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b })
    setHex(rgbToHex(r, g, b))
    setHsl(rgbToHsl(r, g, b))
  }

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l })
    const rgbResult = hslToRgb(h, s, l)
    setRgb(rgbResult)
    setHex(rgbToHex(rgbResult.r, rgbResult.g, rgbResult.b))
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
      {/* Color Preview */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <div
            className="w-32 h-32 rounded-lg border-2 border-border shadow-md"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">現在の色</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground w-12">HEX:</span>
                <code className="flex-1 font-mono">{hex}</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hex)} className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground w-12">RGB:</span>
                <code className="flex-1 font-mono">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground w-12">HSL:</span>
                <code className="flex-1 font-mono">
                  hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* HEX Input */}
      <Card className="p-4">
        <label className="block text-sm font-medium mb-2">HEX</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="flex-1 h-10 px-3 border border-border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="color"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="h-10 w-20 border border-border rounded-md cursor-pointer"
          />
        </div>
      </Card>

      {/* RGB Input */}
      <Card className="p-4">
        <label className="block text-sm font-medium mb-3">RGB</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">R</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgb.r}
              onChange={(e) => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)}
              className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">G</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgb.g}
              onChange={(e) => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)}
              className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">B</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgb.b}
              onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))}
              className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Card>

      {/* HSL Input */}
      <Card className="p-4">
        <label className="block text-sm font-medium mb-3">HSL</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">H (0-360)</label>
            <input
              type="number"
              min="0"
              max="360"
              value={hsl.h}
              onChange={(e) => updateFromHsl(Number(e.target.value), hsl.s, hsl.l)}
              className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">S (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hsl.s}
              onChange={(e) => updateFromHsl(hsl.h, Number(e.target.value), hsl.l)}
              className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">L (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hsl.l}
              onChange={(e) => updateFromHsl(hsl.h, hsl.s, Number(e.target.value))}
              className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
