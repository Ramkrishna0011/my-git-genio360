// Runs before the test framework installs (setupFiles, not setupFilesAfterEnv) so these
// globals exist before anything that needs them at import time.

const nodeUtil = require('node:util');
Object.assign(globalThis, {
  TextDecoder: nodeUtil.TextDecoder,
  TextEncoder: nodeUtil.TextEncoder,
});

// jsdom implements Headers but not Response, and @tanstack/react-router's redirect
// detection (`instanceof Response`) plus `redirect()` (`new Response(null, { status,
// headers })`) reference it unconditionally — even on routes that never redirect. The
// router never calls fetch() itself, so a minimal structural stub (not a real network
// Response, and no `undici` dependency) is enough.
if (typeof globalThis.Response === 'undefined') {
  class MinimalResponse {
    readonly body: unknown;
    readonly status: number;
    readonly headers: Headers;

    constructor(body: unknown = null, init: { status?: number; headers?: HeadersInit } = {}) {
      this.body = body;
      this.status = init.status ?? 200;
      this.headers = init.headers instanceof Headers ? init.headers : new Headers(init.headers);
    }
  }
  // @ts-expect-error -- structural stub, not a spec-complete Response implementation.
  globalThis.Response = MinimalResponse;
}
