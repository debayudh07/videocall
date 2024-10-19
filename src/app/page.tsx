"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, Users, Shield, Zap, Menu } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-blue-100">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-blue-900 bg-opacity-30 relative z-10">
        <Link className="flex items-center justify-center" href="#">
          <Video className="h-6 w-6" />
          <span className="sr-only">VidConnect</span>
        </Link>
        <button
          className="ml-auto lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>
        <nav className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } lg:flex absolute top-full left-0 right-0 bg-blue-900 bg-opacity-95 lg:static lg:bg-transparent flex-col lg:flex-row gap-4 p-4 lg:p-0 lg:ml-auto transition-all duration-300 ease-in-out`}>
          <Link className="text-sm font-medium hover:text-blue-200 transition-colors duration-200" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-200 transition-colors duration-200" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-blue-200 transition-colors duration-200" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-blue-200 transition-colors duration-200" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect Face-to-Face, Anywhere in the World
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  High-quality video calls, screen sharing, and collaboration tools to bring people together.
                </p>
              </div>
              <div className="space-x-4">

               <Link href="/create-room"><Button className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200">Start a Call</Button></Link> 
                <Button variant="outline" className="border-blue-100 text-blue-100 hover:bg-blue-900 hover:bg-opacity-30 transition-colors duration-200">Sign Up Free</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-900 bg-opacity-30 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center transform hover:scale-105 transition-transform duration-200">
                <Users className="h-12 w-12 text-blue-200" />
                <h2 className="text-2xl font-bold">Group Calls</h2>
                <p className="max-w-[300px] text-blue-100">
                  Connect with up to 100 participants in a single call.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center transform hover:scale-105 transition-transform duration-200">
                <Shield className="h-12 w-12 text-blue-200" />
                <h2 className="text-2xl font-bold">Secure Encryption</h2>
                <p className="max-w-[300px] text-blue-100">
                  End-to-end encryption for all your calls and messages.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center transform hover:scale-105 transition-transform duration-200">
                <Zap className="h-12 w-12 text-blue-200" />
                <h2 className="text-2xl font-bold">Low Latency</h2>
                <p className="max-w-[300px] text-blue-100">
                  Crystal clear audio and video with minimal delay.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Connecting Today</h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join millions of users who trust VidConnect for their video calling needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input className="flex-1 bg-blue-100 text-blue-900 placeholder-blue-400 transition-all duration-200 focus:ring-2 focus:ring-blue-300" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors duration-200">Sign Up</Button>
                </form>
                <p className="text-xs text-blue-100">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-blue-200 transition-colors duration-200" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-300">
        <p className="text-xs text-blue-100">© 2024 VidConnect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-blue-200 transition-colors duration-200" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-blue-200 transition-colors duration-200" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}