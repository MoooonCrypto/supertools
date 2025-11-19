'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Pause, RotateCcw } from 'lucide-react'

export function Timer() {
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(300)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('data:audio/wav;base64,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')
    }
  }, [])

  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsFinished(true)
            if (audioRef.current) {
              audioRef.current.play().catch(console.error)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, totalSeconds])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartPause = () => {
    if (!isRunning && totalSeconds === 0) {
      setTotalSeconds(minutes * 60 + seconds)
    }
    setIsRunning(!isRunning)
    setIsFinished(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTotalSeconds(minutes * 60 + seconds)
    setIsFinished(false)
  }

  const handleSetTime = () => {
    setTotalSeconds(minutes * 60 + seconds)
    setIsRunning(false)
    setIsFinished(false)
  }

  return (
    <div className="space-y-6">
      {/* Time Input */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">時間設定</h3>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="block text-sm text-muted-foreground mb-1">分</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
              disabled={isRunning}
              className="w-full h-12 px-4 text-center text-2xl border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex-1">
            <label className="block text-sm text-muted-foreground mb-1">秒</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
              disabled={isRunning}
              className="w-full h-12 px-4 text-center text-2xl border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleSetTime} disabled={isRunning} className="mt-6">
            設定
          </Button>
        </div>
      </Card>

      {/* Timer Display */}
      <Card className={`p-8 ${isFinished ? 'bg-destructive/10 border-destructive' : ''}`}>
        <div className="text-center">
          <div
            className={`text-6xl sm:text-8xl font-mono font-bold mb-8 ${
              isFinished ? 'text-destructive' : ''
            }`}
          >
            {formatTime(totalSeconds)}
          </div>
          {isFinished && (
            <p className="text-2xl font-bold text-destructive mb-4">時間です！</p>
          )}
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={handleStartPause} className="w-32">
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  停止
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  開始
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" onClick={handleReset} className="w-32">
              <RotateCcw className="mr-2 h-5 w-5" />
              リセット
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Time Presets */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">クイック設定</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {[
            { label: '1分', mins: 1, secs: 0 },
            { label: '3分', mins: 3, secs: 0 },
            { label: '5分', mins: 5, secs: 0 },
            { label: '10分', mins: 10, secs: 0 },
            { label: '15分', mins: 15, secs: 0 },
            { label: '20分', mins: 20, secs: 0 },
            { label: '25分', mins: 25, secs: 0 },
            { label: '30分', mins: 30, secs: 0 },
            { label: '45分', mins: 45, secs: 0 },
            { label: '60分', mins: 60, secs: 0 },
          ].map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              size="sm"
              onClick={() => {
                setMinutes(preset.mins)
                setSeconds(preset.secs)
                setTotalSeconds(preset.mins * 60 + preset.secs)
                setIsRunning(false)
                setIsFinished(false)
              }}
              disabled={isRunning}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
