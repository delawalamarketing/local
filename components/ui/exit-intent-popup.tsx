'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { APPLY_PATH } from '@/lib/apply-routes'
import { SITE } from '@/lib/site-config'

/** Mounted on the home page; books via /apply. */
export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  const closePopup = () => setIsVisible(false)

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-foreground/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg"
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
              <button
                onClick={closePopup}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="bg-primary/10 p-8 flex flex-col items-center justify-center text-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Before you go</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Is your city still open?
                    </p>
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      We work with one business per industry per city
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      A free 15-minute call tells you if your city is still
                      open. We&apos;ll also show you where you show up on Google
                      right now.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button asChild onClick={closePopup} className="w-full group">
                      <Link href={APPLY_PATH}>
                        {SITE.cta.primaryShort}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <button
                      onClick={closePopup}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      No thanks, I&apos;ll pass for now
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
