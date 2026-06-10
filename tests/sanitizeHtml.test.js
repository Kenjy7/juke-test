import { describe, it, expect } from 'vitest'

// isomorphic-dompurify pulls in jsdom, which fails to load via require() on
// Node <22.12 (the @exodus/bytes ESM bug — same blocker as the SSG build).
// Production and CI run Node >=22.12 where this loads fine; skip here rather
// than fail red on an older local runtime.
let sanitizeBlogContent
let loadError = null
try {
  ;({ sanitizeBlogContent } = await import('../src/utils/sanitizeHtml.js'))
} catch (err) {
  loadError = err
}

describe.skipIf(loadError)('sanitizeBlogContent', () => {
  it('keeps legitimate blog markup intact', () => {
    const html = '<h2>Titel</h2><p>Tekst met <strong>nadruk</strong> en een <a href="/offerte-aanvraag">link</a>.</p>'
    const out = sanitizeBlogContent(html)
    expect(out).toContain('<h2>Titel</h2>')
    expect(out).toContain('<strong>nadruk</strong>')
    expect(out).toContain('href="/offerte-aanvraag"')
  })

  it('strips <script> tags', () => {
    const out = sanitizeBlogContent('<p>ok</p><script>alert(document.cookie)</script>')
    expect(out).toContain('<p>ok</p>')
    expect(out.toLowerCase()).not.toContain('<script')
    expect(out).not.toContain('alert(document.cookie)')
  })

  it('strips inline event handlers', () => {
    const out = sanitizeBlogContent('<img src="x" onerror="alert(1)">')
    expect(out.toLowerCase()).not.toContain('onerror')
    expect(out).not.toContain('alert(1)')
  })

  it('strips javascript: URLs', () => {
    const out = sanitizeBlogContent('<a href="javascript:alert(1)">klik</a>')
    expect(out.toLowerCase()).not.toContain('javascript:')
  })

  it('removes disallowed tags like iframe', () => {
    const out = sanitizeBlogContent('<iframe src="https://evil.example"></iframe><p>na</p>')
    expect(out.toLowerCase()).not.toContain('<iframe')
    expect(out).toContain('<p>na</p>')
  })

  it('fails closed to empty string on nullish input', () => {
    expect(sanitizeBlogContent(null)).toBe('')
    expect(sanitizeBlogContent(undefined)).toBe('')
    expect(sanitizeBlogContent('')).toBe('')
  })
})
