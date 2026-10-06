import { ImageResponse } from 'next/og'

export const alt =
  'Delawala Marketing | Top 3 on Google Maps in 6 months, or your money back'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#1a73e8' }} />
          <div style={{ fontSize: '34px', fontWeight: 700, color: '#202124' }}>
            Delawala Marketing
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              fontSize: '70px',
              fontWeight: 800,
              color: '#202124',
              lineHeight: 1.1,
              maxWidth: '960px',
            }}
          >
            Top 3 on Google Maps in 6 months, or your money back.
          </div>
          <div style={{ fontSize: '32px', color: '#5f6368' }}>
            $500/month · Local service businesses across Canada · Barrie, ON
          </div>
        </div>

        <div style={{ fontSize: '28px', fontWeight: 600, color: '#1a73e8' }}>
          Check if your city is open →
        </div>
      </div>
    ),
    { ...size },
  )
}
