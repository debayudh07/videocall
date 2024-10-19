"use client"

import { useEffect, useRef, useState } from 'react'
import DailyIframe, { DailyCall } from '@daily-co/daily-js'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Video, VideoOff, MessageSquare, Users, Settings, PhoneOff } from 'lucide-react'
import Link from 'next/link'

export default function RoomPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const callFrameRef = useRef<DailyCall | null>(null)
  const { roomName } = useParams()
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [participantCount, setParticipantCount] = useState(1)
  const [chatMessage, setChatMessage] = useState('')

  useEffect(() => {
    if (!roomName || !containerRef.current) {
      console.error('Room name or container ref is not available')
      return
    }

    const roomURL = `https://debayudhbasu.daily.co/${roomName}`

    if (callFrameRef.current) {
      callFrameRef.current.destroy()
      callFrameRef.current = null
    }

    try {
      const callFrame = DailyIframe.createFrame(containerRef.current, {
      url: roomURL,
      showLeaveButton: false,
      })

      callFrameRef.current = callFrame

      callFrame.on('participant-joined', handleParticipantJoined)
      callFrame.on('participant-left', handleParticipantLeft)

      callFrame.join().then(() => {
      console.log('Successfully joined the call')
      }).catch((err) => {
      console.error('Failed to join call:', err)
      setError(`Failed to join the call: ${err.message}`)
      })
    } catch (err) {
      console.error('Error creating Daily iframe:', err)
      setError(`Failed to create the video call: ${err instanceof Error ? err.message : String(err)}`)
    }

    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy()
        callFrameRef.current = null
      }
    }
  }, [roomName])

  const handleParticipantJoined = () => {
    setParticipantCount(prev => prev + 1)
  }

  const handleParticipantLeft = () => {
    setParticipantCount(prev => Math.max(1, prev - 1))
  }

  const toggleAudio = () => {
    if (callFrameRef.current) {
      callFrameRef.current.setLocalAudio(!isMuted)
      setIsMuted(!isMuted)
    }
  }

  const toggleVideo = () => {
    if (callFrameRef.current) {
      callFrameRef.current.setLocalVideo(!isVideoOff)
      setIsVideoOff(!isVideoOff)
    }
  }

  const leaveCall = () => {
    if (callFrameRef.current) {
      callFrameRef.current.leave()
    }
  }

  const sendChatMessage = () => {
    if (callFrameRef.current && chatMessage) {
      callFrameRef.current.sendAppMessage({ message: chatMessage }, '*')
      setChatMessage('')
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-blue-100">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-blue-900 bg-opacity-30">
        <Link className="flex items-center justify-center" href="/">
          <Video className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">VidConnect</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl bg-blue-900 bg-opacity-30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
              Room: {roomName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={containerRef} className="w-full aspect-video rounded-lg overflow-hidden shadow-lg" />
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <Button onClick={toggleAudio} variant={isMuted ? "destructive" : "default"} className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200">
                {isMuted ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
              <Button onClick={toggleVideo} variant={isVideoOff ? "destructive" : "default"} className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200">
                {isVideoOff ? <VideoOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Video className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
              <Button className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button onClick={leaveCall} variant="destructive" className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200">
                <PhoneOff className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
              <Label htmlFor="chat-input" className="sr-only">Chat message</Label>
              <Input
                id="chat-input"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="bg-blue-100 text-blue-900 placeholder-blue-400 w-full sm:w-auto sm:flex-grow border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button onClick={sendChatMessage} className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200 w-full sm:w-auto">Send</Button>
            </div>
            <div className="text-sm text-center sm:text-left">
              Participants: {participantCount}
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="py-6 text-center text-sm">
        <p>© 2024 VidConnect. All rights reserved.</p>
      </footer>
    </div>
  )
}