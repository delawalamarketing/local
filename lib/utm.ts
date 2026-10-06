const UTM_FIELDS = ['source', 'medium', 'campaign', 'content', 'term'] as const

const STORAGE_KEY = 'utm-params'

function readFromUrl(): Record<string, string> | undefined {
  if (typeof window === 'undefined') return undefined
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const f of UTM_FIELDS) {
    const v = params.get(`utm_${f}`)
    if (v) utm[f] = v
  }
  return Object.keys(utm).length > 0 ? utm : undefined
}

function readFromStorage(): Record<string, string> | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return undefined
    const parsed = JSON.parse(stored) as unknown
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, string>
    }
  } catch {
    return undefined
  }
  return undefined
}

function persist(utm: Record<string, string>): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm))
  } catch {
    // sessionStorage may be unavailable (private mode, quota); silently skip
  }
}

export function captureUTM(): Record<string, string> | undefined {
  const fromUrl = readFromUrl()
  if (fromUrl) {
    persist(fromUrl)
    return fromUrl
  }
  return readFromStorage()
}
