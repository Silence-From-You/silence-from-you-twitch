import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    srcDir: 'src',
    manifest: ({ mode }) => ({
    content_security_policy: mode === 'development' ? {
        extension_pages: "script-src 'self' http://localhost:43887; object-src 'self'"
    } : undefined
    })
});
