"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Video, Copy } from "lucide-react"

export default function CreateRoomPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roomLink, setRoomLink] = useState('')

  const handleCreateRoom = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/create-room', { method: 'POST' })
      const data = await response.json()

      if (response.ok) {
        setRoomLink(`${window.location.origin}/room/${data.name}`)
      } else {
        setError('Failed to create room.')
      }
    } catch (error) {
      setError('An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomLink)
      .then(() => {
        // You could add a toast notification here
        console.log('Link copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-blue-100">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-blue-900 bg-opacity-30">
        <Link className="flex items-center justify-center" href="/">
          <Video className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">VidConnect</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-blue-900 bg-opacity-30 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center">Create a Video Room</h1>
          <Button 
            onClick={handleCreateRoom} 
            disabled={loading}
            className="w-full bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200"
          >
            {loading ? 'Creating Room...' : 'Create Room'}
          </Button>
          {error && <p className="text-red-300 text-center">{error}</p>}
          {roomLink && (
            <div className="space-y-4">
              <p className="text-center">Room Created! Share this link:</p>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-900 p-2 rounded">
                <Input 
                  value={roomLink} 
                  readOnly 
                  className="flex-1 bg-transparent border-none focus:ring-0"
                />
                <Button
                  onClick={copyToClipboard}
                  className="bg-blue-900 text-blue-100 hover:bg-blue-800 transition-colors duration-200"
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
              <Button 
                asChild 
                className="w-full bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200"
              >
                <Link href={roomLink}>Join Room</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <footer className="py-6 text-center text-sm">
        <p>© 2024 VidConnect. All rights reserved.</p>
      </footer>
    </div>
  )
}