'use client'

import Link from 'next/link'
import { Search, Heart, Clock, Menu } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-display text-2xl font-black uppercase tracking-wider text-primary">
            100<span className="text-foreground">式</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
            <input
              type="search"
              placeholder="ツールを検索..."
              className="w-full rounded-full border border-border/50 bg-muted/50 py-2 pl-12 pr-4 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Right Side Icons & Mobile Menu Button */}
        <nav className="flex items-center space-x-2">
          <Link href="/favorites" className="hidden rounded-full p-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:block">
            <Heart className="h-6 w-6" />
            <span className="sr-only">お気に入り</span>
          </Link>
          <Link href="/recent" className="hidden rounded-full p-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:block">
            <Clock className="h-6 w-6" />
            <span className="sr-only">最近使用</span>
          </Link>
          <button
            className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">メニューを開く</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <div className="container mx-auto p-4">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
              <input
                type="search"
                placeholder="ツールを検索..."
                className="w-full rounded-full border border-border/50 bg-muted/50 py-2 pl-12 pr-4 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <nav className="flex flex-col space-y-2">
              <Link href="/favorites" className="flex items-center rounded-md p-2 text-foreground/80 hover:bg-muted hover:text-foreground">
                <Heart className="mr-3 h-5 w-5" />
                お気に入り
              </Link>
              <Link href="/recent" className="flex items-center rounded-md p-2 text-foreground/80 hover:bg-muted hover:text-foreground">
                <Clock className="mr-3 h-5 w-5" />
                最近使用
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
