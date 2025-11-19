'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Pause, RotateCcw, Plus } from 'lucide-react'

export function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const handleLap = () => {
    if (isRunning) {
      setLaps([time, ...laps])
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="text-center">
          <div className="text-6xl sm:text-8xl font-mono font-bold mb-8">{formatTime(time)}</div>
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
            <Button size="lg" variant="outline" onClick={handleLap} disabled={!isRunning} className="w-32">
              <Plus className="mr-2 h-5 w-5" />
              ラップ
            </Button>
          </div>
        </div>
      </Card>

      {laps.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">ラップタイム</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {laps.map((lap, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <span className="font-medium">ラップ {laps.length - index}</span>
                <span className="font-mono text-lg">{formatTime(lap)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
