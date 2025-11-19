'use client'

import Link from 'next/link'
import { Search, Heart, Clock, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white font-bold">
            100
          </div>
          <span className="hidden font-bold sm:inline-block">100式道具箱</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 items-center space-x-2 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ツールを検索..."
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Right Side Navigation */}
        <nav className="flex items-center ml-auto space-x-2">
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/favorites">
              <Heart className="h-5 w-5" />
              <span className="sr-only">お気に入り</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <Link href="/recent">
              <Clock className="h-5 w-5" />
              <span className="sr-only">最近使用</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">メニュー</span>
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto p-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ツールを検索..."
                className="pl-9 w-full"
              />
            </div>
            {/* Mobile Links */}
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  お気に入り
                </Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/recent">
                  <Clock className="mr-2 h-4 w-4" />
                  最近使用
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
