export type FormspreeResult =
  | { ok: true }
  | { ok: false; reason: 'http-error' | 'timeout' | 'network-error'; status?: number }

/** POSTs a submission to a Formspree form endpoint (https://formspree.io/f/...). */
export async function postToFormspree(
  url: string,
  payload: Record<string, unknown>,
): Promise<FormspreeResult> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) {
      return { ok: false, reason: 'http-error', status: response.status }
    }
    return { ok: true }
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { ok: false, reason: 'timeout' }
    }
    return { ok: false, reason: 'network-error' }
  }
}
