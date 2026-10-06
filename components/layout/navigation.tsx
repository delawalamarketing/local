'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APPLY_CTA as cta } from '@/lib/apply-routes'
import { mainSite } from '@/lib/site-config'
import { slideInFromRight } from '@/components/animations/motion-variants'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  isRoute?: boolean
}

/* Anchors must match section IDs on the home page (app/page.tsx). The GBP
 * sections set them: #process, #pricing, #faq. `scrollToSection` falls back to
 * navigating home when the element is not on the current page. Case Studies is
 * a page on the main site (`isRoute`); the home carousel keeps its
 * #case-studies anchor. */
const navLinks: NavItem[] = [
  { href: '#process', label: 'How it works' },
  { href: mainSite('/case-studies'), label: 'Case Studies', isRoute: true },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = `/${href}`
      }
    }
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-line bg-card/85 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="flex shrink-0 items-center gap-2.5 text-xl font-bold tracking-tight text-foreground group"
            >
              <img
                src="/logo.png"
                alt="Delawala Marketing Logo"
                className="h-8 w-8 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="whitespace-nowrap">Delawala Marketing</span>
            </a>
  
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                ),
              )}
              <Link
                href={mainSite('/services')}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Services
              </Link>
              <Link
                href={mainSite('/blog')}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
              <Button asChild>
                <Link href={cta.href}>{cta.shortLabel}</Link>
              </Button>
            </div>
  
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="-mr-1 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer — rendered outside <nav>: its backdrop-blur (when
       * scrolled) makes it the containing block for fixed children, which
       * would clip the drawer to the 64px bar. */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              variants={slideInFromRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-16 bottom-0 z-50 w-72 max-w-[85vw] overflow-y-auto overscroll-contain border-l border-border bg-card p-6 lg:hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </button>
                  ),
                )}
                <Link
                  href={mainSite('/services')}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  Services
                </Link>
                <Link
                  href={mainSite('/blog')}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  Blog
                </Link>
                <Button
                  asChild
                  className="mt-4 w-full"
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href={cta.href}>
                    {cta.label}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

