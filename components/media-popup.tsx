"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaPopupProps {
  isOpen: boolean
  onClose: () => void
  mediaUrl: string
  title: string
  type: 'image' | 'video'
}

export default function MediaPopup({ isOpen, onClose, mediaUrl, title, type }: MediaPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 bg-transparent border-none">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          {type === 'image' ? (
            <Image
              src={mediaUrl}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 80vw"
              priority
            />
          ) : (
            <video
              src={mediaUrl}
              controls
              className="w-full h-full"
              autoPlay
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 