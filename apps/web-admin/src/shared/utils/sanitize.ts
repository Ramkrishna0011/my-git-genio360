import DOMPurify from 'dompurify';

/**
 * Sanitizes untrusted HTML before it is ever passed to dangerouslySetInnerHTML.
 * dangerouslySetInnerHTML itself must never be used without running the value through
 * this first — React does not escape raw HTML, DOMPurify strips script/event-handler
 * injection vectors.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}
