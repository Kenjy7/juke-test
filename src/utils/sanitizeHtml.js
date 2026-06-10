import DOMPurify from 'isomorphic-dompurify'

// Allowlist for blog post body HTML. Blog content can originate from the AI
// draft generator (the /seo blog Discord command and the monthly job), so it
// must be treated as untrusted and sanitised before it reaches v-html —
// otherwise an injected <script>, event handler or javascript: URL would run
// in every visitor's browser. Fail closed to an empty string on any error.
const BLOG_CONTENT_OPTIONS = {
  ALLOWED_TAGS: [
    'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i',
    'a', 'blockquote', 'code', 'pre', 'br', 'span', 'img', 'figure', 'figcaption',
  ],
  ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'class'],
  ALLOW_DATA_ATTR: false,
}

export function sanitizeBlogContent(rawHtml) {
  if (!rawHtml) return ''
  try {
    return DOMPurify.sanitize(String(rawHtml), BLOG_CONTENT_OPTIONS)
  } catch {
    return ''
  }
}
