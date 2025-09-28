"use client"

import React, { createContext, useContext, useRef, useState, useEffect } from 'react'

interface AudioPlayerContextType {
  currentPodcast: Podcast | null
  isPlaying: boolean
  currentTime: number
  duration: number
  play: (podcast: Podcast) => void
  pause: () => void
  seek: (time: number) => void
  skipForward: () => void
  skipBackward: () => void
  playNext: () => void
  playPrevious: () => void
}

interface Podcast {
  id: number
  title: string
  audio_url: string
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playlist, setPlaylist] = useState<Podcast[]>([])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      playNext()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const play = (podcast: Podcast) => {
    if (audioRef.current) {
      audioRef.current.src = podcast.audio_url
      audioRef.current.play()
      setCurrentPodcast(podcast)
      setIsPlaying(true)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, duration)
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0)
    }
  }

  const playNext = () => {
    if (!currentPodcast || !playlist.length) return
    const currentIndex = playlist.findIndex(p => p.id === currentPodcast.id)
    const nextPodcast = playlist[(currentIndex + 1) % playlist.length]
    play(nextPodcast)
  }

  const playPrevious = () => {
    if (!currentPodcast || !playlist.length) return
    const currentIndex = playlist.findIndex(p => p.id === currentPodcast.id)
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    const prevPodcast = playlist[prevIndex]
    play(prevPodcast)
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        currentPodcast,
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        seek,
        skipForward,
        skipBackward,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}