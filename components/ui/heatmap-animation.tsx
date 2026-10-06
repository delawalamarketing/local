'use client'

import { motion } from 'framer-motion'

interface DotProps {
  x: number
  y: number
  isRanked: boolean
  delay: number
}

function Dot({ x, y, isRanked, delay }: DotProps) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={isRanked ? 8 : 6}
      fill={isRanked ? 'var(--brand-success)' : 'var(--destructive)'}
      initial={{ opacity: 0.4, scale: 0.8 }}
      animate={
        isRanked
          ? { opacity: 1, scale: 1 }
          : { opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.1, 0.8] }
      }
      transition={
        isRanked
          ? { duration: 0.5, delay }
          : { duration: 2, repeat: Infinity, delay, ease: 'easeInOut' }
      }
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    />
  )
}

/**
 * The geo-grid: a 7x7 sweep of search locations where only the centre 3x3
 * ranks. This is the "you only rank at your own front door" concept made
 * visible, and it is the single most important image on the page.
 *
 * Green = visible in the top three from that location. Red = invisible.
 */
export function HeatmapAnimation({ className }: { className?: string }) {
  const gridSize = 7
  const spacing = 40
  const centre = (gridSize * spacing) / 2

  const dots: DotProps[] = []

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      // The dead-centre cell is left empty so the TOP 3 label sits cleanly
      // among the dots instead of colliding with one.
      const isCentreCell = row === 3 && col === 3
      if (isCentreCell) continue

      dots.push({
        x: col * spacing + spacing / 2,
        y: row * spacing + spacing / 2,
        isRanked: row >= 2 && row <= 4 && col >= 2 && col <= 4,
        delay: (row + col) * 0.05,
      })
    }
  }

  const svgSize = gridSize * spacing

  return (
    <div className={className}>
      <motion.svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-auto max-w-full"
        role="img"
        aria-label="A seven by seven grid of search locations. Only the nine in the centre show the business in the top three results; the surrounding forty are red, meaning invisible."
      >
        <defs>
          <pattern
            id="geo-grid-lines"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
              fill="none"
              stroke="var(--brand-line)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geo-grid-lines)" />

        {/* Ranked zone */}
        <motion.rect
          x={2 * spacing}
          y={2 * spacing}
          width={3 * spacing}
          height={3 * spacing}
          fill="var(--success-subtle)"
          stroke="var(--brand-success)"
          strokeWidth="1.5"
          rx="8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />

        {dots.map((dot, i) => (
          <Dot key={i} {...dot} />
        ))}

        {/* TOP 3 label, occupying the empty centre cell */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <rect
            x={centre - 26}
            y={centre - 11}
            width={52}
            height={22}
            rx={11}
            fill="var(--brand-success)"
          />
          <text
            x={centre}
            y={centre + 4}
            textAnchor="middle"
            className="font-mono text-[11px] font-bold"
            fill="#ffffff"
          >
            TOP 3
          </text>
        </motion.g>
      </motion.svg>
    </div>
  )
}
