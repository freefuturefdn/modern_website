"use client"

import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAudioPlayer } from "@/components/audio-player-context"
import { formatTime } from "@/lib/utils"

export default function StaticAudioPlayer() {
  const {
    currentPodcast,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seek,
    skipForward,
    skipBackward,
  } = useAudioPlayer()

  if (!currentPodcast) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-md border-t p-2 md:p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Title and Progress - Full width on mobile, flex on desktop */}
        <div className="w-full md:flex-1 space-y-2">
          <div className="text-sm md:text-base font-semibold text-white truncate text-center md:text-left">
            {currentPodcast.title}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={([value]) => seek(value)}
              className="flex-1"
            />
            <span className="text-xs text-white/80">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controls - Centered on mobile, right-aligned on desktop */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipBackward()}
            className="hover:bg-white/20 text-white"
            aria-label="Skip backward"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => isPlaying ? pause() : play(currentPodcast)}
            className="hover:bg-white/20 text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipForward()}
            className="hover:bg-white/20 text-white"
            aria-label="Skip forward"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 